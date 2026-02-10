export type SourceType = 'html5' | 'youtube' | 'soundcloud';

export interface BackendCallbacks {
	onPlay: () => void;
	onPause: () => void;
	onEnded: () => void;
	onDurationChange: (duration: number) => void;
	onError: (message: string) => void;
}

export interface PlaybackBackend {
	readonly type: SourceType;
	readonly supportsPlaybackRate: boolean;

	/** Initialize with a source URL. Resolves when ready to play. */
	load(source: string): Promise<void>;

	play(): void;
	pause(): void;
	seekTo(seconds: number): void;
	getCurrentTime(): number;
	getDuration(): number;

	/** Set volume (0 to 1) */
	setVolume(volume: number): void;

	/** Set playback rate. Returns the actual rate applied. */
	setPlaybackRate(rate: number): number;

	/** Clean up all resources */
	destroy(): void;
}
