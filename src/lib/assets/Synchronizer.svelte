<script lang="ts">
	import { extractLyricsLines, extractTimestamps } from './FormatLyrics';
	import { getSharedCurrentTime, getSharedLyrics } from './SharedData.svelte';
	let lyrics = $derived<string[]>(getSharedLyrics().split('\n'));
	let lyricsTimestamps = $derived<string[]>(extractTimestamps(lyrics));
	let lyricsLines = $derived<string[]>(extractLyricsLines(lyrics));
	let currentTime = $derived<number>(getSharedCurrentTime());
	let index = $state<number>(0);

	let selectedIndex = $state<number>(0);

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		const centiseconds = Math.floor((seconds % 1) * 100);
		return `[${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}]`;
	}

	function updateTimestamp(index: number) {
		lyricsTimestamps[index] = formatTime(currentTime);
	}

	function setSelectedIndex(index: number) {
		selectedIndex = index;
	}
</script>

<div class="main-container">
	<div class="gap">
		{#each lyrics, index}
			<div class="line-container {index}" onclick={() => setSelectedIndex(index)}>
				<div class="current-time-container">
					{#if index == selectedIndex}
						<p class="timestamp">{formatTime(currentTime)} ></p>
					{/if}
				</div>
				<p>{lyricsTimestamps[index]} {lyricsLines[index]}</p>
			</div>
		{/each}
	</div>

	<div class="sync-container">
		<button onclick={() => updateTimestamp(selectedIndex)} class="sync-btn">Sync</button>
	</div>
</div>

<style>
	/*If index class is even, style it differently */
	.current-time-container{
		width: 125px;
	}
	.gap {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-bottom: 5rem;
		height: 100%;
		flex: 1;
		overflow-y: auto;
	}
	.line-container {
		display: grid;
		grid-template-columns: auto 1fr;
	}
	.main-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.sync-container {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		width: 100%;
		padding-bottom: 1rem;
	}
	.sync-btn {
		min-width: fit-content;
		width: calc(100% - 10rem);
		max-width: 400px;
	}
</style>
