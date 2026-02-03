<script lang="ts">
	let {
		data = $bindable(),
		userPick = $bindable(),
		getSynced = $bindable()
	}: {
		data: any;
		userPick: any;
		getSynced: boolean;
	} = $props<{}>();

	// $effect(() => {
	// 	console.log(data);
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

<div class="container">
	{#each data as result}
		<div class="result">
			<p>{result.trackName}</p>
			<div class="lyricButtons">
				<p class="duration">
					{formatTime(result.duration)}
				</p>
				{#if result.plainLyrics || result.syncedLyrics}
					<!--Checks if lyrics exist, if json returns null/undefined these will be false-->
					{#if result.plainLyrics}
						<button class="plain" onclick={() => setUserPick(false, result)}>Plain</button>
					{/if}
					{#if result.syncedLyrics}
						<button class="synced" onclick={() => setUserPick(true, result)}>Synced</button>
					{/if}
				{:else}
					<p>(Instrumental)</p>
				{/if}
			</div>
			<div class="album">
				<p>{result.albumName} - {result.artistName}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.lyricButtons{
		display: flex;
		gap: 0.5rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: scroll;
		position: fixed;
	}
	.result {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--neutral-550);
		padding: 1rem;
		border: 2px solid var(--brand-500);
		border-radius: 0.25rem;
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
