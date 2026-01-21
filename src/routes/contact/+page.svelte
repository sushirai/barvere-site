<script lang="ts">
	import { scrollReveal } from '$lib/actions/scrollReveal';

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let projectType = $state('');
	let budget = $state('');
	let timeline = $state('');
	let message = $state('');
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

	const projectTypes = [
		{ value: '', label: 'Select project type' },
		{ value: 'product-management', label: 'Digital Product Management' },
		{ value: 'software-development', label: 'Software Development' },
		{ value: 'digital-transformation', label: 'Digital Transformation' },
		{ value: 'strategy', label: 'Strategy & Advisory' },
		{ value: 'other', label: 'Other / Not sure yet' }
	];

	const budgetRanges = [
		{ value: '', label: 'Select budget range' },
		{ value: 'under-50k', label: 'Under R500,000' },
		{ value: '50k-200k', label: 'R500,000 - R2,000,000' },
		{ value: '200k-500k', label: 'R2,000,000 - R5,000,000' },
		{ value: 'over-500k', label: 'R5,000,000+' },
		{ value: 'not-sure', label: 'Not sure yet' }
	];

	const timelines = [
		{ value: '', label: 'Select timeline' },
		{ value: 'asap', label: 'As soon as possible' },
		{ value: '1-3-months', label: '1-3 months' },
		{ value: '3-6-months', label: '3-6 months' },
		{ value: '6-plus', label: '6+ months' },
		{ value: 'flexible', label: 'Flexible / Ongoing' }
	];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		status = 'sending';

		// TODO: Connect to actual form handler (Formspree, Netlify Forms, etc.)
		// For now, simulate a submission
		await new Promise(resolve => setTimeout(resolve, 1200));
		status = 'sent';

		// Reset form
		name = '';
		email = '';
		company = '';
		projectType = '';
		budget = '';
		timeline = '';
		message = '';
	}

	function resetForm() {
		status = 'idle';
	}
</script>

<section class="contact-hero">
	<div class="container">
		<h1>Let's talk</h1>
		<p class="lead">
			Tell us about your project. We'll get back to you within 24 hours.
		</p>
	</div>
</section>

<section class="contact-content">
	<div class="container">
		<div class="contact-grid">
			<form class="contact-form" onsubmit={handleSubmit} use:scrollReveal>
				{#if status === 'sent'}
					<div class="success-message">
						<div class="success-animation">
							<svg class="success-check" viewBox="0 0 52 52">
								<circle class="success-circle" cx="26" cy="26" r="25" fill="none"/>
								<path class="success-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
							</svg>
						</div>
						<h2>Message sent successfully</h2>
						<p class="success-subtitle">Thanks for reaching out. We're excited to learn more about your project.</p>
						<div class="success-next-steps">
							<h3>What happens next?</h3>
							<ul>
								<li>
									<span class="step-number">1</span>
									<span>We'll review your project details within 24 hours</span>
								</li>
								<li>
									<span class="step-number">2</span>
									<span>One of our founders will reach out to schedule a call</span>
								</li>
								<li>
									<span class="step-number">3</span>
									<span>We'll discuss your needs and explore how we can help</span>
								</li>
							</ul>
						</div>
						<button type="button" class="btn btn-secondary" onclick={resetForm}>
							Send another message
						</button>
					</div>
				{:else}
					<div class="form-row">
						<div class="form-group">
							<label for="name">Your name <span class="required">*</span></label>
							<input
								type="text"
								id="name"
								bind:value={name}
								placeholder="e.g. John Mkhize"
								required
								disabled={status === 'sending'}
							/>
						</div>
						<div class="form-group">
							<label for="email">Email address <span class="required">*</span></label>
							<input
								type="email"
								id="email"
								bind:value={email}
								placeholder="john@company.co.za"
								required
								disabled={status === 'sending'}
							/>
						</div>
					</div>
					<div class="form-group">
						<label for="company">Company / Organization</label>
						<input
							type="text"
							id="company"
							bind:value={company}
							placeholder="e.g. First National Bank"
							disabled={status === 'sending'}
						/>
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="projectType">Project type</label>
							<select
								id="projectType"
								bind:value={projectType}
								disabled={status === 'sending'}
							>
								{#each projectTypes as type}
									<option value={type.value}>{type.label}</option>
								{/each}
							</select>
						</div>
						<div class="form-group">
							<label for="budget">Budget range</label>
							<select
								id="budget"
								bind:value={budget}
								disabled={status === 'sending'}
							>
								{#each budgetRanges as range}
									<option value={range.value}>{range.label}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="timeline">Timeline</label>
						<select
							id="timeline"
							bind:value={timeline}
							disabled={status === 'sending'}
						>
							{#each timelines as t}
								<option value={t.value}>{t.label}</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label for="message">Tell us about your project <span class="required">*</span></label>
						<textarea
							id="message"
							bind:value={message}
							rows="5"
							placeholder="Describe your project, goals, and any specific challenges you're facing. The more detail you provide, the better we can prepare for our conversation."
							required
							disabled={status === 'sending'}
						></textarea>
					</div>
					<button type="submit" class="btn btn-primary btn-submit" disabled={status === 'sending'}>
						{#if status === 'sending'}
							<span class="spinner"></span>
							Sending...
						{:else}
							Send message
							<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="5" y1="12" x2="19" y2="12"/>
								<polyline points="12 5 19 12 12 19"/>
							</svg>
						{/if}
					</button>
				{/if}
			</form>

			<div class="contact-info" use:scrollReveal={{ delay: 150 }}>
				<div class="info-block">
					<div class="info-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="2" y="4" width="20" height="16" rx="2"/>
							<polyline points="22,6 12,13 2,6"/>
						</svg>
					</div>
					<div class="info-content">
						<h3>Email</h3>
						<a href="mailto:hello@barvere.tech">hello@barvere.tech</a>
					</div>
				</div>
				<div class="info-block">
					<div class="info-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12,2 C8.13,2 5,5.13 5,9 C5,14.25 12,22 12,22 C12,22 19,14.25 19,9 C19,5.13 15.87,2 12,2 Z"/>
							<circle cx="12" cy="9" r="3"/>
						</svg>
					</div>
					<div class="info-content">
						<h3>Location</h3>
						<p>Johannesburg, South Africa</p>
					</div>
				</div>
				<div class="info-block">
					<div class="info-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M16,8 A6,6 0 0,1 8,8 L8,16 A6,6 0 0,0 16,16 L16,8 Z"/>
							<line x1="8" y1="12" x2="16" y2="12"/>
						</svg>
					</div>
					<div class="info-content">
						<h3>Connect</h3>
						<div class="social-links">
							<a href="https://www.linkedin.com/in/leroy-barnes/" target="_blank" rel="noopener">
								LinkedIn →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.contact-hero {
		padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-12);
	}

	.contact-hero h1 {
		margin-bottom: var(--space-4);
	}

	.lead {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
		max-width: 50ch;
	}

	.contact-content {
		padding: var(--space-8) 0 var(--space-24);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: var(--space-16);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text);
	}

	.required {
		color: var(--color-accent);
	}

	input,
	textarea,
	select {
		padding: var(--space-4);
		border: 1px solid var(--color-border);
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-body);
		font-size: var(--text-base);
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
		border-radius: 0;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	select {
		cursor: pointer;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--space-4) center;
		padding-right: var(--space-10);
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
	}

	input:disabled,
	textarea:disabled,
	select:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	textarea {
		resize: vertical;
		min-height: 140px;
	}

	.btn-submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		margin-top: var(--space-2);
	}

	.btn-arrow {
		width: 18px;
		height: 18px;
		transition: transform var(--transition-fast);
	}

	.btn-submit:hover .btn-arrow {
		transform: translateX(4px);
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Success Animation */
	.success-message {
		text-align: center;
		padding: var(--space-8) 0;
		animation: fadeInUp 0.5s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.success-animation {
		width: 72px;
		height: 72px;
		margin: 0 auto var(--space-6);
	}

	.success-check {
		width: 100%;
		height: 100%;
	}

	.success-circle {
		stroke: var(--color-accent);
		stroke-width: 2;
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		animation: strokeCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.success-path {
		stroke: var(--color-accent);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		animation: strokeCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
	}

	@keyframes strokeCircle {
		100% { stroke-dashoffset: 0; }
	}

	@keyframes strokeCheck {
		100% { stroke-dashoffset: 0; }
	}

	.success-message h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-3);
	}

	.success-subtitle {
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		margin-bottom: var(--space-8);
	}

	.success-next-steps {
		background-color: var(--color-surface);
		padding: var(--space-6);
		text-align: left;
		margin-bottom: var(--space-6);
		border-left: 3px solid var(--color-accent);
	}

	.success-next-steps h3 {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-4);
	}

	.success-next-steps ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.success-next-steps li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.success-next-steps .step-number {
		width: 24px;
		height: 24px;
		background-color: var(--color-accent);
		color: white;
		font-size: var(--text-sm);
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.btn-secondary {
		background-color: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text);
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-secondary:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-10);
		padding-top: var(--space-2);
	}

	.info-block {
		display: flex;
		gap: var(--space-4);
	}

	.info-icon {
		width: 24px;
		height: 24px;
		color: var(--color-accent);
		flex-shrink: 0;
		margin-top: var(--space-1);
	}

	.info-icon svg {
		width: 100%;
		height: 100%;
	}

	.info-content h3 {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-muted);
		margin-bottom: var(--space-2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.info-content a,
	.info-content p {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.info-content a {
		transition: color var(--transition-fast);
	}

	.info-content a:hover {
		color: var(--color-accent);
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.social-links a {
		font-size: var(--text-base);
		color: var(--color-text);
	}

	@media (max-width: 968px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--space-12);
		}
	}

	@media (max-width: 768px) {
		.contact-hero {
			padding: calc(var(--nav-height) + var(--space-10)) 0 var(--space-8);
		}

		.lead {
			font-size: var(--text-lg);
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-info {
			order: -1;
			padding-top: 0;
		}
	}
</style>
