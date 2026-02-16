<script lang="ts">
	import {
		getSharedAlbum,
		getSharedArtist,
		getSharedDuration,
		getSharedLyrics,
		getSharedTrack,
		setSharedTrackData
	} from '$lib/assets/SharedData.svelte';
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import { onMount } from 'svelte';

	let wasmModule: any = null;
	let wasmLoaded = $state(false);

	onMount(async () => {
		try {
			const wasm = await import('$lib/wasm/lrclib_challenge_solver');
			await wasm.default();
			wasmModule = wasm;
			wasmLoaded = true;
			console.log('WASM challenge solver loaded');
		} catch (err) {
			console.error('Failed to load WASM module:', err);
			error = 'Failed to load challenge solver. Please refresh the page.';
		}
	});

	let artist = $derived(getSharedArtist());
	let track = $derived(getSharedTrack());
	let album = $derived(getSharedAlbum());
	let lyrics = $derived(getSharedLyrics());
	let duration = $derived(getSharedDuration());

	$effect(() => {
		setSharedTrackData({ artist, track, album, lyrics, duration });
	});

	let loading = $state(false);
	let solvingChallenge = $state(false);
	let error = $state('');
	let success = $state(false);
	let progress = $state('');

	async function postLyrics(e: Event) {
		e.preventDefault();

		if (!wasmLoaded || !wasmModule) {
			error = 'Challenge solver not loaded. Please refresh the page.';
			return;
		}

		loading = true;
		solvingChallenge = false;
		error = '';
		success = false;
		progress = 'Preparing submission...';

		setSharedTrackData({
			artist,
			track,
			album,
			lyrics,
			duration
		});

		try {
			progress = 'Requesting challenge...';

			// Request challenge via server
			const challengeResponse = await fetch('/api/request-challenge', {
				method: 'POST'
			});

			if (!challengeResponse.ok) {
				throw new Error('Failed to get challenge');
			}

			const { prefix, target } = await challengeResponse.json();

			// Solve challenge using WASM (client-side), way faster than using js
			progress = 'Solving challenge (this may take a moment)...';
			solvingChallenge = true;

			// Run solver in a setTimeout to allow UI to update
			const nonce = await new Promise<string>((resolve, reject) => {
				setTimeout(() => {
					try {
						const result = wasmModule.solve_challenge(prefix, target);
						resolve(result);
					} catch (err) {
						reject(err);
					}
				}, 10);
			});

			solvingChallenge = false;

			const publishToken = `${prefix}:${nonce}`;

			// Publish via server proxy
			progress = 'Publishing lyrics...';

			const publishResponse = await fetch('/api/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					publishToken,
					artist,
					track,
					album,
					lyrics,
					duration
				})
			});

			if (!publishResponse.ok) {
				const errorData = await publishResponse.json();
				throw new Error(errorData.message || 'Publish failed');
			}

			const data = await publishResponse.json();
			success = true;
			progress = '';
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
			progress = '';
		} finally {
			loading = false;
			solvingChallenge = false;
		}
	}
</script>

<div class="base">
	<form onsubmit={postLyrics}>
		<div class="inputContainer">
			<div class="artistAlbumContainer">
				<div class="column">
					<label for="artist">Artist *</label>
					<input id="artist" required type="text" bind:value={artist} />
				</div>
				<div class="column">
					<label for="track">Track *</label>
					<input id="track" required type="text" bind:value={track} />
				</div>
			</div>
			<div class="trackDurationContainer">
				<div class="column">
					<label for="album">Album</label>
					<input id="album" type="text" bind:value={album} />
				</div>
				<div class="column">
					<label for="duration">Duration (s) *</label>
					<input
						id="duration"
						required
						type="text"
						inputmode="numeric"
						bind:value={duration}
						oninput={(e) => {
							const numbers = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 4);
							e.currentTarget.value = numbers;
							duration = Number(numbers) || 0;
						}}
						onpaste={(e) => {
							e.preventDefault();
							const paste = e.clipboardData?.getData('text') || '';
							const numbers = paste.replace(/[^0-9]/g, '').slice(0, 4);
							e.currentTarget.value = numbers;
							duration = Number(numbers) || 0;
						}}
					/>
				</div>
			</div>
		</div>
		<LyricBox bind:lyrics />

		{#if !wasmLoaded}
			<div class="info">Loading challenge solver...</div>
		{/if}

		{#if progress}
			<div class="info">
				{progress}
				{#if solvingChallenge}
					<div class="spinner"></div>
				{/if}
			</div>
		{/if}

		{#if error}
			<div class="error">{error}</div>
		{/if}

		{#if success}
			<div class="success">Published successfully!</div>
		{/if}

		<button type="submit" disabled={loading || !wasmLoaded}>
			{loading ? 'Publishing...' : 'Submit'}
		</button>
	</form>
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
	}
	.artistAlbumContainer,
	.trackDurationContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		max-width: 200px;
	}
	button {
		font-size: 1rem;
		padding: 0;
		margin: 0;
		background-color: var(--neutral-450);
		border: 2px solid var(--brand-500);
		color: var(--neutral-100);
		padding: 0.5rem 1rem;
		font-size: 1.25rem;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.error {
		color: var(--error);
		background-color: var(--error-bg);
		border: 1px solid var(--error);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.success {
		color: var(--success);
		background-color: var(--success-bg);
		border: 1px solid var(--success);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.info {
		color: var(--info);
		background-color: var(--info-bg);
		border: 1px solid var(--info);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid var(--info);
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	input {
		width: calc(100% - 1.5rem - 4px);
	}
	.inputContainer {
		display: flex;
		gap: 2rem;
		width: 100%;
		justify-content: center;
	}
	label {
		color: var(--neutral-100);
	}
	:global(.lyricEditor) {
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
		.inputContainer {
			gap: 1rem;
		}
		.base {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
