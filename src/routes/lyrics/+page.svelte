<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';

	let result = $state<any>();
	let track = $state<any>();
	let getSyncedLyrics = $state<boolean>();
</script>

<div>
	<!--Fetch results and assign to data-->
	<LyricSearch bind:result />
	<!--Showcase of results from data and handles user pick-->
	<ShowResults bind:userPick={track} bind:getSynced={getSyncedLyrics} {result} />
	<!--Processes user pick by filling textarea with lyrics-->
	<LyricBox {track} {getSyncedLyrics} />
</div>

<style>
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
	}
	:global(.showResults) {
		z-index: 2;
		height: 75%;
		max-height: 500px;
	}
</style>
