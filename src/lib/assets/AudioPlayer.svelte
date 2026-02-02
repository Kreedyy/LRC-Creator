<script lang="ts">
	let { audioUrl } = $props<{
		audioUrl?: string | null;
	}>();
</script>

<div class="player">
	<audio controls src={audioUrl}> </audio>
</div>

<style>
	.player {
		display: flex;
	}
</style>
