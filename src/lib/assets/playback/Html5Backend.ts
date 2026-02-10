import type { PlaybackBackend, BackendCallbacks } from './Types';

export function createHtml5Backend(callbacks: BackendCallbacks): PlaybackBackend {
	const audio = new Audio();

	audio.addEventListener('play', () => callbacks.onPlay());
	audio.addEventListener('pause', () => callbacks.onPause());
	audio.addEventListener('ended', () => callbacks.onEnded());
	audio.addEventListener('error', () => callbacks.onError('Failed to load audio file'));

	return {
		type: 'html5',
		supportsPlaybackRate: true,

		load(source: string): Promise<void> {
			return new Promise((resolve, reject) => {
				const onLoaded = () => {
					audio.removeEventListener('loadedmetadata', onLoaded);
					audio.removeEventListener('error', onError);
					callbacks.onDurationChange(audio.duration);
					resolve();
				};
				const onError = () => {
					audio.removeEventListener('loadedmetadata', onLoaded);
					audio.removeEventListener('error', onError);
					reject(new Error('Failed to load audio'));
				};
				audio.addEventListener('loadedmetadata', onLoaded);
				audio.addEventListener('error', onError);
				audio.src = source;
			});
		},

		play() {
			audio.play();
		},

		pause() {
			audio.pause();
		},

		seekTo(seconds: number) {
			audio.currentTime = seconds;
		},

		getCurrentTime(): number {
			return audio.currentTime;
		},

		getDuration(): number {
			return audio.duration || 0;
		},

		setVolume(volume: number) {
			audio.volume = volume;
		},

		setPlaybackRate(rate: number): number {
			audio.playbackRate = rate;
			return rate;
		},

		destroy() {
			audio.pause();
			audio.removeAttribute('src');
			audio.load();
		}
	};
}
