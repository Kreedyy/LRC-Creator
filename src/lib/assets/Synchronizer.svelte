<script lang="ts">
  import { getSharedLyrics } from "./SharedData.svelte";
  let lyrics = $derived(getSharedLyrics().split("\n"));
</script>
<div class="main-container">
  {#each lyrics as line, index}
    <div class="line-container {index}"><p>{line}</p></div>
  {/each}

  <div class="sync-container">
    <button class="sync-btn">Sync</button>
  </div>
</div>

<style>
 /*If index class is even, style it differently */


 .main-container{
  position: relative;
  height: 100%;
  width: 100%;
 }
 .sync-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  padding-bottom: 1rem;
 }
 .sync-btn{
  min-width: fit-content;
  width: calc(100% - 10rem);
  max-width: 400px;
 }
</style>