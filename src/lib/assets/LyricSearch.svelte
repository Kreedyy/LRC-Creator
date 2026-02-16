<script lang="ts">
	let { result = $bindable(), showResults = $bindable() }: { result: any; showResults: boolean } =
		$props();

	let isSearching = $state<boolean>(false);

	let maxChars: number = 50;

	function reformatInput(input: string) {
		let formattedInput: string = input.replace(/ /g, '+');
		return formattedInput;
	}

	async function search(input: string) {
		input = input.trim().slice(0, maxChars);
		if (input == '') return;

		isSearching = true;
		const response = await fetch(`/api/search?q=${reformatInput(input)}`);
		result = await response.json();
		isSearching = false;
		setShowResults();
	}

	function setShowResults() {
		if (result && result.length > 0) {
			showResults = true;
		}
	}

	let userSearch = $state<string>('');
</script>

<div class="search-container">
	<label for="searchInput">Search lyrics</label>
	<div class="input-row">
		<input
			id="searchInput"
			type="text"
			placeholder="Track, artist, or album..."
			maxlength={maxChars}
			bind:value={userSearch}
			onkeydown={(e) => e.key === 'Enter' && search(userSearch)}
			onclick={setShowResults}
		/>
		<button title="Search"
onclick={() => search(userSearch)} disabled={isSearching}>
			{#if isSearching}
				<span class="spinner"></span>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path
						d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
					/>
				</svg>
			{/if}
		</button>
	</div>
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		width: 100%;
		align-items: center;
	}

	label {
		font-size: 1.25rem;
		color: var(--neutral-200);
	}

	.input-row {
		display: flex;
		gap: 0.5rem;
		width: 100%;
		justify-content: center;
	}

	input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		background: var(--neutral-500);
		border: 2px solid var(--neutral-400);
		border-radius: var(--radius-sm);
		color: var(--neutral-100);
		font-size: 1rem;
		outline: none;
		transition: all var(--transition);
		width: 100%;
		max-width: 250px;
	}

	input:focus {
		border-color: var(--brand-500);
		background: var(--neutral-450);
	}

	input::placeholder {
		color: var(--neutral-200);
		opacity: 0.6;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		padding: 0;
		background: var(--brand-500);
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition);
	}

	button:hover:not(:disabled) {
		background: var(--brand-400);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	button svg {
		width: 18px;
		height: 18px;
		fill: var(--neutral-700);
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid var(--neutral-700);
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
