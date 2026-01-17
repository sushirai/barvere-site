<script lang="ts">
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const founders = [
		{
			name: 'Tapfuma Mvere',
			role: 'Co-Founder',
			initials: 'TM',
			photo: '/images/tapfuma.jpg',
			linkedin: 'https://www.linkedin.com/in/tapfumamvere/',
			bio: 'Tapfuma brings over 11 years of experience building digital products in financial services. His deep technical background combined with product strategy expertise makes him uniquely positioned to bridge the gap between business vision and technical execution.',
			experience: [
				'11+ years at ABSA Capital',
				'Product Lead at Sanlam Wealth',
				'GIBS MBA'
			],
			focus: 'Product strategy, wealth & banking, technical architecture'
		},
		{
			name: 'LeRoy Barnes',
			role: 'Co-Founder',
			initials: 'LB',
			photo: '/images/leroy.jpg',
			linkedin: 'https://www.linkedin.com/in/leroy-barnes/',
			bio: 'LeRoy has led digital transformation initiatives across multiple African markets. His experience spans insurance, banking, and payments, with a particular focus on building products that work for diverse African contexts.',
			experience: [
				'Head of Digital at APA Insurance Kenya',
				'Head of Product at Absa International Banking',
				'Wits Masters in Digital Business (Cum Laude)'
			],
			focus: 'Digital transformation, payments, pan-African expansion'
		}
	];

	const stats = [
		{ number: '30+', label: 'Years combined experience' },
		{ number: '5', label: 'African markets served' },
		{ number: '3', label: 'Major banks partnered' }
	];

	const values = [
		{
			title: 'Ship, don\'t slide',
			description: 'We deliver working software, not presentation decks. Our value is measured in production code and business outcomes.'
		},
		{
			title: 'Context matters',
			description: 'African markets have unique constraints and opportunities. We build solutions that work here, not just solutions copied from elsewhere.'
		},
		{
			title: 'Senior by default',
			description: 'You work directly with the founders. No bait-and-switch with junior consultants after the sale.'
		}
	];
</script>

<section class="about-hero">
	<div class="container">
		<h1>Two founders,<br />one vision</h1>
		<p class="lead">
			Barvere is <strong>Bar</strong>nes + M<strong>vere</strong>. A partnership built on decades
			of delivering digital products in African financial services.
		</p>
	</div>
</section>

<section class="stats-bar">
	<div class="container">
		<div class="stats-grid" use:scrollReveal>
			{#each stats as stat}
				<div class="stat">
					<span class="stat-number">{stat.number}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="founders">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">Meet the team</span>
			<h2>The people behind Barvere</h2>
		</div>
		{#each founders as founder, i}
			<article class="founder-card" use:scrollReveal={{ delay: i * 150 }}>
				<div class="founder-photo">
					<img
						src={founder.photo}
						alt={founder.name}
						class="photo-img"
						onerror={(e) => {
							const img = e.currentTarget as HTMLImageElement;
							img.style.display = 'none';
							const placeholder = img.nextElementSibling as HTMLElement;
							if (placeholder) placeholder.style.display = 'flex';
						}}
					/>
					<div class="photo-placeholder" style="display: none;">
						<span class="initials">{founder.initials}</span>
					</div>
				</div>
				<div class="founder-info">
					<h2>{founder.name}</h2>
					<span class="founder-role">{founder.role}</span>
					<p class="founder-bio">{founder.bio}</p>
					<p class="founder-focus"><strong>Focus:</strong> {founder.focus}</p>
					<a href={founder.linkedin} target="_blank" rel="noopener" class="linkedin-link">
						<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						Connect on LinkedIn
					</a>
				</div>
				<ul class="founder-experience">
					<h3>Experience</h3>
					{#each founder.experience as exp}
						<li>
							<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							{exp}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section class="our-story">
	<div class="container">
		<div class="story-content" use:scrollReveal>
			<div class="section-header">
				<span class="section-label">Our story</span>
				<h2>Why we started Barvere</h2>
			</div>
			<div class="story-text">
				<p>
					After years of building digital products inside large financial institutions, we saw the same pattern repeat: companies needed senior digital expertise but couldn't justify full-time hires, or they hired consultancies that delivered beautiful slide decks but couldn't ship code.
				</p>
				<p>
					We started Barvere to be the partner we wished we had. Senior practitioners who understand African financial services, can define strategy, and can actually build and ship the product.
				</p>
				<p>
					The name? It's simple. <strong>Bar</strong>nes + M<strong>vere</strong>. Two founders committed to making bespoke software solutions accessible to any business.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="values">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">What we believe</span>
			<h2>Our principles</h2>
		</div>
		<div class="values-grid">
			{#each values as value, i}
				<div class="value-card" use:scrollReveal={{ delay: i * 100 }}>
					<h3>{value.title}</h3>
					<p>{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="about-cta">
	<div class="container" use:scrollReveal>
		<h2>Want to work with us?</h2>
		<p>Let's discuss your project and see if we're a good fit.</p>
		<a href="{base}/contact" class="btn btn-primary">Get in touch</a>
	</div>
</section>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.section-header {
		margin-bottom: var(--space-8);
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

	.about-hero {
		padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-12);
	}

	.about-hero h1 {
		margin-bottom: var(--space-4);
	}

	.lead {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
		max-width: 55ch;
	}

	.lead strong {
		color: var(--color-accent);
		font-weight: 600;
	}

	.stats-bar {
		padding: var(--space-10) 0;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
		text-align: center;
	}

	.stat-number {
		display: block;
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: 700;
		color: var(--color-accent);
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.founders {
		padding: var(--space-24) 0;
	}

	.founder-card {
		display: grid;
		grid-template-columns: 200px 1fr 1fr;
		gap: var(--space-8);
		padding: var(--space-8);
		border: 1px solid var(--color-border);
		margin-bottom: var(--space-8);
	}

	.founder-photo {
		display: flex;
		align-items: flex-start;
	}

	.photo-img {
		width: 180px;
		height: 180px;
		object-fit: cover;
		border: 2px solid var(--color-accent);
	}

	.photo-placeholder {
		width: 180px;
		height: 180px;
		background-color: var(--color-surface);
		border: 2px solid var(--color-accent);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.initials {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: 700;
		color: var(--color-accent);
	}

	.founder-info h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-2);
	}

	.founder-role {
		font-size: var(--text-sm);
		color: var(--color-accent);
		font-weight: 500;
		display: block;
		margin-bottom: var(--space-4);
	}

	.founder-bio {
		color: var(--color-text-muted);
		margin-bottom: var(--space-4);
		line-height: 1.6;
	}

	.founder-focus {
		font-size: var(--text-sm);
		color: var(--color-text);
		margin-bottom: var(--space-4);
	}

	.linkedin-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	.linkedin-link:hover {
		color: var(--color-accent);
	}

	.founder-experience {
		list-style: none;
	}

	.founder-experience h3 {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-4);
	}

	.founder-experience li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
		font-size: var(--text-base);
	}

	.check-icon {
		width: 18px;
		height: 18px;
		color: var(--color-accent);
		flex-shrink: 0;
	}

	/* Our Story */
	.our-story {
		padding: var(--space-24) 0;
		background-color: var(--color-surface);
	}

	.story-content {
		max-width: 800px;
	}

	.story-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.story-text p {
		font-size: var(--text-lg);
		line-height: 1.7;
		color: var(--color-text);
		max-width: none;
	}

	.story-text strong {
		color: var(--color-accent);
	}

	/* Values */
	.values {
		padding: var(--space-24) 0;
		border-top: 1px solid var(--color-border);
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.value-card {
		padding: var(--space-6);
		border-left: 2px solid var(--color-accent);
	}

	.value-card h3 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-3);
	}

	.value-card p {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.about-cta {
		background-color: var(--color-surface);
		padding: var(--space-16) 0;
		text-align: center;
	}

	.about-cta h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-4);
	}

	.about-cta p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-6);
		max-width: none;
	}

	@media (max-width: 968px) {
		.founder-card {
			grid-template-columns: 1fr;
		}

		.founder-photo {
			justify-content: center;
		}

		.values-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.about-hero {
			padding: calc(var(--nav-height) + var(--space-10)) 0 var(--space-8);
		}

		.lead {
			font-size: var(--text-lg);
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.story-text p {
			font-size: var(--text-base);
		}
	}
</style>
