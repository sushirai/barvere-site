export function scrollReveal(node: HTMLElement, options: { delay?: number; y?: number } = {}) {
	const { delay = 0, y = 30 } = options;

	// Set initial state
	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
					observer.unobserve(node);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

export function scrollStagger(node: HTMLElement, options: { staggerDelay?: number; y?: number } = {}) {
	const { staggerDelay = 100, y = 30 } = options;
	const children = Array.from(node.children) as HTMLElement[];

	children.forEach((child, i) => {
		child.style.opacity = '0';
		child.style.transform = `translateY(${y}px)`;
		child.style.transition = `opacity 0.5s ease-out ${i * staggerDelay}ms, transform 0.5s ease-out ${i * staggerDelay}ms`;
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					children.forEach((child) => {
						child.style.opacity = '1';
						child.style.transform = 'translateY(0)';
					});
					observer.unobserve(node);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
