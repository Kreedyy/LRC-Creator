<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';

	let result = $state<any>();
	let userPick = $state<any>();
	let getSyncedLyrics = $state<boolean>();
	let showResults = $state<boolean>(false);
	let lyrics = $state<string>();
</script>

<div>
	<!--Fetch results and assign to data-->
	<LyricSearch bind:result bind:showResults />
	<!--Showcase of results from data and handles user pick-->
	<ShowResults bind:userPick bind:getSyncedLyrics {result} bind:showResults />
	<!--Processes user pick by filling textarea with lyrics-->
	<LyricBox {userPick} {getSyncedLyrics} bind:lyrics />
	<a href="/submit">Submitting to LRCLIB</a>
</div>

<style>
	a {
		font-size: 1.25rem;
	}
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
		position: relative;
	}
	:global(.showResults) {
		z-index: 2;
		height: 100%;
		width: calc(100% - 6rem);
		max-width: calc(750px - 1rem + 4px);
		height: calc(100% - 13rem);
	}
	@media only screen and (max-width: 600px) {
		div {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		:global(.showResults) {
			width: calc(100% - 4rem);
		}
	}
</style>
