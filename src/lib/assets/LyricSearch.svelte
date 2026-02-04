<!--
User can search and import lyrics from LRCLIB(?) GET /api/search @param `q`
Show results (GET) when user stops typing for 1s or make button to search for less calls

SCHEMA NOTES:

no synced lyrics -> return null
-->

<script lang="ts">
	let { result = $bindable(), showResults = $bindable() }: { result: any; showResults: boolean } =
		$props();

	function reformatInput(input: string) {
		let formattedInput: string = input.replace(/ /g, '+');
		return formattedInput;
	}

	async function search(input: string) {
		if (input.trim() == '') return;

		const response = await fetch(`/api/lyrics?q=${reformatInput(input)}`);
		result = await response.json();
		setShowResults();
	}

	function setShowResults() {
		if (result && result.length > 0) {
			showResults = true;
		}
	}

	let userSearch = $state<string>('');
</script>

<div>
	<label for="searchInput">Search track, artist or album</label>
	<div class="input">
		<input
			id="searchInput"
			class="searchInput"
			type="text"
			bind:value={userSearch}
			onkeydown={() => search(userSearch)}
			onclick={setShowResults}
		/>
		<button onclick={() => search(userSearch)}>Search</button>
	</div>
</div>

<style>
	.input {
		display: flex;
		gap: 0.5rem;
	}
	button {
		font-size: 1rem;
		padding: 0;
		margin: 0;
		background-color: var(--neutral-450);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		cursor: pointer;
	}
	label {
		display: flex;
		color: var(--neutral-100);
		width: 100%;
		justify-content: center;
	}
	.searchInput {
		max-width: 208px;
		width: 100%;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		background: var(--neutral-450);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		font-size: 1rem;
	}
</style>
