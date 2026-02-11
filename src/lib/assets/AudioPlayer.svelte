<script lang="ts">
	import { extractMetadataFromFile } from './ExtractAudio';
	import RangeInput from './RangeInput.svelte';
	import { setSharedTrackData } from './SharedData.svelte';
	import UploadContainer from './UploadContainer.svelte';
	import type { PlaybackBackend } from './playback/Types';
	import { createBackend, detectSourceType, cleanUrl } from './playback/CreateBackend';

	let youtubeContainer: HTMLDivElement;
	let soundcloudContainer: HTMLDivElement;

	let isPlaying = $state<boolean>(false);
	let currentTime = $state<number>(0);
	let duration = $state<number>(0);
	let speed = $state<number>(1);
	let volume = $state<number>(0.25);
	let previousVolume = $state<number>(0.5);
	let isMuted = $state<boolean>(false);
	let animationFrameId = $state<number>(0);
	let showUploadModal = $state<boolean>(false);
	let speedDisabled = $state<boolean>(false);

	let backend: PlaybackBackend | null = null;
	let blobUrl: string | null = null;

	const callbacks = {
		onPlay: () => {
			isPlaying = true;
		},
		onPause: () => {
			isPlaying = false;
		},
		onEnded: () => {
			isPlaying = false;
			currentTime = duration;
		},
		onDurationChange: (d: number) => {
			duration = d;
			setSharedTrackData({ duration: Math.round(d) });
		},
		onError: (msg: string) => {
			console.error('Playback error:', msg);
		}
	};

	async function loadSource(source: string, isFile: boolean = false): Promise<void> {
		if (backend) {
			backend.destroy();
			backend = null;
		}
		if (blobUrl && blobUrl !== source) {
			URL.revokeObjectURL(blobUrl);
			blobUrl = null;
		}

		isPlaying = false;
		currentTime = 0;
		duration = 0;

		const sourceType = isFile ? ('html5' as const) : detectSourceType(source);
		const newBackend = createBackend(sourceType, callbacks, {
			youtubeContainer,
			soundcloudContainer
		});
		backend = newBackend;

		speedDisabled = !newBackend.supportsPlaybackRate;

		try {
			await newBackend.load(source);
			newBackend.setVolume(isMuted ? 0 : volume);
			const actualRate = newBackend.setPlaybackRate(speed);
			if (actualRate !== speed) {
				speed = actualRate;
			}
		} catch (err) {
			console.error('Failed to load source:', err);
			backend = null;
		}
	}

	function handleFileSelect(file: File): void {
		if (file.type.startsWith('audio/')) {
			if (blobUrl) {
				URL.revokeObjectURL(blobUrl);
			}
			blobUrl = URL.createObjectURL(file);
			extractMetadataFromFile(file);
			loadSource(blobUrl, true);
		}
	}

	function handleLinkSelect(url: string): void {
		loadSource(cleanUrl(url));
	}

	function openUploadModal(): void {
		showUploadModal = true;
	}

	function closeUploadModal(): void {
		showUploadModal = false;
	}

	function toggleMute(toggle: boolean): void {
		if (!backend) return;
		if (toggle) {
			previousVolume = volume;
			volume = 0;
			isMuted = true;
		} else {
			volume = previousVolume;
			isMuted = false;
		}
		backend.setVolume(volume);
	}

	function togglePlay(): void {
		if (!backend || duration <= 0) return;
		if (isPlaying) {
			backend.pause();
		} else {
			backend.play();
		}
	}

	function updateTime(): void {
		if (backend && isPlaying) {
			currentTime = backend.getCurrentTime();
			animationFrameId = requestAnimationFrame(updateTime);
		}
	}

	function handleSeek(event: Event): void {
		if (!backend) return;
		const input = event.target as HTMLInputElement;
		const seekTime = parseFloat(input.value);
		backend.seekTo(seekTime);
		currentTime = seekTime;
	}

	function changeSpeed(event: Event): void {
		if (!backend) return;
		const input = event.target as HTMLInputElement;
		const requestedRate = parseFloat(input.value);
		const actualRate = backend.setPlaybackRate(requestedRate);
		speed = actualRate;
	}

	function changeVolume(event: Event): void {
		if (!backend) return;
		const input = event.target as HTMLInputElement;
		volume = parseFloat(input.value);
		backend.setVolume(volume);
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		const centiseconds = Math.floor((seconds % 1) * 100);
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
	}

	$effect(() => {
		setSharedTrackData({ currentTime });
	});

	$effect(() => {
		if (isPlaying) {
			animationFrameId = requestAnimationFrame(updateTime);
		} else {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = 0;
			}
		}
	});
</script>

{#if showUploadModal}
	<UploadContainer
		onclose={closeUploadModal}
		onfileselect={handleFileSelect}
		onlinksubmit={handleLinkSelect}
	/>
{/if}

<div class="player">
	<div class="embed-containers" aria-hidden="true">
		<div bind:this={youtubeContainer}></div>
		<div bind:this={soundcloudContainer}></div>
	</div>

	<div class="upload-playback-container">
		<div class="controls">
			<button class="icon-btn upload" title="Upload Audio" onclick={openUploadModal}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"
					/>
				</svg>
			</button>

			<button class="icon-btn play" title="Play button" onclick={togglePlay}>
				{#if isPlaying}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"
						/>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<div class="time-display">
			<span class="current">{formatTime(currentTime)}</span>
			<span class="separator">/</span>
			<span class="total">{formatTime(duration)}</span>
		</div>
	</div>

	<div class="seek-container">
		<RangeInput
			class="seek"
			min={0}
			max={duration || 0}
			bind:value={currentTime}
			oninput={handleSeek}
			ariaLabel="Seek slider"
		/>
	</div>

	<div class="speed-container" class:speed-disabled={speedDisabled}>
		<button
			class="speed-btn"
			disabled={speedDisabled}
			onclick={() => changeSpeed({ target: { value: speed == 1 ? 1.5 : 1 } } as unknown as Event)}
		>
			{speed.toFixed(2)}x
		</button>
		<RangeInput
			class="speed"
			min={0.25}
			max={2}
			step={0.05}
			bind:value={speed}
			oninput={changeSpeed}
			ariaLabel="Playbackrate slider"
		/>
	</div>

	<div class="volume-container">
		<button class="icon-btn mute" title="Volume button" onclick={() => toggleMute(!isMuted)}>
			{#if Math.round(volume * 100) <= 0}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						d="M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z"
					/>
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						d="M144 416L192 416L326.1 535.2C332.5 540.9 340.7 544 349.2 544C368.4 544 384 528.4 384 509.2L384 130.8C384 111.6 368.4 96 349.2 96C340.7 96 332.5 99.1 326.1 104.8L192 224L144 224C117.5 224 96 245.5 96 272L96 368C96 394.5 117.5 416 144 416zM476.6 245.5C466.3 237.1 451.2 238.7 442.8 249C434.4 259.3 436 274.4 446.3 282.8C457.1 291.6 464 305 464 320C464 335 457.1 348.4 446.3 357.3C436 365.7 434.5 380.8 442.8 391.1C451.1 401.4 466.3 402.9 476.6 394.6C498.1 376.9 512 350.1 512 320C512 289.9 498.1 263.1 476.5 245.5z"
					/>
				</svg>
			{/if}
		</button>
		<RangeInput
			class="volume"
			min={0}
			max={1}
			step={0.01}
			bind:value={volume}
			oninput={changeVolume}
			ariaLabel="Volume slider"
		/>
	</div>
</div>

<style>
	.upload-playback-container {
		display: flex;
		gap: 1rem;
	}
	.player {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--neutral-500);
		flex-wrap: wrap;
	}

	.embed-containers {
		display: none;
		width: 0px;
		height: 0px;
		overflow: hidden;
		pointer-events: none;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition);
	}

	.icon-btn svg {
		width: 20px;
		height: 20px;
		fill: var(--neutral-200);
		transition: fill var(--transition);
	}

	.icon-btn:hover {
		background: var(--neutral-450);
	}

	.icon-btn:hover svg {
		fill: var(--neutral-100);
	}

	.icon-btn.upload svg {
		fill: var(--brand-500);
		width: 40px;
		height: 40px;
	}

	.icon-btn.upload:hover {
		background: var(--brand-500);
	}

	.icon-btn.upload:hover svg {
		fill: var(--neutral-700);
	}

	.icon-btn.play {
		background: var(--brand-500);
		border-radius: 50%;
	}

	.icon-btn.play svg {
		fill: var(--neutral-700);
	}

	.icon-btn.play:hover {
		background: var(--brand-400);
	}

	.time-display {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.9375rem;
		font-variant-numeric: tabular-nums;
	}

	.current {
		color: var(--neutral-100);
	}

	.separator {
		color: var(--neutral-200);
	}

	.total {
		color: var(--neutral-200);
	}

	.seek-container {
		flex: 1;
		min-width: 100px;
	}

	.speed-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.speed-disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.speed-btn {
		font-size: 0.9375rem;
		padding: 0.25rem 0.5rem;
		background: var(--neutral-450);
		border: 1px solid var(--neutral-400);
		color: var(--neutral-100);
		border-radius: var(--radius-sm);
		min-width: 50px;
	}

	.speed-btn:hover {
		background: var(--neutral-400);
		border-color: var(--neutral-200);
		color: var(--neutral-100);
	}

	.volume-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	:global(.seek) {
		width: 100%;
	}

	:global(.speed) {
		width: 60px;
	}

	:global(.volume) {
		width: 70px;
	}

	@media only screen and (max-width: 800px) {
		.seek-container {
			order: 10;
			flex: 100%;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
		}
		:global(.seek-container) {
			padding-left: 0.75rem;
			padding-right: 0.75rem;
		}
	}

	@media only screen and (max-width: 518px) {
		.player {
			padding: 0.5rem 0.75rem;
			gap: 0.5rem;
			justify-content: space-evenly;
		}

		.icon-btn {
			width: 32px;
			height: 32px;
		}

		.icon-btn.play {
			width: 36px;
			height: 36px;
		}

		.icon-btn svg {
			width: 18px;
			height: 18px;
		}

		.time-display,
		.speed-btn {
			font-size: 0.75rem;
		}

		:global(.speed),
		:global(.volume) {
			width: 90px;
		}
	}
</style>
