<script lang="ts">
	import UploadFiles from './UploadFiles.svelte';
	import UploadLinks from './UploadLinks.svelte';

	let {
		onclose,
		onfileselect,
		onlinksubmit
	}: {
		onclose: () => void;
		onfileselect: (file: File) => void;
		onlinksubmit: (url: string) => void;
	} = $props();

	let activeTab = $state<'files' | 'links'>('files');
</script>

<div
	class="overlay"
	onclick={onclose}
	onkeydown={(e) => e.key === 'Escape' && onclose()}
	role="button"
	tabindex="0"
></div>
<div class="modal">
	<div class="header">
		<h3>Upload Audio</h3>
		<button class="close-btn" title="Close" onclick={onclose}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
				<path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/>
			</svg>
		</button>
	</div>

	<div class="tabs">
		<button class="tab" class:active={activeTab === 'files'} onclick={() => (activeTab = 'files')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
					d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"
				/></svg
			>
			File
		</button>
		<button class="tab" class:active={activeTab === 'links'} onclick={() => (activeTab = 'links')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
					d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z"
				/></svg
			>
			Link
		</button>
	</div>

	<div class="content">
		{#if activeTab === 'files'}
			<UploadFiles {onfileselect} {onclose} />
		{:else}
			<UploadLinks {onlinksubmit} {onclose} />
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--overlay);
		z-index: 99;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--neutral-500);
		border-radius: var(--radius-lg);
		width: 380px;
		max-width: 90vw;
		max-height: 80vh;
		z-index: 100;
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-md);
		overflow: hidden;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--neutral-450);
	}

	.header h3 {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--neutral-100);
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition);
	}

	.close-btn svg {
		width: 14px;
		height: 14px;
		fill: var(--neutral-200);
	}

	.close-btn:hover {
		background: var(--neutral-450);
	}

	.close-btn:hover svg {
		fill: var(--neutral-100);
	}

	.tabs {
		display: flex;
		padding: 0.75rem 1.25rem;
		gap: 0.5rem;
	}

	.tab {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: var(--neutral-450);
		border: 2px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--neutral-200);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all var(--transition);
	}

	.tab svg {
		width: 22px;
		height: 22px;
		fill: var(--neutral-200);
		transition: fill var(--transition);
	}

	.tab:hover {
		background: var(--neutral-400);
		color: var(--neutral-100);
	}

	.tab:hover svg {
		fill: var(--neutral-100);
	}

	.tab.active {
		background: var(--brand-500);
		color: var(--neutral-700);
		border-color: var(--brand-500);
	}

	.tab.active svg {
		fill: var(--neutral-700);
	}

	.content {
		padding: 0 1.25rem 1.25rem;
	}
</style>
