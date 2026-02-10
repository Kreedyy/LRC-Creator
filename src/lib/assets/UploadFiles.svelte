<script lang="ts">
	let { onfileselect, onclose }: { onfileselect: (file: File) => void; onclose: () => void } =
		$props();

	let fileInput: HTMLInputElement;
	let isDragging = $state<boolean>(false);

	function handleFileSelect(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			processFile(target.files[0]);
		}
	}

	function handleDrop(event: DragEvent): void {
		event.preventDefault();
		isDragging = false;

		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			processFile(event.dataTransfer.files[0]);
		}
	}

	function handleDragOver(event: DragEvent): void {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(): void {
		isDragging = false;
	}

	function processFile(file: File): void {
		if (file.type.startsWith('audio/')) {
			onfileselect(file);
			onclose();
		} else {
			alert('Please select an audio file');
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

<div
	class="dropzone"
	class:dragging={isDragging}
	ondrop={handleDrop}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	onclick={triggerFileInput}
	onkeydown={(e) => e.key === 'Enter' && triggerFileInput()}
	role="button"
	tabindex="0"
>
	<div class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"
			/>
		</svg>
	</div>
	<p class="title">Drop your audio file here</p>
	<p class="subtitle">or click to browse</p>
</div>

<style>
	.dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		height: 160px;
		background: var(--neutral-450);
		border: 2px dashed var(--neutral-400);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition);
	}

	.dropzone:hover,
	.dropzone.dragging {
		border-color: var(--brand-500);
		background: var(--neutral-400);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--brand-500);
		border-radius: 50%;
		margin-bottom: 0.25rem;
	}

	.icon svg {
		width: 24px;
		height: 24px;
		fill: var(--neutral-700);
	}

	.title {
		font-size: 0.9375rem;
		color: var(--neutral-100);
		margin: 0;
	}

	.subtitle {
		font-size: 0.8125rem;
		color: var(--neutral-200);
		margin: 0;
	}
</style>
