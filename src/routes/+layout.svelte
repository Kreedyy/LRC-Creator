<script lang="ts">
	import AudioPlayerBar from '$lib/assets/AudioPlayerBar.svelte';
	import favicon from '$lib/assets/favicon.png';
	import KreedyDev from '$lib/assets/KreedyDev.svelte';
	import Nav from '$lib/assets/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>LRC Creator</title>
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
		--neutral-550: oklch(0.25 0.0287 289.62);
		--neutral-500: oklch(0.174 0.0287 289.62);
		--neutral-700: oklch(0.12 0.02 289.62);
		--neutral-900: oklch(0.08 0.015 289.62);
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
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
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

	/*
	:global(button) {
		height: 40px;
		width: 100px;
		background-color: var(--neutral-550);
		border: 2px solid var(--neutral-200);
		border-radius: 6px; NOTE: 2px less than .buttonContainer
	}
	:global(button),*/

	/*:global(button:focus),
	:global(button:hover),
	:global(button:active) {
		background-color: var(--brand-500);
		color: var(--neutral-500);
		fill: var(--neutral-550);
	}*/
</style>
