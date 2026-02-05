<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let activeIcon: string | null = null;

	function setActive(icon: string) {
		activeIcon = icon;
	}

	function checkActive(pagePath: string | null) {
		switch (pagePath) {
			case '/lyrics':
				return 'lyrics';
			case '/settings':
				return 'settings';
			case '/sync':
				return 'sync';
			default:
				return '';
		}
	}

	onMount(() => {
		setActive(checkActive(page.route.id));
	});
</script>

<nav>
	<a
		href="/lyrics"
		title="Lyric Editor"
		onclick={() => setActive('lyrics')}
		class:selected={activeIcon == 'lyrics'}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"
			/>
		</svg>
	</a>
	<a
		href="/sync"
		title="Sync Lyrics"
		onclick={() => setActive('sync')}
		class:selected={activeIcon == 'sync'}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M384 128C384 145.7 369.7 160 352 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L352 96C369.7 96 384 110.3 384 128zM384 384C384 401.7 369.7 416 352 416L128 416C110.3 416 96 401.7 96 384C96 366.3 110.3 352 128 352L352 352C369.7 352 384 366.3 384 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z"
			/>
		</svg>
	</a>
	<a
		href="https://github.com/Kreedyy/LRC-Multitool"
		title="Repo"
		onclick={() => setActive('github')}
		class:selected={activeIcon == 'github'}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
			/>
		</svg>
	</a>
</nav>

<style>
	nav {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
		padding: 0.25rem;
	}
	a {
		fill: var(--neutral-200);
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 42px;
		width: 42px;
		text-decoration: none;
		border-radius: var(--radius-md);
		background: transparent;
		transition: all var(--transition);
	}
	svg {
		width: 24px;
		height: 24px;
	}
	a:hover {
		background: var(--neutral-500);
		fill: var(--neutral-100);
	}
	a.selected {
		background: var(--brand-500);
		fill: var(--neutral-700);
	}
	@media only screen and (max-width: 500px) {
		a {
			height: 38px;
			width: 38px;
		}
		svg {
			width: 20px;
			height: 20px;
		}
	}
	@media only screen and (max-width: 400px) {
		a {
			height: 34px;
			width: 34px;
		}
		svg {
			width: 18px;
			height: 18px;
		}
	}
</style>
