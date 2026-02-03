<script lang="ts">
	let {
		data = $bindable(),
		userPick = $bindable()
	}: {
		data: any;
		userPick: any;
	} = $props<{}>();

	$effect(() => {
		console.log(data);
	});
</script>

<!--
.trackName string
.name string //Same as .trackName?
.albumName string
.artistName string
.duration number
.id number
.instrumental bool
.plainLyrics string
-->

<div class="container">
	{#each data as result}
		<div class="result">
			<p>{result.trackName}</p>
		</div>
	{/each}
</div>

<style>
	.container{
		display: flex;
		flex-direction: column;
	}
</style>
