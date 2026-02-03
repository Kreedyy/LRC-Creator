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
			<p>{result.artistName}</p>
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
	{/each}
</div>

<style>
	.container {
		position: fixed;
		display: flex;
		flex-direction: column;
	}
	.plain{
		background-color: rgb(31 41 55); /*Match colors from LRCLIB*/
		color: rgb(229 231 235);
	}
	.synced{
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
</style>
