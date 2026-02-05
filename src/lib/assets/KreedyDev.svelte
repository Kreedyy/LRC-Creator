<a href="https://kreedy.dev" class="logo">
	<span class="brand">Kreedy</span><span class="dev">.dev</span>
</a>

<style>
	.logo {
		font-size: 1.75rem;
		font-weight: 700;
		text-decoration: none;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		transition: all var(--transition);
		display: flex;
		align-items: center;
	}
	.logo:hover {
		background: var(--neutral-500);
	}
	.brand {
		color: var(--brand-500);
	}
	.dev {
		color: var(--neutral-100);
	}
	@media only screen and (max-width: 500px) {
		.logo {
			font-size: 1.5rem;
			padding: 0.25rem 0.5rem;
		}
	}
	@media only screen and (max-width: 400px) {
		.logo {
			font-size: 1.25rem;
		}
	}
</style>
