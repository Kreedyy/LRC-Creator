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

<input class="searchInput" type="text" bind:value={userSearch} />
<button onclick={() => search(userSearch)}>test</button>

<style>
	.searchInput {
		background: var(--neutral-550);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
	}
</style>
