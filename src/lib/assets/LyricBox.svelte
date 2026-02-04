<script lang="ts">
	import { formatLyrics } from '$lib/assets/FormatLyrics';
	import { shared } from '$lib/assets/SharedData.svelte';
	let {
		userPick = $bindable(),
		getSyncedLyrics = $bindable(true),
		lyrics = $bindable()
	}: { userPick?: any; getSyncedLyrics?: boolean; lyrics: string } = $props<{}>();

	function setPlainOrSyncedLyrics(syncedLyrics: boolean) {
		if (userPick.syncedLyrics) {
			lyrics = syncedLyrics ? userPick.syncedLyrics : userPick.plainLyrics;
		} else {
			lyrics = userPick.plainLyrics;
		}
	}

	function format() {
		if (lyrics) {
			lyrics = formatLyrics(lyrics);
		}
	}

	$effect(() => {
		if (userPick) {
			setPlainOrSyncedLyrics(getSyncedLyrics);
		}
	});
	$effect(() => {
		shared.lyrics = lyrics;
		const timer = setTimeout(format, 3000);
    return () => clearTimeout(timer);
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
<div>
	<button onclick={format}> Format </button>
	<textarea bind:value={lyrics}> </textarea>
</div>

<style>
	button {
		position: absolute;
		font-size: 1.25rem;
		background: var(--neutral-450);
		color: var(--neutral-100);
		border: 2px solid var(--brand-500);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: underline;
		padding-top: 0.2rem;
		padding-bottom: 0.25rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		cursor: pointer;
	}
	div {
		width: 100%;
		max-width: fit-content;
		justify-content: end;
		align-items: end;
		height: 100%;
		display: flex;
	}
	textarea {
		resize: none;
		overflow-y: scroll;
		border: 2px solid var(--brand-500);
		background: var(--neutral-450);
		width: 750px;
		height: calc(
			100% - 0.5rem - 4px - 37px
		); /*0.5rem from padding top, 4px for border (2px * 2), 37px for padding bottom*/
		color: var(--neutral-100);
		padding: 0.5rem;
		margin: 0;
		padding-bottom: 37px;
	}
	@media only screen and (max-width: 600px) {
		textarea {
			height: calc(100% - 0.5rem - 4px - 33px);
			padding-bottom: 33px;
		}
		button {
			font-size: 1rem;
		}
	}
</style>
