<script lang="ts">
	const currentYear = new Date().getFullYear();

	const links = [
		{ label: 'Services', href: '/services' },
		{ label: 'Work', href: '/work' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<footer>
	<div class="footer-container">
		<div class="footer-main">
			<a href="/" class="footer-logo">
				<span class="footer-icon">
					<svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="1" y="1" width="30" height="22" stroke="currentColor" stroke-width="1.5" fill="none"/>
						<text x="5" y="17" font-size="12" font-weight="700" fill="currentColor">B</text>
						<line x1="16" y1="5" x2="16" y2="19" stroke="currentColor" stroke-width="1.5"/>
						<text x="18" y="17" font-size="12" font-weight="700" fill="currentColor">V</text>
					</svg>
				</span>
				Barvere
			</a>
			<p class="footer-tagline">Making bespoke software solutions accessible to any business.</p>
		</div>

		<nav class="footer-nav">
			{#each links as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<div class="footer-bottom">
			<p class="copyright">&copy; {currentYear} Barvere. All rights reserved.</p>
			<p class="location">Johannesburg, South Africa</p>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--color-border);
		padding: var(--space-16) 0;
		margin-top: var(--space-16);
	}

	.footer-container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: var(--space-12);
		align-items: start;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-text);
		transition: color var(--transition-fast);
	}

	.footer-logo:hover {
		color: var(--color-accent);
	}

	.footer-icon {
		width: 32px;
		height: 24px;
		color: var(--color-accent);
	}

	.footer-icon svg {
		width: 100%;
		height: 100%;
	}

	.footer-tagline {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin-top: var(--space-2);
	}

	.footer-nav {
		display: flex;
		gap: var(--space-8);
	}

	.footer-nav a {
		font-size: var(--text-sm);
		color: var(--color-text);
		transition: color var(--transition-fast);
	}

	.footer-nav a:hover {
		color: var(--color-accent);
	}

	.footer-bottom {
		text-align: right;
	}

	.copyright {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.location {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-top: var(--space-1);
	}

	@media (max-width: 768px) {
		.footer-container {
			grid-template-columns: 1fr;
			gap: var(--space-8);
			text-align: center;
		}

		.footer-nav {
			justify-content: center;
			flex-wrap: wrap;
			gap: var(--space-6);
		}

		.footer-bottom {
			text-align: center;
		}
	}
</style>
