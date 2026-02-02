<script lang="ts">
  let { audioUrl } = $props<{
    audioUrl?: string | null;
  }>();
  let audioElement: HTMLAudioElement;
  let isPlaying: boolean = $state(false);
  let currentTime: number = $state(0);
  let duration: number = $state(0);
  let speed: number = $state(1);
  let volume: number = $state(0.5);
  let previousVolume: number = $state(0.5);
  let isMuted: boolean = $state(false)
  let animationFrameId: number;

  function toggleMute(toggle: boolean): void{
    if (toggle)
    {
      previousVolume = volume;
      volume = 0;
      isMuted = true;
    }
    else{
      volume = previousVolume;
      isMuted = false;
    }
    audioElement.volume = volume;
  }

  function togglePlay(): void {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    isPlaying = !isPlaying;
  }

  function updateTime(): void {
    if (audioElement && !audioElement.paused) {
      currentTime = audioElement.currentTime;
      animationFrameId = requestAnimationFrame(updateTime);
    }
  }

  function checkIfPlaying(): void {
    if (isPlaying) {
      updateTime();
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      currentTime = audioElement.currentTime;
    }
  }

  function loadDuration(): void {
    duration = audioElement.duration;
  }

  function handleSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    audioElement.currentTime = parseFloat(input.value);
    currentTime = audioElement.currentTime;
  }

  function changeSpeed(event: Event): void {
    const input = event.target as HTMLInputElement;
    speed = parseFloat(input.value);
    audioElement.playbackRate = speed;
  }

  function changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    volume = parseFloat(input.value);
    audioElement.volume = volume;
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(3, '0')}`;
  }

  $effect(() => {
    checkIfPlaying();
  });
</script>

<div class="player">
  <audio
    bind:this={audioElement}
    src={audioUrl}
    onloadedmetadata={loadDuration}
    onended={() => (isPlaying = false)}
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
  ></audio>
  <button onclick={togglePlay}>Play</button>
  <!--Just for testing-->
  <div class="inputs">
    <p>{formatTime(currentTime)}</p>
    <input class="seek" type="range" min="0" max={duration || 0} value={currentTime} oninput={handleSeek} />
    <p>{speed.toFixed(2)}x</p>
    <input class="speed" type="range" min="0.25" max="2" step="0.05" value={speed} oninput={changeSpeed} />
  </div>
</div>
<div class="volumeContainer">
  <input class="volume" type="range" min="0" max="1" step="0.01" value={volume} oninput={changeVolume} />
  <button class="mute" onclick={() => toggleMute(!isMuted)}>
    {#if Math.round(volume * 100) <= 0}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z"/></svg>
    {:else if Math.round(volume * 100) <= 75}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M144 416L192 416L326.1 535.2C332.5 540.9 340.7 544 349.2 544C368.4 544 384 528.4 384 509.2L384 130.8C384 111.6 368.4 96 349.2 96C340.7 96 332.5 99.1 326.1 104.8L192 224L144 224C117.5 224 96 245.5 96 272L96 368C96 394.5 117.5 416 144 416zM476.6 245.5C466.3 237.1 451.2 238.7 442.8 249C434.4 259.3 436 274.4 446.3 282.8C457.1 291.6 464 305 464 320C464 335 457.1 348.4 446.3 357.3C436 365.7 434.5 380.8 442.8 391.1C451.1 401.4 466.3 402.9 476.6 394.6C498.1 376.9 512 350.1 512 320C512 289.9 498.1 263.1 476.5 245.5z"/></svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M533.6 96.5C523.3 88.1 508.2 89.7 499.8 100C491.4 110.3 493 125.4 503.3 133.8C557.5 177.8 592 244.8 592 320C592 395.2 557.5 462.2 503.3 506.3C493 514.7 491.5 529.8 499.8 540.1C508.1 550.4 523.3 551.9 533.6 543.6C598.5 490.7 640 410.2 640 320C640 229.8 598.5 149.2 533.6 96.5zM473.1 171C462.8 162.6 447.7 164.2 439.3 174.5C430.9 184.8 432.5 199.9 442.8 208.3C475.3 234.7 496 274.9 496 320C496 365.1 475.3 405.3 442.8 431.8C432.5 440.2 431 455.3 439.3 465.6C447.6 475.9 462.8 477.4 473.1 469.1C516.3 433.9 544 380.2 544 320.1C544 260 516.3 206.3 473.1 171.1zM412.6 245.5C402.3 237.1 387.2 238.7 378.8 249C370.4 259.3 372 274.4 382.3 282.8C393.1 291.6 400 305 400 320C400 335 393.1 348.4 382.3 357.3C372 365.7 370.5 380.8 378.8 391.1C387.1 401.4 402.3 402.9 412.6 394.6C434.1 376.9 448 350.1 448 320C448 289.9 434.1 263.1 412.6 245.5zM80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416z"/></svg>
    {/if}
  </button>
</div>

<style>
  .mute{
    padding: 0;
    height: 35px;
    border: 0;
    cursor: pointer;
    background: none;
  }
  .seek{
    width: 100%;
  }
  .speed{
    width: 75px;
  }
  .volumeContainer{
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between;
    height: 100px;
    width: 35px;
    right: 10px;
    bottom: 5px;
  }
  .volumeContainer svg{
    fill: var(--brand-500);
    width: 35px;
  }
  .volume{
    padding-top: 45px;
    width: 60px;
    rotate: -90deg;
  }
  .inputs{
    display: flex;
    flex: 1;
    padding-right: 60px;
  }
  .inputs p{
    margin-left: 1.5rem;
    margin-right: 0.5rem;
  }
  .player {
    display: flex;
    flex: 1;
  }
  input {
    margin: 0;
  }
</style>