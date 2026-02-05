<script lang="ts">
	import { formatLyrics } from '$lib/assets/FormatLyrics';
	import { setSharedTrackData } from './SharedData.svelte';
	let {
		result = $bindable(),
		userPick = $bindable(),
		getSyncedLyrics = $bindable(),
		showResults = $bindable()
	}: {
		result: any;
		userPick: any;
		getSyncedLyrics: boolean;
		showResults: boolean;
	} = $props<{}>();

	let resultsContainer = $state<HTMLDivElement>();

	function setUserPick(getSynced: boolean, item: any) {
		showResults = false;
		item.plainLyrics = formatLyrics(item?.plainLyrics);
		item.syncedLyrics = formatLyrics(item?.syncedLyrics);
		userPick = item;
		let artist: string = userPick.artistName;
		let album: string = userPick.albumName;
		let track: string = userPick.trackName;
		let duration: number = userPick.duration;
		setSharedTrackData({ artist: artist, album: album, track: track, duration: duration });
		getSyncedLyrics = getSynced;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<svelte:document
	onclick={(e) => {
		if (
			resultsContainer &&
			!resultsContainer.contains(e.target as HTMLElement) &&
			!document.getElementById('searchInput')?.contains(e.target as HTMLElement)
		) {
			showResults = false;
		}
	}}
/>

{#if result && showResults}
	<div class="results-container" bind:this={resultsContainer}>
		<div class="results-header">
			<span class="results-count">{result.length} results</span>
		</div>
		<div class="results-list">
			{#each result as item}
				<div class="result-card">
					<div class="result-info">
						<p class="track-name">{item.trackName}</p>
						<p class="album-artist">{item.albumName} · {item.artistName}</p>
					</div>
					<div class="result-actions">
						<span class="duration">{formatTime(item.duration)}</span>
						{#if item.plainLyrics || item.syncedLyrics}
							{#if item.plainLyrics}
								<button class="btn-plain" onclick={() => setUserPick(false, item)}>Plain</button>
							{/if}
							{#if item.syncedLyrics}
								<button class="btn-synced" onclick={() => setUserPick(true, item)}>Synced</button>
							{/if}
						{:else}
							<span class="instrumental">Instrumental</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.results-container {
		position: absolute;
		top: 167px;
		left: 0;
		right: 0;
		height: calc(100% - 316px);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		overflow: hidden;
	}

	.results-header {
		padding-bottom: 0.75rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--neutral-450);
	}

	.results-count {
		font-size: 0.8125rem;
		color: var(--neutral-200);
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow-y: auto;
		padding-right: 0.5rem;
	}

	.result-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.875rem 1rem;
		background: var(--neutral-500);
		border-radius: var(--radius-md);
		border-left: 3px solid var(--brand-500);
		transition: all var(--transition);
	}

	.result-card:hover {
		background: var(--neutral-450);
	}

	.result-info {
		flex: 1;
		min-width: 0;
	}

	.track-name {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--neutral-100);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.album-artist {
		font-size: 0.8125rem;
		color: var(--neutral-200);
		margin: 0.25rem 0 0 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.result-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.duration {
		font-size: 0.75rem;
		color: var(--brand-500);
		background: var(--brand-900);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		font-variant-numeric: tabular-nums;
	}

	.btn-plain,
	.btn-synced {
		font-size: 0.75rem;
		padding: 0.25rem 0.625rem;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition);
	}

	.btn-plain {
		background: var(--neutral-400);
		color: var(--neutral-100);
	}

	.btn-plain:hover {
		background: var(--neutral-200);
		color: var(--neutral-700);
	}

	.btn-synced {
		background: var(--brand-500);
		color: var(--neutral-700);
	}

	.btn-synced:hover {
		background: var(--brand-400);
	}

	.instrumental {
		font-size: 0.75rem;
		color: var(--neutral-200);
		background: var(--neutral-450);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
	}

	@media only screen and (max-width: 800px) {
		.results-container {
			top: 153px;
			height: calc(100% - 331px);
		}
	}

	@media only screen and (max-width: 400px) {
		.results-container {
			top: 144px;
			height: calc(100% - 317px);
		}

		.result-card {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.result-actions {
			width: 100%;
		}
	}
</style>
