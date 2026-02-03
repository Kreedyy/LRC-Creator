<script lang="ts">
	import LyricBox from "$lib/assets/LyricBox.svelte";
	import LyricSearch from "$lib/assets/LyricSearch.svelte";
</script>

<div>
  <LyricSearch />
  <LyricBox />
</div>

<style>
  div{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
</style>