export default class Accordion extends HTMLElement {
	constructor() {
		super();

		this.button = this.querySelector('button');
		if (!this.button) {
			throw new Error('Accordion must have a button element');
		}
		if (this.hasAttribute('data-slider-navigate') && this.getAttribute('data-slider-navigate') === 'true') {
			this.setupSliderNavigate();
		}

		this.button.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick() {
		const allAccordions = document.querySelectorAll('accordion-item');
		allAccordions.forEach((accordion) => {
			if (accordion !== this) {
				accordion.classList.remove('open');
			}
		});
		this.classList.toggle('open');
		this.swiper.slideTo(this.index, 500, true);
	}

	setupSliderNavigate() {
		// Check for all the nessesary attributes
		if (!this.hasAttribute('data-slider-index')) {
			throw new Error('Accordion must have a data-slider-index attribute to interact with the slider');
		}
		if (!this.hasAttribute('data-slider-id')) {
			throw new Error('Accordion must have a data-slider-id attribute to interact with the slider');
		}

		this.swiper = document.querySelector(`#${this.getAttribute('data-slider-id')}`).swiper;
		this.index = Number(this.getAttribute('data-slider-index') - 1);
	}
}

customElements.define('accordion-item', Accordion);
