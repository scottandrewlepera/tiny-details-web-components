/* Copy to Clipboard Web Component
 * Version: 1.0.0
 * License: MIT
 * Author: Scott Andrew LePera
 * Author URL: https://scottandrew.com
 * Github URL: https://github.com/scottandrewlepera/
 * Copyright: 2025 Scott Andrew LePera
 */

class CopyClip extends HTMLElement {

  static COMPONENT_NAME = "copy-clip";
  
  #targetEl;
  #copyBtn;
  #handleClick;
  #value;

  constructor() {
    super();
    this.#handleClick = this.copyToClipboard.bind(this);
  }

  async initialize() {
    this.cleanup();

    if (!await this.checkPermissions()) return;
    
    const htmlFor = this.getAttribute("for");
    if (!this.validateSetup(htmlFor)) return;
    
    this.createButton();
    this.#copyBtn.addEventListener("click", this.#handleClick);
  }

  async checkPermissions() {
    try {
      if (!navigator.clipboard) {
        this.error('Clipboard API not supported');
        return false;
      }
      return true;
    } catch (error) {
      this.error('Clipboard permissions API not supported');
      return false;
    }
  }

  validateSetup(htmlFor) {
    if (htmlFor) {
      this.#targetEl = document.getElementById(htmlFor);
      if (!this.#targetEl) {
        this.error(`element not found: ${htmlFor}`);
        return false;
      }
      this.#value = this.#targetEl.innerText?.trim();
    } else {
      this.#value = this.innerText?.trim();
    }

    if (!this.#value || this.#value.length === 0) {
      this.error('no text to copy');
      return false;
    }

    return true;
  }

  createButton() {
    const wrapper = document.createElement("span");
    wrapper.classList.add("copy-clip-wrapper");

    const spacer = document.createTextNode("\u0020");
    const icon = document.createTextNode("\u2398");
    
    this.#copyBtn = document.createElement("button");
    this.#copyBtn.classList.add("copy-clip-btn");
    this.#copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    this.#copyBtn.setAttribute('title', 'Copy to clipboard');
    this.#copyBtn.appendChild(icon);

    wrapper.appendChild(spacer);
    wrapper.appendChild(this.#copyBtn);
    this.appendChild(wrapper);
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.#value);
      this.dispatchEvent(new CustomEvent("copy-clip", { 
        detail: { value: this.#value } 
      }));
    } catch (err) {
      this.error(`error writing to clipboard: ${err.message}`);
      this.dispatchEvent(new CustomEvent("copy-clip-error", { 
        detail: { error: err.message } 
      }));
    }
  }

  cleanup() {
    if (this.#copyBtn) {
      this.#copyBtn.removeEventListener("click", this.#handleClick);
      this.#copyBtn.parentElement?.remove();
    }
  }

  connectedCallback() {
    this.initialize();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  error(message) {
    console.error(`${CopyClip.COMPONENT_NAME}: ${message}`);
  }
}

if (!('customElements' in window)) {
  console.error(`${CopyClip.COMPONENT_NAME}: custom elements not supported`);
} else {
  customElements.define(CopyClip.COMPONENT_NAME, CopyClip);
}
