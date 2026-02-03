<script lang="ts">
	let {
		result = $bindable(),
		userPick = $bindable(),
		getSynced = $bindable()
	}: {
		result: any;
		userPick: any;
		getSynced: boolean;
	} = $props<{}>();

	// $effect(() => {
	// 	console.log(result);
	// });
	function setUserPick(getSyncedLyrics: boolean, result: any) {
		userPick = result;
		getSynced = getSyncedLyrics;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<!--
.trackName string
.name string //Same as .trackName?
.albumName string
.artistName string
.duration number
.id number
.instrumental bool
.plainLyrics string
.syncedLyrics

show buttons for importing plain and synced lyrics or mark as instrumental if instrumental
-->

{#if result}
	<div class="showResults">
		{#each result as item}
			<div class="result">
				<p>{item.trackName}</p>
				<div class="lyricButtons">
					<p class="duration">
						{formatTime(item.duration)}
					</p>
					{#if item.plainLyrics || item.syncedLyrics}
						<!--Checks if lyrics exist, if json returns null/undefined these will be false-->
						{#if item.plainLyrics}
							<button class="plain" onclick={() => setUserPick(false, item)}>Plain</button>
						{/if}
						{#if item.syncedLyrics}
							<button class="synced" onclick={() => setUserPick(true, item)}>Synced</button>
						{/if}
					{:else}
						<p>(Instrumental)</p>
					{/if}
				</div>
				<div class="album">
					<p>{item.albumName} - {item.artistName}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.lyricButtons {
		display: flex;
		gap: 0.5rem;
	}
	.showResults {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: scroll;
		position: fixed;

		border: 2px solid var(--brand-500);
		border-radius: 0.25rem;
		backdrop-filter: blur(3px);
	}
	.result {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--neutral-400);
		padding: 1rem;
	}
	.album {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.duration {
		color: rgb(49 46 129);
		background-color: rgb(199 210 254);
		width: fit-content;
	}
	.plain {
		background-color: rgb(31 41 55); /*Match colors from LRCLIB*/
		color: rgb(229 231 235);
	}
	.synced {
		background-color: rgb(22 101 52); /*Match colors from LRCLIB*/
		color: rgb(187 247 208);
	}
	button {
		font-size: 1rem;
		color: var(--neutral-100);
		cursor: pointer;
		background: transparent;
		padding: 0;
		border: 0;
	}
	.plain,
	.synced,
	.duration {
		border-radius: 0.25rem;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
	}
</style>
