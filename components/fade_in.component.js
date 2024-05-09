'use strict';
export default class FadeIn extends HTMLElement {
	constructor() {
		super();

		this.target = this.getAttribute('target') || 'div';
		this.speed = this.getAttribute('speed') || '1s';
		this.threshold = this.getAttribute('threshold') || '1';
		this.translateY = this.getAttribute('translateY') || '100px';

		this.container = this.querySelector(this.target);
	}

	connectedCallback() {
		this.container.style.opacity = '0';
		this.container.style.transform = `translateY(${this.translateY})`;
		this.container.style.transition = `opacity ${this.speed}, transform ${this.speed}`;

		const options = {
			threshold: this.threshold,
		};

		const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				} else {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
					appearOnScroll.unobserve(entry.target);
				}
			});
		}, options);

		appearOnScroll.observe(this.container);
	}
}

customElements.define('fade-in', FadeIn);
