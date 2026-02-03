<div class="col">
	<p class="started">Getting started</p>
	<div>
		<p>1.</p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"
			/></svg
		>
		<p>Upload file or paste Youtube/Soundcloud link</p>
	</div>
	<div>
		<p>2.</p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"
			/></svg
		>
		<p>
			Paste in lyrics from <a href="https://lrclib.net/">LRCLIB</a> or
			<a href="https://genius.com/">Genius</a>
		</p>
	</div>
	<div>
		<p>3.</p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M384 128C384 145.7 369.7 160 352 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L352 96C369.7 96 384 110.3 384 128zM384 384C384 401.7 369.7 416 352 416L128 416C110.3 416 96 401.7 96 384C96 366.3 110.3 352 128 352L352 352C369.7 352 384 366.3 384 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z"
			/></svg
		>
		<p>Start syncing lyrics</p>
	</div>
	<a href="/"
		><!--Link to example video placed in static/assets-->
		<p class="tip">
			TIP: Sync lines preemptively, sync close to end<br /> of last word being sung BEFORE next line starts
		</p>
	</a>
</div>

<style>
	.col {
		flex-direction: column;
		font-size: 1.25rem;
		width: fit-content;
	}
	.col div {
		display: flex;
		align-items: center;
	}
	.started {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	.tip {
		text-align: center;
		color: var(--brand-500);
		margin-top: 1rem;
	}
	svg {
		height: 25px;
		width: 25px;
		min-height: 25px;
		min-width: 25px;
		fill: var(--brand-500);
		margin-left: 0.5rem;
		margin-right: 0.25rem;
	}

	@media only screen and (max-width: 625px) {
		.col{
			font-size: 1rem;
		}
		.started{
			font-size: 1.5rem;
		}
	}
</style>
