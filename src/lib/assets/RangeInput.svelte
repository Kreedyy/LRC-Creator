<script lang="ts">
	type Props = {
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		oninput?: (event: Event) => void;
		class?: string;
		ariaLabel?: string;
	};
	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(0),
		oninput,
		class: className = '',
		ariaLabel = 'Slider'
	}: Props = $props();

	let inputElement: HTMLInputElement;
	let containerElement: HTMLDivElement;
	let thumbPosition = $state<number>(0);
	let fillWidth = $state<number>(0);

	function updatePositions(): void {
		if (!containerElement || !inputElement) return;

		const percentage = max - min !== 0 ? (value - min) / (max - min) : 0;
		const containerWidth = containerElement.offsetWidth;
		const thumbWidth = 12;

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
	<div class="track">
		<div class="track-fill" style="width: {fillWidth}px;"></div>
	</div>
	<div class="thumb" style="left: {thumbPosition}px;"></div>
	<input
		bind:this={inputElement}
		type="range"
		{min}
		{max}
		{step}
		{value}
		oninput={handleInput}
		aria-label={ariaLabel}
	/>
</div>

<style>
	.range-container {
		position: relative;
		height: 12px;
		display: flex;
		align-items: center;
	}

	.track {
		position: absolute;
		width: 100%;
		height: 4px;
		background: var(--neutral-400);
		border-radius: 4px;
	}

	.track-fill {
		height: 100%;
		background: var(--brand-500);
		border-radius: 4px;
		transition: width 0.05s ease-out;
	}

	.thumb {
		position: absolute;
		width: 12px;
		height: 12px;
		background: var(--brand-500);
		border-radius: 50%;
		transition: left 0.05s ease-out;
		box-shadow: var(--shadow-thumb);
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		background: transparent;
		cursor: pointer;
		margin: 0;
		z-index: 1;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: transparent;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 12px;
		height: 12px;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	input[type='range']::-ms-thumb {
		width: 12px;
		height: 12px;
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
