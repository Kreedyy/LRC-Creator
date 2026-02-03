<script lang="ts">
	let trackColor: string = '#ddd';
	let trackFillColor: string = '#00e0b1';
	let thumbColor: string = '#00e0b1';
	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(0),
		oninput,
		class: className = '' //Easier to style in separate file, see AudioPlayer.svelte
	} = $props<{
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		oninput?: (event: Event) => void;
		trackColor?: string;
		trackFillColor?: string;
		thumbColor?: string;
		class?: string;
	}>();

	let inputElement: HTMLInputElement;
	let containerElement: HTMLDivElement;
	let thumbPosition = $state(0);
	let fillWidth = $state(0);

	function updatePositions(): void {
		if (!containerElement || !inputElement) return;

		const percentage = max - min !== 0 ? (value - min) / (max - min) : 0;
		const containerWidth = containerElement.offsetWidth;
		const thumbWidth = 14;

		thumbPosition = percentage * (containerWidth - thumbWidth);
		fillWidth = percentage * containerWidth;
	}

	function handleInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		value = parseFloat(input.value);
		updatePositions();
		if (oninput) {
			oninput(event);
		}
	}

	$effect(() => {
		updatePositions();
	});
</script>

<div class="range-container {className}" bind:this={containerElement}>
	<div class="track" style="--track-color: {trackColor};">
		<div
			class="track-fill"
			style="--track-fill-color: {trackFillColor}; width: {fillWidth}px;"
		></div>
	</div>
	<div class="thumb" style="--thumb-color: {thumbColor}; left: {thumbPosition}px;"></div>
	<input bind:this={inputElement} type="range" {min} {max} {step} {value} oninput={handleInput} />
</div>

<style>
	.range-container {
		position: relative;
		height: 14px;
		display: flex;
		align-items: center;
	}

	.track {
		position: absolute;
		width: 100%;
		height: 4px;
		background: var(--track-color);
	}

	.track-fill {
		height: 100%;
		background: var(--track-fill-color);
		transition: left 0.05s ease-out;
	}
	.track,
	.track-fill {
		border-radius: 10px;
	}

	.thumb {
		position: absolute;
		width: 14px;
		height: 14px;
		background: var(--thumb-color);
		border-radius: 50%;
		transition: left 0.05s ease-out;
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		background: transparent;
		cursor: pointer;
		margin: 0;
		z-index: 1; /*Just so vanilla input doesnt prevent from interacting with custom made one*/
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 14px;
		height: 14px;
		background: transparent;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 14px;
		height: 14px;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	input[type='range']::-ms-thumb {
		width: 14px;
		height: 14px;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	input[type='range']::-moz-range-track {
		background: transparent;
		border: none;
	}

	input[type='range']::-ms-track {
		width: 100%;
		height: 4px;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	input[type='range']::-ms-fill-lower {
		background: transparent;
	}

	input[type='range']::-ms-fill-upper {
		background: transparent;
	}
</style>
