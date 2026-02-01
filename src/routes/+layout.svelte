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
	:global(body){
		font-family: 'JetBrainsMono-Regular';
	}
</style>