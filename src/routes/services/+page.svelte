<script lang="ts">
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const services = [
		{
			title: 'Digital Product Management',
			icon: 'compass',
			color: 'var(--color-accent)',
			description: 'From vision to roadmap to delivery. We bring senior product leadership to your organization without the full-time commitment.',
			offerings: [
				'Product strategy and vision',
				'Roadmap development',
				'User research and discovery',
				'Agile/Scrum implementation',
				'Stakeholder management',
				'KPI definition and tracking'
			]
		},
		{
			title: 'Software Development',
			icon: 'code',
			color: '#2563EB',
			description: 'Custom software that ships. We build web applications, mobile apps, and APIs with modern technology stacks.',
			offerings: [
				'Full-stack web development',
				'Mobile applications (iOS/Android)',
				'API design and development',
				'Cloud architecture',
				'DevOps and CI/CD',
				'Technical debt reduction'
			]
		},
		{
			title: 'Digital Transformation',
			icon: 'transform',
			color: '#059669',
			description: 'Modernize without the chaos. We help enterprises move from legacy systems to modern platforms with a clear path forward.',
			offerings: [
				'Technology assessment',
				'Digital strategy development',
				'Legacy system modernization',
				'Process automation',
				'Change management',
				'Vendor selection'
			]
		}
	];
</script>

<section class="services-hero">
	<div class="container">
		<h1>What we do</h1>
		<p class="lead">
			Strategy, software, and transformation. Delivered by practitioners who've done it at scale.
		</p>
	</div>
</section>

<section class="services-list">
	<div class="container">
		{#each services as service, i}
			<article class="service-card" use:scrollReveal={{ delay: i * 100 }}>
				<div class="service-header">
					<div class="service-icon" style="background-color: {service.color}20; color: {service.color};">
						{#if service.icon === 'compass'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<circle cx="12" cy="12" r="10"/>
								<polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
							</svg>
						{:else if service.icon === 'code'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<polyline points="16,18 22,12 16,6"/>
								<polyline points="8,6 2,12 8,18"/>
							</svg>
						{:else if service.icon === 'transform'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M21,12 A9,9 0 1,1 12,3"/>
								<polyline points="21,3 21,12 12,12"/>
							</svg>
						{/if}
					</div>
					<div class="service-title-area">
						<h2>{service.title}</h2>
						<p class="service-description">{service.description}</p>
					</div>
				</div>
				<ul class="service-offerings">
					{#each service.offerings as offering}
						<li>
							<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							{offering}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section class="process">
	<div class="container">
		<div class="section-header" use:scrollReveal>
			<span class="section-label">Our approach</span>
			<h2>How we work</h2>
		</div>
		<div class="process-grid">
			<div class="process-step" use:scrollReveal={{ delay: 0 }}>
				<span class="step-number">01</span>
				<h3>Discovery</h3>
				<p>We start by understanding your business, users, and goals. No assumptions, just listening.</p>
			</div>
			<div class="process-step" use:scrollReveal={{ delay: 100 }}>
				<span class="step-number">02</span>
				<h3>Strategy</h3>
				<p>We define the roadmap, prioritize ruthlessly, and align stakeholders on what success looks like.</p>
			</div>
			<div class="process-step" use:scrollReveal={{ delay: 200 }}>
				<span class="step-number">03</span>
				<h3>Build</h3>
				<p>We ship iteratively, with regular demos and feedback loops. No big bang releases.</p>
			</div>
			<div class="process-step" use:scrollReveal={{ delay: 300 }}>
				<span class="step-number">04</span>
				<h3>Measure</h3>
				<p>We track outcomes, learn from data, and continuously improve what we've built.</p>
			</div>
		</div>
	</div>
</section>

<section class="services-cta">
	<div class="container" use:scrollReveal>
		<h2>Let's scope your project together</h2>
		<p>Tell us what you're building and we'll share how we can help.</p>
		<a href="/contact" class="btn btn-primary">Start the conversation</a>
	</div>
</section>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.services-hero {
		padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
	}

	.services-hero h1 {
		margin-bottom: var(--space-4);
	}

	.lead {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
		max-width: 50ch;
	}

	.services-list {
		padding: var(--space-8) 0 var(--space-16);
	}

	.service-card {
		border: 1px solid var(--color-border);
		padding: var(--space-8);
		margin-bottom: var(--space-8);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-8);
		transition: border-color var(--transition-base), box-shadow var(--transition-base);
	}

	.service-card:hover {
		border-color: var(--color-accent);
		box-shadow: var(--shadow-md);
	}

	.service-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.service-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.service-icon svg {
		width: 28px;
		height: 28px;
	}

	.service-title-area h2 {
		font-size: var(--text-2xl);
		font-weight: 600;
		margin-bottom: var(--space-3);
	}

	.service-description {
		color: var(--color-text-muted);
		max-width: 45ch;
	}

	.service-offerings {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.service-offerings li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--color-text);
		font-size: var(--text-base);
	}

	.check-icon {
		width: 18px;
		height: 18px;
		color: var(--color-accent);
		flex-shrink: 0;
	}

	/* Process Section */
	.process {
		padding: var(--space-24) 0;
		background-color: var(--color-surface);
	}

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

	.process-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-8);
	}

	.process-step {
		padding: var(--space-6);
		border-left: 2px solid var(--color-accent);
	}

	.step-number {
		font-family: var(--font-display);
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-accent);
		margin-bottom: var(--space-3);
		display: block;
	}

	.process-step h3 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-2);
	}

	.process-step p {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.services-cta {
		background-color: var(--color-bg);
		padding: var(--space-24) 0;
		text-align: center;
		border-top: 1px solid var(--color-border);
	}

	.services-cta h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-4);
	}

	.services-cta p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-6);
		max-width: none;
	}

	@media (max-width: 968px) {
		.process-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.service-card {
			grid-template-columns: 1fr;
		}

		.services-hero {
			padding: calc(var(--nav-height) + var(--space-10)) 0 var(--space-10);
		}

		.lead {
			font-size: var(--text-lg);
		}

		.process-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
