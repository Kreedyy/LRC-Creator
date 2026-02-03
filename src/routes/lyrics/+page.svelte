<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';

	let data = $state<any>();
	let track = $state<any>();
	let getSyncedLyrics = $state<boolean>();
</script>

<div>
	<!--Fetch results and assign to data-->
	<LyricSearch bind:result={data} />
	<!--Showcase of results from data and handles user pick-->
	<ShowResults bind:userPick={track} bind:getSynced={getSyncedLyrics} {data} />
	<!--Processes user pick by filling textarea with lyrics-->
	<LyricBox {track} {getSyncedLyrics} />
</div>

<style>
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
</style>
