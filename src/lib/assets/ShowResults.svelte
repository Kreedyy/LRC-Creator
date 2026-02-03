<script lang="ts">
	let {
		data = $bindable(),
		userPick = $bindable()
	}: {
		data: any;
		userPick: any;
	} = $props<{}>();

	//$effect(() => {
	//	console.log(data);
	//});
</script>
