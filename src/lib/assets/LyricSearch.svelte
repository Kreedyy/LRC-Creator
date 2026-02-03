<!--
User can search and import lyrics from LRCLIB(?) GET /api/search @param `q`
Show results (GET) when user stops typing for 1s or make button to search for less calls

SCHEMA NOTES:

no synced lyrics -> return null
-->

<script lang="ts">
	let { result = $bindable() } = $props();

	function reformatInput(input: string) {
		let formattedInput: string = input.replace(/ /g, '+');
		return formattedInput;
	}

	async function search(input: string) {
		if (input.trim() == '') return;

		const response = await fetch(`/api/lyrics?q=${reformatInput(input)}`);
		result = await response.json();
	}

	let userSearch = $state<string>('');
</script>

<label for="searchInput">Search track, artist or album</label>
<div>
	<input id="searchInput" class="searchInput" type="text" bind:value={userSearch} />
	<button onclick={() => search(userSearch)}>Search</button>
</div>

<style>
	button {
		font-size: 1rem;
		padding: 0;
		margin: 0;
		background-color: var(--neutral-550);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		cursor: pointer;
	}
	label {
		color: var(--neutral-100);
	}
	.searchInput {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		background: var(--neutral-550);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		font-size: 1rem;
	}
</style>
