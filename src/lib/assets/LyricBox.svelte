<script lang="ts">
	let { track = $bindable(), getSyncedLyrics = $bindable() }: { track: any, getSyncedLyrics: boolean } = $props<{}>();
	$effect(() => {
		console.log(track);
	});
	// Transform data here
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
-->

{#if track != undefined}
	{#if getSyncedLyrics}
	<textarea>
		{track.syncedLyrics}
	</textarea>
	{:else if !getSyncedLyrics}
	<textarea>
		{track.plainLyrics}
	</textarea>
	{/if}
{/if}


<style>
	textarea {
		resize: none;
		overflow-y: scroll;
		border: 2px solid var(--brand-500);
		background: var(--neutral-550);
		width: 100%;
		max-width: 750px;
		height: 100%;
		color: var(--neutral-100);
		padding: 0.5rem;
	}
</style>
