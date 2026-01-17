<script lang="ts">
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import BVMark from '$lib/components/BVMark.svelte';

	const caseStudies = [
		{
			title: 'Digital Banking Platform Modernization',
			client: 'Major South African Bank',
			category: 'Digital Transformation',
			challenge: 'Legacy core banking system was limiting the launch of new digital products. Customer onboarding took 5+ days.',
			solution: 'Led the architecture and delivery of a new digital banking layer, enabling real-time account opening and self-service capabilities.',
			results: [
				'Account opening reduced from 5 days to 15 minutes',
				'40% increase in digital adoption',
				'R50M+ in cost savings over 3 years'
			],
			color: '#D97706'
		},
		{
			title: 'Pan-African Insurance Digital Experience',
			client: 'Leading East African Insurer',
			category: 'Product Management',
			challenge: 'Fragmented digital presence across 5 countries with no unified customer experience or data strategy.',
			solution: 'Defined and executed a pan-African digital strategy, including a unified mobile app and centralized customer data platform.',
			results: [
				'Single platform serving 5 markets',
				'Policy renewals increased by 35%',
				'NPS improved from 23 to 51'
			],
			color: '#2563EB'
		},
		{
			title: 'Wealth Management Platform',
			client: 'South African Asset Manager',
			category: 'Software Development',
			challenge: 'Manual investment processes and outdated client portal were causing client churn and operational inefficiency.',
			solution: 'Built a modern wealth management platform with automated portfolio rebalancing, client self-service, and advisor tools.',
			results: [
				'AUM grew 25% in first year post-launch',
				'Advisor productivity up 60%',
				'Client self-service adoption at 78%'
			],
			color: '#059669'
		}
	];
</script>

<section class="work-hero">
	<div class="container">
		<h1>Selected work</h1>
		<p class="lead">
			Anonymized case studies from our experience at Africa's leading financial institutions.
		</p>
	</div>
</section>

<section class="case-studies">
	<div class="container">
		{#each caseStudies as study, i}
			<article class="case-study" use:scrollReveal={{ delay: i * 100 }}>
				<div class="study-header" style="border-color: {study.color};">
					<span class="study-category" style="color: {study.color};">{study.category}</span>
					<h2>{study.title}</h2>
					<p class="study-client">{study.client}</p>
				</div>
				<div class="study-content">
					<div class="study-section">
						<h3>Challenge</h3>
						<p>{study.challenge}</p>
					</div>
					<div class="study-section">
						<h3>Solution</h3>
						<p>{study.solution}</p>
					</div>
					<div class="study-section">
						<h3>Results</h3>
						<ul class="results-list">
							{#each study.results as result}
								<li>
									<svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="{study.color}" stroke-width="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									{result}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="work-cta">
	<div class="container" use:scrollReveal>
		<div class="cta-mark">
			<BVMark />
		</div>
		<h2>Your project could be next</h2>
		<p>Let's discuss how we can help you achieve similar results.</p>
		<a href="/contact" class="btn btn-primary">Start a conversation</a>
	</div>
</section>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.work-hero {
		padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
	}

	.work-hero h1 {
		margin-bottom: var(--space-4);
	}

	.lead {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
		max-width: 50ch;
	}

	.case-studies {
		padding: var(--space-8) 0 var(--space-16);
	}

	.case-study {
		border: 1px solid var(--color-border);
		margin-bottom: var(--space-8);
		overflow: hidden;
	}

	.study-header {
		padding: var(--space-8);
		border-left: 4px solid;
		background-color: var(--color-surface);
	}

	.study-category {
		font-size: var(--text-sm);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-2);
		display: block;
	}

	.study-header h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-2);
	}

	.study-client {
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	.study-content {
		padding: var(--space-8);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.study-section h3 {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-3);
	}

	.study-section p {
		font-size: var(--text-base);
		color: var(--color-text);
		line-height: 1.6;
	}

	.results-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.results-list li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		font-size: var(--text-base);
		color: var(--color-text);
	}

	.result-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.work-cta {
		background-color: var(--color-surface);
		padding: var(--space-24) 0;
		text-align: center;
	}

	.cta-mark {
		max-width: 150px;
		margin: 0 auto var(--space-8);
		opacity: 0.3;
	}

	.work-cta h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-4);
	}

	.work-cta p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-6);
		max-width: none;
	}

	@media (max-width: 768px) {
		.work-hero {
			padding: calc(var(--nav-height) + var(--space-10)) 0 var(--space-10);
		}

		.lead {
			font-size: var(--text-lg);
		}

		.study-content {
			grid-template-columns: 1fr;
		}
	}
</style>
