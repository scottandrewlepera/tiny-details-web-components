class PasswordReveal extends HTMLElement {
  static COMPONENT_NAME = "password-reveal";
  #passwordEl;
  #checkbox;
  #label;
  #handleChange;
  
  constructor() {
    super();
    this.#handleChange = this.togglePassword.bind(this);
  }
  
  initialize() {
    this.cleanup();  // Remove existing checkbox and listeners
    
    const htmlFor = this.getAttribute("for");
    if (!this.validateSetup(htmlFor)) return;
    
    this.createCheckbox();
    this.#checkbox.addEventListener("change", this.#handleChange);
  }
  
  validateSetup(htmlFor) {
    if (!htmlFor) {
      this.error("'for' attribute is required.");
      return false;
    }
    
    this.#passwordEl = document.getElementById(htmlFor);
    if (!this.#passwordEl) {
      this.error(`element not found: ${htmlFor}`);
      return false;
    }
    
    if (this.#passwordEl.tagName.toLowerCase() !== 'input' ||
        this.#passwordEl.type !== 'password') {
      this.error('target element must be a password input');
      return false;
    }
    
    return true;
  }
  
  createCheckbox() {
    // Create wrapper for checkbox and label
    const wrapper = document.createElement("span");
    wrapper.classList.add("password-reveal-wrapper");

    // Create checkbox
    this.#checkbox = document.createElement("input");
    this.#checkbox.type = "checkbox";
    this.#checkbox.id = `reveal-${this.#passwordEl.id}`;
    this.#checkbox.classList.add("password-reveal-checkbox");
    
    // Create label
    this.#label = document.createElement("label");
    this.#label.htmlFor = this.#checkbox.id;
    this.#label.classList.add("password-reveal-label");
    this.#label.textContent = "Show password";
    
    // Add to wrapper
    wrapper.appendChild(this.#checkbox);
    wrapper.appendChild(this.#label);
    this.appendChild(wrapper);
  }
  
  togglePassword() {
    this.#passwordEl.type = this.#checkbox.checked ? "text" : "password";
    this.#label.textContent = this.#checkbox.checked ? "Hide password" : "Show password";
  }
  
  cleanup() {
    if (this.#checkbox) {
      this.#checkbox.removeEventListener("change", this.#handleChange);
      this.#checkbox.parentElement?.remove();
    }
  }
  
  connectedCallback() {
    this.initialize();
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  error(message) {
    console.error(`${PasswordReveal.COMPONENT_NAME}: ${message}`);
  }
}

if (!('customElements' in window)) {
  console.error(`${PasswordReveal.COMPONENT_NAME}: custom elements not supported`);
} else {
  customElements.define(PasswordReveal.COMPONENT_NAME, PasswordReveal);
}
