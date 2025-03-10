# Password Reveal

A custom web component that adds a "show password" checkbox to password input fields.

## Features

- Toggle password visibility with a checkbox
- Works with any password input field
- No dependencies

## Demo

See the demo [here](../docs/password-reveal.md).

## Installation

Include the component in your HTML:

```html
<script src="path/to/password-reveal.js" type="module"></script>
```

## Usage

### Basic Usage

Add the component after any password input:

```html
<input type="password" id="password">
<password-reveal for="password"></password-reveal>
```

## Events

The component has no custom events.

## Styling

The component includes minimal default styling. Override these classes for custom styling:

```css
.password-reveal-wrapper {
  /* Wrapper around checkbox and label */
}

.password-reveal-checkbox {
  /* The checkbox input */
}

.password-reveal-label {
  /* The "Show password" label */
}
```

## Browser Support

Requires browsers that support:
- Custom Elements v1
- ES2017+ features

## Examples

### Registration Form

```html
<form>
  <div class="form-group">
    <input type="password" id="new-password">
    <password-reveal for="new-password"></password-reveal>
  </div>
  <div class="form-group">
    <input type="password" id="confirm-password">
    <password-reveal for="confirm-password"></password-reveal>
  </div>
</form>
```

## Troubleshooting

If the checkbox doesn't appear:
1. Ensure the component script is properly loaded
2. Check browser console for errors
3. Verify the password input has an ID attribute
4. Confirm the input type is "password"
5. Confirm browser supports required features
