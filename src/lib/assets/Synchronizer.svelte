<script lang="ts">
	import { extractLyricsLines, extractTimestamps, formatLyrics } from './FormatLyrics';
	import { getSharedCurrentTime, getSharedLyrics, setSharedTrackData } from './SharedData.svelte';
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

	function updateTimestamp(index: number) {
		const newTimestamp = formatTime(currentTime);

		const updatedLines = lyricsLines.map((line, i) => {
			if (i === index) {
				return `${newTimestamp} ${line}`;
			}

			const existing = lyricsTimestamps[i];
			return existing ? `${existing} ${line}` : line;
		});

		setSharedTrackData({ lyrics: updatedLines.join('\n') });

		if (selectedIndex < lyricsLines.length - 1) {
			setSelectedIndex(selectedIndex + 1);
		}
	}

	function setSelectedIndex(index: number) {
		selectedIndex = index;
	}
</script>

<div class="main-container">
	<div class="gap">
		{#each lyrics, index}
			<button
				class="line-container {index === selectedIndex ? 'active' : ''} {index}"
				onclick={() => setSelectedIndex(index)}
			>
				<div class="current-time-container">
					{#if index == selectedIndex}
						<p class="timestamp">{formatTime(currentTime)} ></p>
					{/if}
				</div>
				<p>{lyricsTimestamps[index]} {lyricsLines[index]}</p>
			</button>
		{/each}
		<div class="sync-container">
			<button onclick={() => updateTimestamp(selectedIndex)} class="sync-btn">Sync</button>
		</div>
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
		height: 100%;
	}
	.line-container {
		display: grid;
		grid-template-columns: auto 1fr;
		text-align: left;
	}
	.line-container.active {
		background-color: var(--brand-500);
	}
	.line-container.active p {
		color: var(--neutral-450);
	}
	button:focus,
	button:hover,
	button:active {
		background-color: var(--neutral-450);
		cursor: var(--neutral-100);
	}
	.main-container {
		position: relative;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		overflow-y: auto;
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
	.sync-btn:focus,
	.sync-btn:hover,
	.sync-btn:active{
		color:var(--neutral-100);
	}
</style>
