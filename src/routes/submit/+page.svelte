<script lang="ts">
	import { shared } from '$lib/assets/SharedData.svelte';
	import LyricBox from '$lib/assets/LyricBox.svelte';

	let lyrics = $state<string>();
	lyrics = shared.lyrics;

	$effect(() => {
		shared.lyrics = lyrics;
	});
</script>

<div>
	<form>
		<LyricBox {lyrics} />
	</form>
</div>

<style>
	form{
		height: 100%;
	}
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
		position: relative;
	}
</style>
