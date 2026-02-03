<script lang="ts">
	let {
		data = $bindable(),
		userPick = $bindable()
	}: {
		data: any;
		userPick: any;
	} = $props<{}>();

	// $effect(() => {
	// 	console.log(data);
	// });
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
.syncedLyrics
-->

<div class="container">
	{#each data as result}
		<button onclick={() => userPick = result}>
			<div class="result">
				<p>{result.trackName}</p>
				<p>{result.artistName}</p>
			</div>
		</button>

	{/each}
</div>

<style>
	.container{
		position: fixed;
		display: flex;
		flex-direction: column;
	}
	button{
		cursor: pointer;
		background: transparent;
		padding: 0;
		border: 0;
	}
</style>
