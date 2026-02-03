<!--
User can search and import lyrics from LRCLIB(?) GET /api/search @param `q`
Show results (GET) when user stops typing for 1s or make button to search for less calls

SCHEMA NOTES:

no synced lyrics -> return null
-->

<script lang="ts">
	import { onMount } from "svelte";

  function reformatInput (input:string){
    let formattedInput: string = input.replace(/ /g, '+');
    return formattedInput;
  }

  async function search(input: string) {
    const response = await fetch(`/api/lyrics?q=${reformatInput(input)}`);
    const data = await response.json();
    console.log(data);
  }
  
  onMount(() => {
    search('rick owens freestyle')
  });

</script>