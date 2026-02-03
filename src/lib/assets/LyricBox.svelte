<script lang="ts">
	let { track = $bindable() }: { track: any } = $props<{}>();
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
	<textarea>
		{track.syncedLyrics}
	</textarea>
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
