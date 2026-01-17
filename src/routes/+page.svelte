<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import BVMark from '$lib/components/BVMark.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	let scrollY = $state(0);
	let markElement: HTMLElement;
	let isMobile = $state(false);

	onMount(() => {
		// Check if mobile
		const checkMobile = () => {
			isMobile = window.innerWidth <= 768;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);

		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', checkMobile);
		};
	});

	// Progress through hero section (0 to 1)
	// Mobile needs longer threshold for slower animation
	let scrollThreshold = $derived(isMobile ? 600 : 400);

	// Use eased progress for smoother animation
	let rawProgress = $derived(Math.min(scrollY / scrollThreshold, 1));
	// Ease-out curve makes animation start fast then slow down
	let scrollProgress = $derived(1 - Math.pow(1 - rawProgress, 2));

	// Mark pours to top-left corner (where nav logo will appear)
	let markStartX = $derived(markElement?.getBoundingClientRect().left ?? 600);
	let markStartY = $derived(markElement?.getBoundingClientRect().top ?? 300);
	let markTranslateX = $derived(rawProgress * -(markStartX - 24));
	let markTranslateY = $derived(rawProgress * -(markStartY - 28 + scrollY));
	let markScale = $derived(1 - rawProgress * 0.91);
	let markOpacity = $derived(1 - rawProgress * 1.5);

	// Hero content fades with scroll (use raw progress for content fade)
	let heroContentOpacity = $derived(1 - rawProgress * 1.5);

	// Hero height shrinks as you scroll - minimum 10vh on mobile to prevent jarring collapse
	let minHeight = $derived(isMobile ? 10 : 0);
	let heroHeight = $derived(Math.max(minHeight, 100 - scrollProgress * 100));

	// Clients/logos that worked with
	const clients = ['Absa', 'Sanlam', 'APA Insurance', 'Standard Bank'];

	// Testimonials
	const testimonials = [
		{
			quote: "Barvere transformed our digital banking platform in half the time we expected. Their understanding of African financial services is unmatched.",
			author: "Chief Digital Officer",
			company: "Major SA Bank"
		},
		{
			quote: "Finally, consultants who ship code, not just slide decks. They integrated seamlessly with our team and delivered real results.",
			author: "Head of Product",
			company: "Pan-African Insurer"
		}
	];
</script>

<section class="hero" style="min-height: {Math.max(0, heroHeight)}vh;">
	<div class="hero-container">
		<div
			class="hero-content"
			style="opacity: {Math.max(0, heroContentOpacity)};"
		>
			<h1>
				<span class="line">Digital</span>
				<span class="line">ambition,</span>
				<span class="line">shipped.</span>
			</h1>
			<p class="hero-tagline">
				Making bespoke software solutions<br />accessible to any business.
			</p>
			<div class="hero-cta">
				<a href="{base}/contact" class="btn btn-primary btn-large">Start your project</a>
				<a href="{base}/about" class="btn btn-secondary">Meet the team</a>
			</div>
			<div class="hero-clients">
				<span class="clients-label">Trusted by teams at</span>
				<div class="clients-list">
					{#each clients as client}
						<span class="client-name">{client}</span>
					{/each}
				</div>
			</div>
		</div>
		<div
			class="hero-mark"
			bind:this={markElement}
			style="transform: translate({markTranslateX}px, {markTranslateY}px) scale({markScale}); opacity: {markOpacity};"
		>
			<BVMark />
		</div>
	</div>
</section>

<section class="services-preview">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">What we do</span>
			<h2>From strategy to ship</h2>
		</div>
		<div class="services-grid">
			<div class="service-preview" use:scrollReveal={{ delay: 0 }}>
				<div class="service-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
					</svg>
				</div>
				<h3>Digital Product Management</h3>
				<p>From vision to roadmap to delivery. Senior product leadership without the full-time commitment.</p>
				<a href="{base}/services" class="service-link">Learn more →</a>
			</div>
			<div class="service-preview" use:scrollReveal={{ delay: 100 }}>
				<div class="service-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<polyline points="16,18 22,12 16,6"/>
						<polyline points="8,6 2,12 8,18"/>
					</svg>
				</div>
				<h3>Software Development</h3>
				<p>Custom software that ships. Web applications, mobile apps, and APIs with modern stacks.</p>
				<a href="{base}/services" class="service-link">Learn more →</a>
			</div>
			<div class="service-preview" use:scrollReveal={{ delay: 200 }}>
				<div class="service-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M21,12 A9,9 0 1,1 12,3"/>
						<polyline points="21,3 21,12 12,12"/>
					</svg>
				</div>
				<h3>Digital Transformation</h3>
				<p>Modernize without the chaos. Move from legacy systems to modern platforms.</p>
				<a href="{base}/services" class="service-link">Learn more →</a>
			</div>
		</div>
	</div>
</section>

<section class="credibility">
	<div class="container">
		<div class="credibility-content">
			<div class="stats-column" use:scrollReveal>
				<div class="stat-large">
					<span class="stat-number">30+</span>
					<span class="stat-label">Years combined<br/>experience</span>
				</div>
			</div>
			<div class="experience-column" use:scrollReveal={{ delay: 150 }}>
				<p class="experience-intro">
					We've led digital product and transformation initiatives at some of Africa's largest financial institutions.
				</p>
				<div class="experience-grid">
					<div class="experience-item">
						<span class="experience-role">Product Lead</span>
						<span class="experience-company">Absa Capital</span>
					</div>
					<div class="experience-item">
						<span class="experience-role">Group Head of Digital</span>
						<span class="experience-company">APA Insurance</span>
					</div>
					<div class="experience-item">
						<span class="experience-role">Head of Product</span>
						<span class="experience-company">Absa International</span>
					</div>
					<div class="experience-item">
						<span class="experience-role">Product Lead</span>
						<span class="experience-company">Sanlam Wealth</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="testimonials">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">What clients say</span>
			<h2>Results that speak</h2>
		</div>
		<div class="testimonials-grid">
			{#each testimonials as testimonial, i}
				<blockquote class="testimonial" use:scrollReveal={{ delay: i * 100 }}>
					<p class="testimonial-quote">"{testimonial.quote}"</p>
					<footer class="testimonial-author">
						<span class="author-name">{testimonial.author}</span>
						<span class="author-company">{testimonial.company}</span>
					</footer>
				</blockquote>
			{/each}
		</div>
	</div>
</section>

<section class="why-us">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">Why Barvere</span>
			<h2>Senior expertise, startup agility</h2>
		</div>
		<div class="why-grid">
			<div class="why-item" use:scrollReveal={{ delay: 0 }}>
				<div class="why-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<h3>Founder-led</h3>
				<p>You work directly with experienced practitioners, not junior consultants.</p>
			</div>
			<div class="why-item" use:scrollReveal={{ delay: 100 }}>
				<div class="why-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2 12h20"/>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
				</div>
				<h3>Pan-African</h3>
				<p>Experience across South Africa, Kenya, and broader African markets.</p>
			</div>
			<div class="why-item" use:scrollReveal={{ delay: 200 }}>
				<div class="why-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</div>
				<h3>We ship</h3>
				<p>Not just strategy decks. We build and deliver working software.</p>
			</div>
		</div>
	</div>
</section>

<section class="cta-section">
	<div class="container" use:scrollReveal>
		<h2>Ready to ship your next project?</h2>
		<p>Let's discuss how we can help you move from idea to production.</p>
		<a href="{base}/contact" class="btn btn-primary">Get in touch</a>
	</div>
</section>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.hero {
		position: relative;
		display: flex;
		align-items: center;
		padding-top: var(--nav-height);
		overflow: hidden;
		will-change: min-height;
	}

	.hero-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-16);
		align-items: center;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-12) var(--space-6);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		will-change: opacity;
	}

	h1 {
		display: flex;
		flex-direction: column;
	}

	h1 .line {
		display: block;
	}

	.hero-tagline {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		max-width: 45ch;
		line-height: 1.5;
	}

	.hero-cta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	:global(.btn-large) {
		padding: var(--space-5) var(--space-10);
		font-size: var(--text-lg);
	}

	.hero-clients {
		margin-top: var(--space-8);
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	.clients-label {
		display: block;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
	}

	.clients-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
	}

	.client-name {
		font-family: var(--font-display);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
		opacity: 0.7;
	}

	.hero-mark {
		display: flex;
		justify-content: center;
		align-items: center;
		will-change: transform, opacity;
	}

	@media (max-width: 968px) {
		.hero-container {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.hero-content {
			align-items: center;
		}

		p {
			max-width: 50ch;
		}

		.hero-cta {
			justify-content: center;
		}

		.hero-mark {
			order: -1;
			margin-bottom: var(--space-8);
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: var(--text-4xl);
		}

		.hero-cta {
			flex-direction: column;
			width: 100%;
		}

		.hero-cta .btn {
			width: 100%;
		}
	}

	/* Section Headers */
	.section-header {
		margin-bottom: var(--space-12);
	}

	.section-label {
		display: block;
		font-size: var(--text-sm);
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--space-3);
		font-weight: 500;
	}

	.section-header h2 {
		font-size: var(--text-3xl);
	}

	/* Services Preview */
	.services-preview {
		padding: var(--space-24) 0;
		border-top: 1px solid var(--color-border);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.service-preview {
		padding: var(--space-8);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		transition: border-color var(--transition-base), box-shadow var(--transition-base);
	}

	.service-preview:hover {
		border-color: var(--color-accent);
		box-shadow: var(--shadow-md);
	}

	.service-preview .service-icon {
		width: 40px;
		height: 40px;
		color: var(--color-accent);
	}

	.service-preview .service-icon svg {
		width: 100%;
		height: 100%;
	}

	.service-preview h3 {
		font-size: var(--text-xl);
	}

	.service-preview p {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		flex-grow: 1;
	}

	.service-link {
		font-size: var(--text-sm);
		color: var(--color-accent);
		font-weight: 500;
		transition: transform var(--transition-fast);
		display: inline-block;
	}

	.service-link:hover {
		transform: translateX(4px);
	}

	/* Credibility */
	.credibility {
		padding: var(--space-24) 0;
		background-color: var(--color-surface);
	}

	.credibility-content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--space-16);
		align-items: start;
	}

	.stats-column {
		position: sticky;
		top: calc(var(--nav-height) + var(--space-8));
	}

	.stat-large {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.stat-large .stat-number {
		font-family: var(--font-display);
		font-size: 6rem;
		font-weight: 700;
		color: var(--color-accent);
		line-height: 1;
	}

	.stat-large .stat-label {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		line-height: 1.4;
	}

	.experience-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.experience-intro {
		font-size: var(--text-xl);
		color: var(--color-text);
		max-width: 50ch;
		line-height: 1.5;
	}

	.experience-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	.experience-item {
		padding: var(--space-4);
		border-left: 2px solid var(--color-accent);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.experience-role {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.experience-company {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
	}

	/* Testimonials */
	.testimonials {
		padding: var(--space-24) 0;
		border-top: 1px solid var(--color-border);
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-8);
	}

	.testimonial {
		padding: var(--space-8);
		background-color: var(--color-surface);
		border-left: 3px solid var(--color-accent);
	}

	.testimonial-quote {
		font-size: var(--text-lg);
		font-style: italic;
		line-height: 1.6;
		color: var(--color-text);
		margin-bottom: var(--space-6);
		max-width: none;
	}

	.testimonial-author {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.author-name {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--text-base);
		color: var(--color-text);
	}

	.author-company {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	/* Why Us */
	.why-us {
		padding: var(--space-24) 0;
		border-top: 1px solid var(--color-border);
	}

	.why-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.why-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.why-icon {
		width: 48px;
		height: 48px;
		color: var(--color-accent);
	}

	.why-icon svg {
		width: 100%;
		height: 100%;
	}

	.why-item h3 {
		font-size: var(--text-xl);
	}

	.why-item p {
		font-size: var(--text-base);
		color: var(--color-text-muted);
	}

	/* CTA Section */
	.cta-section {
		padding: var(--space-24) 0;
		text-align: center;
		background-color: var(--color-surface);
	}

	.cta-section h2 {
		margin-bottom: var(--space-4);
	}

	.cta-section p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-8);
		max-width: none;
	}

	@media (max-width: 968px) {
		.services-grid,
		.why-grid,
		.testimonials-grid {
			grid-template-columns: 1fr;
		}

		.credibility-content {
			grid-template-columns: 1fr;
			gap: var(--space-10);
		}

		.stats-column {
			position: static;
		}

		.stat-large .stat-number {
			font-size: 4rem;
		}

		.hero-clients {
			text-align: center;
		}

		.clients-list {
			justify-content: center;
		}

		.experience-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
