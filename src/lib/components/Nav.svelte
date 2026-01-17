<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const navItems = [
		{ label: 'Services', href: `${base}/services` },
		{ label: 'Work', href: `${base}/work` },
		{ label: 'About', href: `${base}/about` },
		{ label: 'Contact', href: `${base}/contact` }
	];

	// Check if we're on homepage
	let isHomepage = $derived($page.url.pathname === base + '/' || $page.url.pathname === base);
	let currentPath = $derived($page.url.pathname);

	// Track scroll for homepage icon reveal and fold effect
	let scrollY = $state(0);
	let scrollThreshold = 400;
	let iconVisible = $derived(!isHomepage || scrollY > scrollThreshold);
	let wasVisible = $state(false);
	let isExiting = $state(false);
	let hasScrolled = $derived(scrollY > 10);

	// Mobile menu state
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	// Dark mode
	let isDarkMode = $state(false);

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', isDarkMode);
		}
	}

	if (typeof window !== 'undefined') {
		$effect(() => {
			const handleScroll = () => {
				const prevScrollY = scrollY;
				scrollY = window.scrollY;

				// Detect when icon should exit (scrolling back up past threshold)
				if (wasVisible && scrollY <= scrollThreshold && prevScrollY > scrollThreshold) {
					isExiting = true;
					setTimeout(() => {
						isExiting = false;
					}, 400);
				}
				wasVisible = scrollY > scrollThreshold;
			};
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		});

		// Check for system dark mode preference
		$effect(() => {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			isDarkMode = prefersDark;
			document.documentElement.classList.toggle('dark', prefersDark);
		});
	}
</script>

<nav class:scrolled={hasScrolled}>
	<div class="nav-container">
		<a href="{base}/" class="logo" class:clicked={iconVisible} onclick={closeMobileMenu}>
			<span
				class="logo-icon"
				class:visible={iconVisible && !isExiting}
				class:hidden={!iconVisible && isHomepage && !isExiting}
				class:exiting={isExiting}
			>
				<svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="1" y="1" width="30" height="22" stroke="currentColor" stroke-width="1.5" fill="none"/>
					<text x="5" y="17" font-size="12" font-weight="700" fill="currentColor">B</text>
					<line x1="16" y1="5" x2="16" y2="19" stroke="currentColor" stroke-width="1.5"/>
					<text x="18" y="17" font-size="12" font-weight="700" fill="currentColor">V</text>
				</svg>
			</span>
			<span class="logo-text">Barvere</span>
		</a>

		<ul class="nav-links">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class:active={currentPath === item.href || currentPath.startsWith(item.href + '/')}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="nav-actions">
			<button class="dark-mode-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
				{#if isDarkMode}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="5"/>
						<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
					</svg>
				{/if}
			</button>

			<button
				class="mobile-menu-toggle"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
			>
				<span class="hamburger" class:open={mobileMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
				</span>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	<div class="mobile-menu" class:open={mobileMenuOpen}>
		<ul class="mobile-nav-links">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class:active={currentPath === item.href}
						onclick={closeMobileMenu}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--nav-height);
		background-color: var(--color-bg);
		z-index: 100;
		transition: box-shadow 0.3s ease-out;
	}

	nav.scrolled {
		box-shadow: 0 1px 0 var(--color-border), 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	:global(.dark) nav.scrolled {
		box-shadow: 0 1px 0 var(--color-border), 0 4px 20px rgba(255, 255, 255, 0.05);
	}

	nav.scrolled::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		right: 0;
		height: 8px;
		background: linear-gradient(to bottom, rgba(0,0,0,0.05), transparent);
		pointer-events: none;
	}

	:global(.dark) nav.scrolled::after {
		background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: var(--max-width);
		height: 100%;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-text);
		transition: color var(--transition-fast);
	}

	.logo-icon {
		width: 32px;
		height: 24px;
		color: var(--color-accent);
		opacity: 0;
		transform: scale(0.5);
		transition: opacity 0.4s ease-out, transform 0.4s ease-out;
	}

	.logo-icon.hidden {
		opacity: 0;
		transform: scale(0.5);
	}

	.logo-icon.visible {
		opacity: 1;
		transform: scale(1);
		animation: clickIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.logo-icon.exiting {
		animation: exitToText 0.4s ease-in forwards;
	}

	@keyframes clickIn {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1.15);
		}
		70% {
			transform: scale(0.95);
		}
		85% {
			transform: scale(1.02);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes exitToText {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
		}
	}

	.logo-icon svg {
		width: 100%;
		height: 100%;
	}

	.logo-text {
		transition: transform var(--transition-base);
		position: relative;
		overflow: hidden;
	}

	.logo.clicked .logo-text {
		animation: textClickIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.logo.clicked .logo-text::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
		animation: shine 0.6s 0.5s ease-out forwards;
	}

	:global(.dark) .logo.clicked .logo-text::after {
		background: linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent);
	}

	@keyframes textClickIn {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes shine {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.logo:hover {
		color: var(--color-accent);
	}

	.logo:hover .logo-text {
		transform: translateX(2px);
	}

	.nav-links {
		display: flex;
		gap: var(--space-10);
		list-style: none;
	}

	.nav-links a {
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--color-text);
		transition: color var(--transition-fast);
		position: relative;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--color-accent);
		transition: width var(--transition-base);
	}

	.nav-links a:hover {
		color: var(--color-accent);
	}

	.nav-links a:hover::after {
		width: 100%;
	}

	.nav-links a.active {
		color: var(--color-accent);
	}

	.nav-links a.active::after {
		width: 100%;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.dark-mode-toggle {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-text);
		transition: all var(--transition-fast);
	}

	.dark-mode-toggle:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.dark-mode-toggle svg {
		width: 20px;
		height: 20px;
	}

	.mobile-menu-toggle {
		display: none;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 24px;
	}

	.hamburger span {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--color-text);
		transition: all 0.3s ease;
	}

	.hamburger.open span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	.mobile-menu {
		display: none;
		position: fixed;
		top: var(--nav-height);
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-bg);
		padding: var(--space-8) var(--space-6);
		transform: translateX(100%);
		transition: transform 0.3s ease;
	}

	.mobile-menu.open {
		transform: translateX(0);
	}

	.mobile-nav-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.mobile-nav-links a {
		display: block;
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--color-text);
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--color-border);
		transition: color var(--transition-fast);
	}

	.mobile-nav-links a:hover,
	.mobile-nav-links a.active {
		color: var(--color-accent);
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.mobile-menu-toggle {
			display: flex;
		}

		.mobile-menu {
			display: block;
		}
	}
</style>
