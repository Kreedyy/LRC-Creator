import type { PlaybackBackend, BackendCallbacks, SourceType } from './Types';
import { createHtml5Backend } from './Html5Backend';
import { createYouTubeBackend } from './YouTubeBackend';
import { createSoundCloudBackend } from './SoundCloudBackend';

const youtubePattern =
	/^https?:\/\/(www\.|music\.|m\.)?youtu(be\.com\/(watch\?v=|shorts\/)|\.be\/).+/;
const soundcloudPattern = /^https?:\/\/(www\.|m\.|on\.)?soundcloud\.com\/.+/;

export function detectSourceType(url: string): SourceType {
	if (youtubePattern.test(url)) return 'youtube';
	if (soundcloudPattern.test(url)) return 'soundcloud';
	return 'html5';
}

export function cleanUrl(url: string): string {
	const sourceType = detectSourceType(url);

	if (sourceType === 'youtube') {
		try {
			const parsed = new URL(url);
			// youtu.be/ID and youtube.com/shorts/ID strip all tracking params
			if (parsed.hostname === 'youtu.be' || parsed.pathname.includes('/shorts/')) {
				return `${parsed.origin}${parsed.pathname}`;
			}
			// youtube.com/watch?v=ID keep only the v param
			const videoId = parsed.searchParams.get('v');
			if (videoId) {
				parsed.search = `?v=${videoId}`;
				return parsed.toString();
			}
		} catch {
			/* fall through */
		}
	}

	if (sourceType === 'soundcloud') {
		try {
			const parsed = new URL(url);
			return `${parsed.origin}${parsed.pathname}`;
		} catch {
			/* fall through */
		}
	}

	return url;
}

export function createBackend(
	sourceType: SourceType,
	callbacks: BackendCallbacks,
	elements: {
		youtubeContainer: HTMLDivElement;
		soundcloudContainer: HTMLDivElement;
	}
): PlaybackBackend {
	switch (sourceType) {
		case 'youtube':
			return createYouTubeBackend(elements.youtubeContainer, callbacks);
		case 'soundcloud':
			return createSoundCloudBackend(elements.soundcloudContainer, callbacks);
		case 'html5':
		default:
			return createHtml5Backend(callbacks);
	}
}
