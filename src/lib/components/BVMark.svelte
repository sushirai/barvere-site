<script lang="ts">
	import { onMount } from 'svelte';

	let animate = $state(false);
	let markElement: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Small delay then trigger animation
						setTimeout(() => {
							animate = true;
						}, 50);
					} else {
						// Reset when out of view
						animate = false;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (markElement) {
			observer.observe(markElement);
		}

		return () => observer.disconnect();
	});
</script>

<div class="bv-mark" bind:this={markElement}>
	<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" class:animate>
		<!-- Border frame -->
		<rect
			class="frame"
			x="2"
			y="2"
			width="276"
			height="196"
			stroke="var(--color-accent)"
			stroke-width="3"
			fill="none"
		/>

		<!-- B letter -->
		<text x="50" y="140" class="letter letter-b">B</text>

		<!-- Divider pipe -->
		<line
			class="divider"
			x1="140"
			y1="40"
			x2="140"
			y2="160"
			stroke="var(--color-accent)"
			stroke-width="4"
		/>

		<!-- V letter -->
		<text x="165" y="140" class="letter letter-v">V</text>
	</svg>
</div>

<style>
	.bv-mark {
		width: 100%;
		max-width: 350px;
	}

	svg {
		width: 100%;
		height: auto;
	}

	.frame {
		stroke-dasharray: 944;
		stroke-dashoffset: 944;
		transition: stroke-dashoffset 0.8s cubic-bezier(0.65, 0, 0.35, 1);
	}

	.divider {
		stroke-dasharray: 120;
		stroke-dashoffset: 120;
		transition: stroke-dashoffset 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.6s;
	}

	.letter {
		font-family: var(--font-display);
		font-size: 100px;
		font-weight: 700;
		fill: var(--color-accent);
		opacity: 0;
		transition: opacity 0.4s ease-out;
	}

	.letter-b {
		transition-delay: 0.4s;
	}

	.letter-v {
		transition-delay: 0.5s;
	}

	/* Animated state */
	svg.animate .frame {
		stroke-dashoffset: 0;
	}

	svg.animate .divider {
		stroke-dashoffset: 0;
	}

	svg.animate .letter {
		opacity: 1;
	}

	/* Dark mode glow effect */
	:global(.dark) .bv-mark svg {
		filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.2));
	}

	@media (max-width: 768px) {
		.bv-mark {
			max-width: 250px;
		}
	}
</style>
