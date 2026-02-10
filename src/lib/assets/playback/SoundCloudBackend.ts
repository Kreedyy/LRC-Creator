/// <reference path="./EmbedApis.d.ts" />
import type { PlaybackBackend, BackendCallbacks } from './Types';

let scApiLoaded = false;
let scApiLoading = false;
const scApiCallbacks: (() => void)[] = [];

function loadSoundCloudApi(): Promise<void> {
	if (scApiLoaded) return Promise.resolve();
	return new Promise((resolve) => {
		scApiCallbacks.push(resolve);
		if (scApiLoading) return;
		scApiLoading = true;
		const script = document.createElement('script');
		script.src = 'https://w.soundcloud.com/player/api.js';
		script.onload = () => {
			scApiLoaded = true;
			scApiLoading = false;
			scApiCallbacks.forEach((cb) => cb());
			scApiCallbacks.length = 0;
		};
		document.head.appendChild(script);
	});
}

export function createSoundCloudBackend(
	containerEl: HTMLDivElement,
	callbacks: BackendCallbacks
): PlaybackBackend {
	let widget: SC.WidgetInstance | null = null;
	let iframeEl: HTMLIFrameElement | null = null;
	let cachedPosition = 0;
	let cachedDuration = 0;
	let lastUpdateTime = 0;
	let playing = false;

	function createFreshIframe(src: string): HTMLIFrameElement {
		containerEl.innerHTML = '';
		const iframe = document.createElement('iframe');
		iframe.title = 'SoundCloud Player';
		iframe.allow = 'autoplay';
		iframe.style.width = '200px';
		iframe.style.height = '200px';
		iframe.style.border = 'none';
		iframe.src = src;
		containerEl.appendChild(iframe);
		return iframe;
	}

	return {
		type: 'soundcloud',
		supportsPlaybackRate: false,

		async load(source: string): Promise<void> {
			await loadSoundCloudApi();

			const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}&auto_play=false&show_artwork=false`;
			const iframe = createFreshIframe(embedUrl);
			iframeEl = iframe;

			return new Promise((resolve, reject) => {
				const timeout = setTimeout(() => reject(new Error('SoundCloud load timeout')), 15000);

				widget = SC.Widget(iframe);

				widget.bind('ready', () => {
					clearTimeout(timeout);
					if (!widget) return;

					widget.getDuration((ms: number) => {
						cachedDuration = ms / 1000;
						callbacks.onDurationChange(cachedDuration);
					});

					widget.bind('play', () => {
						playing = true;
						lastUpdateTime = performance.now();
						callbacks.onPlay();
					});
					widget.bind('pause', () => {
						playing = false;
						callbacks.onPause();
					});
					widget.bind('finish', () => {
						playing = false;
						callbacks.onEnded();
					});
					widget.bind('error', () => callbacks.onError('SoundCloud playback error'));
					widget.bind('playProgress', (data: unknown) => {
						const progress = data as { currentPosition: number };
						cachedPosition = progress.currentPosition / 1000;
						lastUpdateTime = performance.now();
					});

					resolve();
				});
			});
		},

		play() {
			widget?.play();
		},

		pause() {
			widget?.pause();
		},

		seekTo(seconds: number) {
			cachedPosition = seconds;
			lastUpdateTime = performance.now();
			widget?.seekTo(seconds * 1000);
		},

		getCurrentTime(): number {
			if (playing && lastUpdateTime > 0) {
				const elapsed = (performance.now() - lastUpdateTime) / 1000;
				return Math.min(cachedPosition + elapsed, cachedDuration);
			}
			return cachedPosition;
		},

		getDuration(): number {
			return cachedDuration;
		},

		setVolume(volume: number) {
			widget?.setVolume(Math.round(volume * 100));
		},

		setPlaybackRate(): number {
			return 1;
		},

		destroy() {
			if (widget) {
				widget.unbind('ready');
				widget.unbind('play');
				widget.unbind('pause');
				widget.unbind('finish');
				widget.unbind('error');
				widget.unbind('playProgress');
				widget = null;
			}
			containerEl.innerHTML = '';
			iframeEl = null;
			cachedPosition = 0;
			cachedDuration = 0;
			lastUpdateTime = 0;
			playing = false;
		}
	};
}
