<script lang="ts">
	import { formatLyrics, formatSharedData } from '$lib/assets/FormatLyrics';
	import { setSharedTrackData } from '$lib/assets/SharedData.svelte';

	type Props = {
		userPick?: any;
		getSyncedLyrics?: boolean;
		lyrics: string;
	};
	let {
		userPick = $bindable<any>(),
		getSyncedLyrics = $bindable<boolean>(true),
		lyrics = $bindable<string>()
	}: Props = $props();

	function setPlainOrSyncedLyrics(syncedLyrics: boolean) {
		if (userPick.syncedLyrics) {
			lyrics = syncedLyrics ? userPick.syncedLyrics : userPick.plainLyrics;
		} else {
			lyrics = userPick.plainLyrics;
		}
	}

	function format() {
		formatSharedData();
		if (lyrics) {
			lyrics = formatLyrics(lyrics);
		}
	}

	$effect(() => {
		if (userPick) {
			setPlainOrSyncedLyrics(getSyncedLyrics);
		}
	});
	$effect(() => {
		setSharedTrackData({ lyrics: lyrics });
		const timer = setTimeout(format, 3000);
		return () => clearTimeout(timer);
	});
</script>

<div class="lyric-editor">
	<textarea bind:value={lyrics} placeholder="Paste or type your lyrics here..."></textarea>
</div>

<style>
	.lyric-editor {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
	}

	textarea {
		resize: none;
		overflow-y: auto;
		background: var(--neutral-500);
		border: 2px solid var(--neutral-400);
		border-radius: var(--radius-md);
		width: 750px;
		height: calc(100% - 2rem - 4px);
		color: var(--neutral-100);
		padding: 1rem;
		margin: 0;
		outline: none;
		font-size: 0.9375rem;
		line-height: 1.6;
		transition: all var(--transition);
	}

	textarea:focus {
		border-color: var(--brand-500);
		background: var(--neutral-450);
	}

	textarea::placeholder {
		color: var(--neutral-200);
		opacity: 0.6;
	}
	@media only screen and (max-width: 500px) {
		textarea {
			font-size: 0.75rem;
		}
	}
</style>
