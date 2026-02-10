/// <reference path="./EmbedApis.d.ts" />
import type { PlaybackBackend, BackendCallbacks } from './Types';

const YT_SUPPORTED_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

let ytApiLoaded = false;
let ytApiLoading = false;
const ytApiCallbacks: (() => void)[] = [];

function loadYouTubeApi(): Promise<void> {
	if (ytApiLoaded) return Promise.resolve();
	return new Promise((resolve) => {
		ytApiCallbacks.push(resolve);
		if (ytApiLoading) return;
		ytApiLoading = true;
		const script = document.createElement('script');
		script.src = 'https://www.youtube.com/iframe_api';
		document.head.appendChild(script);
		window.onYouTubeIframeAPIReady = () => {
			ytApiLoaded = true;
			ytApiLoading = false;
			ytApiCallbacks.forEach((cb) => cb());
			ytApiCallbacks.length = 0;
		};
	});
}

function extractVideoId(url: string): string | null {
	const patterns = [
		/[?&]v=([a-zA-Z0-9_-]{11})/,
		/youtu\.be\/([a-zA-Z0-9_-]{11})/,
		/\/shorts\/([a-zA-Z0-9_-]{11})/
	];
	for (const p of patterns) {
		const m = url.match(p);
		if (m) return m[1];
	}
	return null;
}

function snapToSupportedRate(rate: number): number {
	return YT_SUPPORTED_RATES.reduce((best, r) =>
		Math.abs(r - rate) < Math.abs(best - rate) ? r : best
	);
}

export function createYouTubeBackend(
	containerEl: HTMLDivElement,
	callbacks: BackendCallbacks
): PlaybackBackend {
	let player: YT.Player | null = null;
	let cachedDuration = 0;
	let ready = false;
	let durationPollId: ReturnType<typeof setInterval> | null = null;

	// YT.Player replaces the target element, so we create a fresh child div each time
	function createPlayerTarget(): HTMLDivElement {
		containerEl.innerHTML = '';
		const target = document.createElement('div');
		containerEl.appendChild(target);
		return target;
	}

	return {
		type: 'youtube',
		supportsPlaybackRate: true,

		async load(source: string): Promise<void> {
			const videoId = extractVideoId(source);
			if (!videoId) throw new Error('Invalid YouTube URL');

			await loadYouTubeApi();

			if (player) {
				player.destroy();
				player = null;
			}
			ready = false;
			cachedDuration = 0;
			if (durationPollId) clearInterval(durationPollId);

			const target = createPlayerTarget();

			return new Promise((resolve, reject) => {
				player = new YT.Player(target, {
					videoId,
					height: '200',
					width: '200',
					playerVars: {
						autoplay: 0,
						controls: 0,
						disablekb: 1,
						fs: 0,
						modestbranding: 1,
						rel: 0
					},
					events: {
						onReady: () => {
							ready = true;
							durationPollId = setInterval(() => {
								if (player) {
									const d = player.getDuration();
									if (d > 0 && d !== cachedDuration) {
										cachedDuration = d;
										callbacks.onDurationChange(d);
										if (durationPollId) clearInterval(durationPollId);
										durationPollId = null;
									}
								}
							}, 200);
							resolve();
						},
						onStateChange: (event: YT.OnStateChangeEvent) => {
							switch (event.data) {
								case 0:
									callbacks.onEnded();
									break;
								case 1:
									callbacks.onPlay();
									break;
								case 2:
									callbacks.onPause();
									break;
							}
						},
						onError: (event: YT.OnErrorEvent) => {
							callbacks.onError(`YouTube error: ${event.data}`);
							reject(new Error(`YouTube error: ${event.data}`));
						}
					}
				});
			});
		},

		play() {
			if (player && ready) player.playVideo();
		},

		pause() {
			if (player && ready) player.pauseVideo();
		},

		seekTo(seconds: number) {
			if (player && ready) player.seekTo(seconds, true);
		},

		getCurrentTime(): number {
			return player && ready ? player.getCurrentTime() : 0;
		},

		getDuration(): number {
			return cachedDuration;
		},

		setVolume(volume: number) {
			if (player && ready) player.setVolume(Math.round(volume * 100));
		},

		setPlaybackRate(rate: number): number {
			const snapped = snapToSupportedRate(rate);
			if (player && ready) player.setPlaybackRate(snapped);
			return snapped;
		},

		destroy() {
			if (durationPollId) {
				clearInterval(durationPollId);
				durationPollId = null;
			}
			if (player) {
				player.destroy();
				player = null;
			}
			ready = false;
			cachedDuration = 0;
			containerEl.innerHTML = '';
		}
	};
}
