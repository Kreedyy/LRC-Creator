<script lang="ts">
	let { onclose }: { onclose: () => void } = $props();

	let linkUrl = $state<string>('');
	let isLoading = $state<boolean>(false);

	async function validateLink(url: string): Promise<boolean> {
		// TODO: Implement actual validation
		return true;
	}

	async function handleSubmit(): Promise<void> {
		if (!linkUrl.trim()) return;

		isLoading = true;
		const isValid = await validateLink(linkUrl);

		if (isValid) {
			console.log('Link submitted:', linkUrl);
			onclose();
		}
		isLoading = false;
	}
</script>

<div class="link-upload">
	<div class="input-group">
		<label for="linkInput">Paste audio URL</label>
		<input
			id="linkInput"
			type="text"
			placeholder="https://youtube.com/watch?v=..."
			bind:value={linkUrl}
			onkeydown={(e) => e.key === 'Enter' && handleSubmit()}
		/>
	</div>
	<button class="submit-btn" onclick={handleSubmit} disabled={!linkUrl.trim() || isLoading}>
		{#if isLoading}
			<span class="spinner"></span>
			Loading...
		{:else}
			Load Audio
		{/if}
	</button>
	<p class="hint">Supports YouTube, SoundCloud, and direct audio URLs</p>
</div>

<style>
	.link-upload {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 164px;
		justify-content: center;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	label {
		font-size: 0.8125rem;
		color: var(--neutral-200);
	}

	input {
		padding: 0.625rem 0.75rem;
		background: var(--neutral-450);
		border: 2px solid var(--neutral-400);
		border-radius: var(--radius-sm);
		color: var(--neutral-100);
		font-size: 0.9375rem;
		outline: none;
		transition: all var(--transition);
	}

	input:focus {
		border-color: var(--brand-500);
		background: var(--neutral-400);
	}

	input::placeholder {
		color: var(--neutral-200);
		opacity: 0.6;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: var(--brand-500);
		border: none;
		border-radius: var(--radius-sm);
		color: var(--neutral-700);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition);
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--brand-400);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.hint {
		font-size: 0.75rem;
		color: var(--neutral-200);
		text-align: center;
		margin: 0;
	}

	.spinner {
		width: 14px;
		height: 14px;
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
