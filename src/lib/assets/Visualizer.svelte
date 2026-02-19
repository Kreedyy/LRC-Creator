<script lang="ts">
	import { extractLyricsLines, extractTimestamps, formatLyrics } from './FormatLyrics';
	import { getSharedCurrentTime, getSharedLyrics, requestSeek } from './SharedData.svelte';

	let lyrics = $derived<string[]>(formatLyrics(getSharedLyrics()).split('\n'));
	let lyricsTimestamps = $derived<string[]>(extractTimestamps(lyrics));
	let lyricsLines = $derived<string[]>(extractLyricsLines(lyrics));
	let currentTime = $derived<number>(getSharedCurrentTime());

	let selectedIndex = $state<number>(0);

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		const centiseconds = Math.floor((seconds % 1) * 100);
		return `[${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}]`;
	}

	function parseTimestamp(ts: string): number {
		const match = ts.match(/^\[(\d{2}):(\d{2})\.(\d{2})\]/);
		if (!match) return -1;
		return parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100;
	}

	function setActiveLyrics() {
		let newIndex = 0;
		for (let i = 0; i < lyricsTimestamps.length; i++) {
			const t = parseTimestamp(lyricsTimestamps[i]);
			if (t !== -1 && currentTime >= t) newIndex = i;
		}
		selectedIndex = newIndex;
	}

	$effect(() => {
		void currentTime;
		setActiveLyrics();
	});

	function skipToLyrics(index: number) {
		const t = parseTimestamp(lyricsTimestamps[index]);
		if (t !== -1) requestSeek(t, true);
	}
</script>

<div class="main-container">
	<div class="gap">
		{#each lyrics, index}
			<button
				class="line-container {index === selectedIndex ? 'active' : ''} {index}"
				onclick={() => skipToLyrics(index)}
			>
				<div class="current-time-container">
					{#if index == selectedIndex}
						<p class="timestamp">{formatTime(currentTime)} ></p>
					{/if}
				</div>
				<p>{lyricsTimestamps[index]} {lyricsLines[index]}</p>
			</button>
		{/each}
	</div>
</div>

<style>
	/*If index class is even, style it differently */
	.current-time-container {
		width: 125px;
	}
	.gap {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-bottom: 2rem;
	}
	.line-container {
		display: grid;
		grid-template-columns: auto 1fr;
		text-align: left;
		max-width: 1000px;
		padding-top: 1rem;
		padding-bottom: 1rem;
		min-width: 500px;
	}
	.line-container.active {
		background-color: var(--brand-500);
	}

	button:focus,
	button:hover {
		background-color: var(--brand-500);
		color: var(--neutral-450);
	}
	.line-container.active p,
	button:focus p,
	button:hover p {
		color: var(--neutral-450);
	}
	.main-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		align-items: center;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.sync-container {
		position: sticky;
		margin-top: auto;

		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		padding-bottom: 1rem;
		width: 100%;
	}
	.sync-btn {
		min-width: fit-content;
		width: calc(100% - 10rem);
		max-width: 400px;
	}
</style>
