<script lang="ts">
	import AudioPlayer from './AudioPlayer.svelte';

	let fileInput: HTMLInputElement;
	let selectedFile: File | null = null;
	let audioUrl: string | null = null;

	function handleFileSelect(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			if (file.type.startsWith('audio/')) {
				selectedFile = file;
				if (audioUrl) {
					URL.revokeObjectURL(audioUrl);
				}
				audioUrl = URL.createObjectURL(file);
			}
		}
	}

	function triggerFileInput(): void {
		fileInput.click();
	}
</script>

<input
	type="file"
	bind:this={fileInput}
	onchange={handleFileSelect}
	style="display: none;"
	accept="audio/*"
/>

<div class="bar">
	<button title="Upload Audio" onclick={triggerFileInput}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"
			/></svg
		>
	</button>
	<AudioPlayer {audioUrl} />
</div>

<style>
	.bar {
		display: flex;
		align-items: end;
	}
	button {
		background: none;
		padding: 0;
		display: flex;
		border: 0;
		cursor: pointer;
	}
	svg {
		width: 35px;
		height: 35px;
		fill: var(--brand-500);
	}
</style>
