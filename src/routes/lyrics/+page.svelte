<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';

	let result = $state<any>();
	let userPick = $state<any>();
	let getSyncedLyrics = $state<boolean>();
	let showResults = $state<boolean>(false);
</script>

<div>
	<!--Fetch results and assign to data-->
	<LyricSearch bind:result bind:showResults/>
	<!--Showcase of results from data and handles user pick-->
	<ShowResults bind:userPick bind:getSyncedLyrics {result} bind:showResults/>
	<!--Processes user pick by filling textarea with lyrics-->
	<LyricBox {userPick} {getSyncedLyrics} />
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
	@media only screen and (max-width: 600px){
		div{
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
