# Max Character Counter

A custom web component that adds a dynamic character counter to input elements with maxlength limits.

## Features

- Automatically counts remaining characters
- Visual warning when approaching limit
- Works with any input or textarea element
- No dependencies

## Installation

Include the component in your HTML:

```html
<script src="path/to/max-character-counter.js"></script>
```

## Usage

### Basic Usage

Add the component after any input element with a maxlength attribute:

```html
<textarea id="myTextarea" maxlength="500"></textarea>
<max-char-counter for="myTextarea"></max-char-counter>
```

## Events

The component updates automatically as the user types. No custom events are dispatched.

## Styling

The component includes minimal default styling. Override these classes for custom styling:

```css
.max-char-counter {
  /* The counter display */
}

.max-char-counter-warning {
  /* Applied when approaching character limit */
}
```

## Browser Support

Requires browsers that support:
- Custom Elements v1
- ES2017+ features

## Examples

### Basic Input

```html
<div class="form-group">
  <input type="text" id="title" maxlength="50">
  <max-char-counter for="title"></max-char-counter>
</div>
```

### Large Text Area

```html
<div class="form-group">
  <textarea id="description" maxlength="1000"></textarea>
  <max-char-counter for="description"></max-char-counter>
</div>
```

## Troubleshooting

If the counter doesn't appear:
1. Ensure the component script is properly loaded
2. Check browser console for errors
3. Verify the referenced element exists and has a maxlength attribute
4. Confirm browser supports required features
