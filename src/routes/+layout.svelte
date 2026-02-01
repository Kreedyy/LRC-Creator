<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	@font-face {
		font-family: 'JetBrainsMono-Regular';
		src: url('/fonts/JetBrainsMono-Regular.woff2') format(woff2);
		font-display: swap;
	}
	:global(body) {
		font-family: 'JetBrainsMono-Regular';
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

		background-color: var(--neutral-700);
	}
	:global(p),
	:global(h2) {
		color: var(--neutral-100);
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
</style>
