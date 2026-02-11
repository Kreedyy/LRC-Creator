<script lang="ts">
	import AudioPlayerBar from '$lib/assets/AudioPlayerBar.svelte';
	import favicon from '$lib/assets/favicon.png';
	import KreedyDev from '$lib/assets/KreedyDev.svelte';
	import Nav from '$lib/assets/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>LRC Multitool</title>
	<meta
		name="description"
		content="An easy to use web-based tool for managing, editing and sharing LRC files, with integrated audio playback and synchronization features."
	/>
</svelte:head>

<div>
	<header>
		<KreedyDev />
		<Nav />
	</header>
	<main>
		{@render children()}
	</main>
	<AudioPlayerBar />
</div>

<style>
	@font-face {
		font-family: 'JetBrainsMono-Regular';
		src: url('/fonts/JetBrainsMono-Regular.woff2') format(woff2);
		font-display: swap;
	}
	:root {
		scrollbar-width: none;

		--brand-100: oklch(95% 0.08 170.8);
		--brand-200: oklch(90% 0.11 170.8);
		--brand-300: oklch(85% 0.135 170.8);
		--brand-400: oklch(82% 0.15 170.8);
		--brand-500: oklch(80.5% 0.163 170.8);
		--brand-600: oklch(70% 0.17 170.8);
		--brand-700: oklch(55% 0.16 170.8);
		--brand-800: oklch(40% 0.14 170.8);
		--brand-900: oklch(25% 0.12 170.8);

		--neutral-100: oklch(0.95 0.005 289.62);
		--neutral-200: oklch(0.85 0.01 289.62);
		--neutral-450: oklch(0.25 0.0287 289.62);
		--neutral-400: oklch(33.301% 0.05415 290.54);
		--neutral-500: oklch(0.174 0.0287 289.62);
		--neutral-700: oklch(0.12 0.02 289.62);
		--neutral-900: oklch(0.08 0.015 289.62);

		--error: #ff4444;
		--error-bg: rgba(255, 68, 68, 0.1);
		--success: #44ff44;
		--success-bg: rgba(68, 255, 68, 0.1);
		--info: #4444ff;
		--info-bg: rgba(68, 68, 255, 0.1);

		--overlay: rgba(0, 0, 0, 0.6);

		--radius-sm: 6px;
		--radius-md: 10px;
		--radius-lg: 14px;
		--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
		--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
		--shadow-thumb: 0 1px 4px rgba(0, 0, 0, 0.3);
		--transition: 0.15s ease;
	}
	:global(body) {
		margin: 0;
		background-color: var(--neutral-700);
	}
	:global(body),
	:global(button),
	:global(input),
	:global(textarea) {
		font-family: 'JetBrainsMono-Regular';
	}
	div {
		display: flex;
		flex-direction: column;
		height: 100svh;
	}
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		min-height: 0;
	}
	:global(p),
	:global(h2),
	:global(li) {
		color: var(--neutral-100);
		margin: 0;
	}
	:global(h1) {
		margin: 0;
	}
	:global(h1),
	:global(a),
	:global(a:link),
	:global(a:visited),
	:global(a:focus),
	:global(a:hover),
	:global(a:active) {
		color: var(--brand-500);
	}

	/* ===== GLOBAL BUTTON STYLES ===== */
	:global(button) {
		font-size: 1rem;
		padding: 0.5rem 1rem;
		margin: 0;
		background-color: var(--neutral-450);
		border: 2px solid var(--brand-500);
		border-radius: var(--radius-sm);
		color: var(--neutral-100);
		cursor: pointer;
		transition: all var(--transition);
	}

	:global(button:hover:not(:disabled)) {
		background-color: var(--brand-500);
		color: var(--neutral-700);
	}

	:global(button:disabled) {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* ===== GLOBAL INPUT STYLES ===== */
	:global(input[type='text']),
	:global(input[type='number']),
	:global(textarea) {
		padding: 0.5rem 0.75rem;
		background: var(--neutral-500);
		border: 2px solid var(--neutral-400);
		border-radius: var(--radius-sm);
		color: var(--neutral-100);
		font-size: 1rem;
		outline: none;
		transition: all var(--transition);
	}

	:global(input[type='text']:focus),
	:global(input[type='number']:focus),
	:global(textarea:focus) {
		border-color: var(--brand-500);
		background: var(--neutral-450);
	}

	:global(input::placeholder),
	:global(textarea::placeholder) {
		color: var(--neutral-200);
		opacity: 0.5;
	}

	/* ===== GLOBAL LABEL STYLES ===== */
	:global(label) {
		color: var(--neutral-200);
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}
</style>
