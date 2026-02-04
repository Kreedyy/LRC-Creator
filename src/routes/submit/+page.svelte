<script lang="ts">
	import {
	getSharedDuration,
		getSharedLyrics,
		setSharedTrackData
	} from '$lib/assets/SharedData.svelte';
	import LyricBox from '$lib/assets/LyricBox.svelte';

	let artist = $state<string>();
	let track = $state<string>();
	let album = $state<string>();

	let lyrics = $state<string>();
	lyrics = getSharedLyrics();

	$effect(() => {
		setSharedTrackData({ artist: artist, track:track, album: album, lyrics: lyrics });
	});
</script>

<div class="base">
	<form>
		<div class="inputContainer">
			<div>
				<label for="artist">Artist</label>
			<input id="artist" type="text" bind:value={artist} />
			</div>

			<div>
				<label for="track">Track</label>
			<input id="track" type="text" bind:value={track} />
			</div>

			<div>
				<label for="album">Album</label>
			<input id="album" type="text" bind:value={album} />
			</div>
		</div>
		<LyricBox {lyrics} />
	</form>
</div>

<style>
	input{
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		padding-left: 0.25rem;
		background: var(--neutral-450);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		font-size: 1rem;
	}
	.inputContainer{
		display: flex;
		gap: 2rem;
	}
	label{
		color: var(--neutral-100);
	}
	:global(.lyricEditor){
		flex: 1;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		gap: 1rem;
	}
	.base {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
	}
		@media only screen and (max-width: 600px) {
		.base {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
