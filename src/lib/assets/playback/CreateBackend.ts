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
