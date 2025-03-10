/* Max Character Counter Web Component
 * Version: 1.0.0
 * License: GPL-3.0
 * Author: Scott Andrew LePera
 * Author URL: https://scottandrew.com
 * Github URL: https://github.com/scottandrewlepera/
 * Copyright: 2025 Scott Andrew LePera
 */

class MaxCharacterCounter extends HTMLElement {
  static COMPONENT_NAME = "max-character-counter";
  #targetEl;
  #counterEl;
  #handleKeyup;
  
  constructor() {
    super();
    this.#handleKeyup = this.updateCounter.bind(this);
  }
  
  initialize() {
    this.cleanup();
    
    const htmlFor = this.getAttribute("for");
    if (!this.validateSetup(htmlFor)) return;
    
    this.createCounter();
    this.#targetEl.addEventListener("keyup", this.#handleKeyup);
  }
  
  validateSetup(htmlFor) {
    if (!htmlFor) {
      this.error("'for' attribute is required.");
      return false;
    }
    
    this.#targetEl = document.getElementById(htmlFor);
    if (!this.#targetEl) {
      this.error(`element not found: ${htmlFor}`);
      return false;
    }
    
    const maxlength = this.#targetEl.getAttribute("maxlength");
    if (!maxlength) {
      this.error("element must have 'maxlength' attribute.");
      return false;
    }
    
    const max = parseInt(maxlength, 10);
    if (isNaN(max)) {
      this.error("'maxlength' attribute must be a number.");
      return false;
    }
    
    return true;
  }
  
  createCounter() {
    this.#counterEl = document.createElement("span");
    this.#counterEl.classList.add("max-char-counter");
    const max = parseInt(this.#targetEl.getAttribute("maxlength"), 10);
    this.#counterEl.innerHTML = max;
    this.appendChild(this.#counterEl);
  }
  
  updateCounter() {
    const max = parseInt(this.#targetEl.getAttribute("maxlength"), 10);
    const remaining = max - this.#targetEl.value.length;
    const warningBoundary = Math.ceil(max * 0.2);
    
    this.#counterEl.innerHTML = remaining;
    
    if (remaining <= warningBoundary) {
      this.#counterEl.classList.add("max-char-counter-warning");
    } else {
      this.#counterEl.classList.remove("max-char-counter-warning");
    }
  }
  
  cleanup() {
    if (this.#targetEl) {
      this.#targetEl.removeEventListener("keyup", this.#handleKeyup);
    }
    this.#counterEl?.remove();
  }
  
  connectedCallback() {
    this.initialize();
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  error(message) {
    console.error(`${MaxCharacterCounter.COMPONENT_NAME}: ${message}`);
  }
}

if (!('customElements' in window)) {
  console.error(`${MaxCharacterCounter.COMPONENT_NAME}: custom elements not supported`);
} else {
  customElements.define(MaxCharacterCounter.COMPONENT_NAME, MaxCharacterCounter);
}
