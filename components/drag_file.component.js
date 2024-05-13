'use strict';

export default class DragFile extends HTMLElement{
  constructor() {
    super();

    this.fileInput = this.querySelector('input');
    this.dropArea = this.querySelector('#drop-area');
    this.dropAreaText = this.querySelector('.drop-area__text');

    if (!this.fileInput) {
      throw new Error('No input element found, there must be an input element inside the drag-file component');
    }

    if (!this.dropArea) {
      throw new Error('No drop area element found, there must be an element with id drop-area inside the drag-file component');
    }

    if (!this.dropAreaText) {
      throw new Error('No drop area text element found, there must be an element with class drop-area-text inside the drag-file component');
    }

    this.fileTypes = this.fileInput.accept.split(',');
    this.dropArea.tabIndex = 0;
  }

  connectedCallback() {
    this.setupListeners();
  }

  setupListeners() {
    this.addEventListener('click', this.clickHandler);

    // Drag events
    const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
    dragEvents.forEach(eventName => {
      this.addEventListener(eventName, this.preventDefaults);
    });

    this.addEventListener('dragenter', this.setActive);
    this.addEventListener('dragover', this.setActive);

    this.addEventListener('dragleave', this.setInactive);
    this.addEventListener('drop', this.setInactive);

    this.addEventListener('drop', this.handleDrop);

    this.fileInput.addEventListener('change', this.handleInputChange.bind(this));

    this.dropArea.addEventListener('keydown', this.handleKeyDown.bind(this));

  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setActive(e) {
    this.dropArea.classList.add('active');
  }

  setInactive() {
    this.dropArea.classList.remove('active');
  }

  clickHandler(e) {
    this.fileInput.click();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.fileInput.click();
    }
  }

  handleInputChange(e) {
    this.handleFiles(this.fileInput.files);
  }

  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(files);
  }

  /**
   * Handle files dropped by appending them to the file input
   * @param files {FileList} - List of files dropped
   */
  handleFiles(files) {
    if (!this.checkFileTypes(files)) {
      const currentInnerHtml = this.dropAreaText.innerHTML;
      this.dropAreaText.innerHTML = 'Felaktig filtyp, endast ' + this.fileTypes.join(', ') + ' är tillåtna. ';
      setTimeout(() => {
        this.dropAreaText.innerHTML = currentInnerHtml;
      }, 3000);
      return;
    }

    let filesNames = [];
    ([...files]).forEach((file) => {
      this.fileInput.files = files;
      filesNames.push(file.name);
    });

    // Log number of files added
    console.log(this.fileInput.files.length + ' files added');

    this.displayFiles(filesNames);
  }

  checkFileTypes(files) {
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      if (!this.fileTypes.includes('.' + fileExtension)) {
        return false;
      }
    }
    return true;
  }

  displayFiles(filesNames){
    this.dropAreaText.innerHTML = filesNames.join(', ');
  }
}

customElements.define('drag-file', DragFile);