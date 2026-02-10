declare namespace YT {
	const enum PlayerState {
		UNSTARTED = -1,
		ENDED = 0,
		PLAYING = 1,
		PAUSED = 2,
		BUFFERING = 3,
		CUED = 5
	}

	interface PlayerOptions {
		videoId?: string;
		width?: string | number;
		height?: string | number;
		playerVars?: Record<string, unknown>;
		events?: {
			onReady?: (event: { target: Player }) => void;
			onStateChange?: (event: OnStateChangeEvent) => void;
			onError?: (event: OnErrorEvent) => void;
		};
	}

	interface OnStateChangeEvent {
		data: PlayerState;
		target: Player;
	}

	interface OnErrorEvent {
		data: number;
		target: Player;
	}

	class Player {
		constructor(el: HTMLElement | string, options: PlayerOptions);
		playVideo(): void;
		pauseVideo(): void;
		seekTo(seconds: number, allowSeekAhead: boolean): void;
		getCurrentTime(): number;
		getDuration(): number;
		setVolume(volume: number): void;
		getVolume(): number;
		setPlaybackRate(rate: number): void;
		getPlaybackRate(): number;
		getAvailablePlaybackRates(): number[];
		destroy(): void;
	}
}

declare namespace SC {
	function Widget(iframe: HTMLIFrameElement): WidgetInstance;

	interface WidgetInstance {
		bind(event: string, callback: (...args: unknown[]) => void): void;
		unbind(event: string): void;
		play(): void;
		pause(): void;
		seekTo(milliseconds: number): void;
		getPosition(callback: (position: number) => void): void;
		getDuration(callback: (duration: number) => void): void;
		getVolume(callback: (volume: number) => void): void;
		setVolume(volume: number): void;
	}

	namespace Widget {
		const enum Events {
			READY = 'ready',
			PLAY = 'play',
			PAUSE = 'pause',
			FINISH = 'finish',
			PLAY_PROGRESS = 'playProgress',
			LOAD_PROGRESS = 'loadProgress',
			SEEK = 'seek',
			ERROR = 'error'
		}
	}
}

interface Window {
	onYouTubeIframeAPIReady?: () => void;
}
