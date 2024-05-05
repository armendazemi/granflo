import {toggleVisibility} from './utils.js';


export default class Overlay extends HTMLElement {
  constructor() {
    super();

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    this.appendChild(overlay);
  }

  connectedCallback() {
    this.addListeners();
  }

  addListeners() {
    let element = null;
    let initiator = null;
    window.addEventListener('overlaychange', (event) => {
      if (event.detail.element !== this) {
        toggleVisibility(this.querySelector('.overlay'), event.detail.action);
        // document.querySelector('body').style.overflow = event.detail.action === 'close' ? 'auto' : 'hidden';
        element = event.detail.element;
      }

      if (event.detail.initiator !== null) {
        initiator = event.detail.initiator;
      }
    });

    this.querySelector('.overlay').addEventListener('click', () => {
      toggleVisibility(this.querySelector('.overlay'), 'close');
      // document.querySelector('body').style.overflow = 'auto';
      toggleVisibility(element, 'close');
      if (initiator) {
        this.dispatchModalEvent(initiator, 'close');
      }
    });
  }


  dispatchModalEvent(initiator, action) {
    window.dispatchEvent(new CustomEvent('modalchange', {
      detail: {
        action: action,
        initiator,
        element: initiator.getAttribute('data-modal-element'),
      }
    }));
  }
}

customElements.define('overlay-component', Overlay);