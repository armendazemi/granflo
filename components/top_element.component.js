export default class TopElement extends HTMLElement {
  constructor() {
    super();
    this.debounceTimer = null;
    this.isFixed = false;

    // Check if the first child has a positon of aboslute or fixed
    if (this.firstElementChild) {
      const firstChildPosition = window.getComputedStyle(this.firstElementChild).position;
      if (firstChildPosition === 'absolute' || firstChildPosition === 'fixed') {
        this.style.position = firstChildPosition;
        this.style.top = '0';
        this.isFixed = true;
      }
    }

    // Add event listener with debouncing
    window.addEventListener('resize', this.debouncedHandleResize.bind(this));
  }

  connectedCallback() {
    // Calculate the initial marginTop value
    this.calculateMarginTop();
    this.style.display = 'block';
  }

  calculateMarginTop() {
    // Get the height of the header
    const header = document.querySelector('header');
    if (header) {
      const headerHeight = header.getBoundingClientRect().height + 'px';
      if (this.isFixed) {
        this.style.top = headerHeight;
      } else {
        this.style.marginTop = headerHeight;
      }
    }
  }

  debouncedHandleResize() {
    // Clear the previous timeout to avoid multiple rapid calls
    clearTimeout(this.debounceTimer);

    // Set a new timeout
    this.debounceTimer = setTimeout(() => {
      // Handle resize event after the debounce interval
      this.handleResize();
    }, 200); // Adjust the debounce interval as needed
  }

  handleResize() {
    // Recalculate marginTop on resize
    this.calculateMarginTop();
  }
}

customElements.define('top-element', TopElement);
