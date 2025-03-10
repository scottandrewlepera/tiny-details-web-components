# Copy to Clipboard

A custom web component that adds a "copy to clipboard" button to any text element on your page.

## Features

- Copy text from any element with a single click
- Works with both inline text and referenced elements
- Custom event support for integration
- No dependencies

## Installation

Include the component script in your HTML:

```html
<script src="path/to/copy-to-clipboard.js"></script>
```

## Usage

### Basic Usage

Enclose the text you want to make copyable with a `copy-clip` element:

```html
<copy-clip>Here's some text to copy</copy-clip>
```

### Reference Mode

Use the `for` attribute to copy text from another element:

```html
<pre id="code-block">const greeting = "Hello, World!";</pre>
<copy-clip for="code-block"></copy-clip>
```

## Events

The component dispatches two custom events:

- `copyclip`: Fired when text is successfully copied
- `copyclip-error`: Fired when copying fails

### Event Handling

```javascript
const copyClip = document.querySelector('copy-clip');

copyClip.addEventListener('copyclip', (e) => {
  console.log('Copied:', e.detail.value);
});

copyClip.addEventListener('copyclip-error', (e) => {
  console.error('Copy failed:', e.detail.error);
});
```

## Styling

The component includes minimal default styling. Override these classes for custom styling:

```css
.copy-clip-wrapper {
  /* Wrapper around the button */
}

.copy-clip-btn {
  /* The copy button itself */
}
```

## Browser Support

Requires browsers that support:
- Custom Elements v1
- Clipboard API
- ES2017+ features

## Examples

### Copy Code Block

```html
<pre id="example-code">
  function hello() {
    console.log("Hello, World!");
  }
</pre>
<copy-clip for="example-code"></copy-clip>
```

### Inline Copy

```html
<p>API Key: <copy-clip>abcdef0123456</copy-clip></p>
```

## Troubleshooting

If the copy button doesn't appear:
1. Ensure the component script is properly loaded
2. Check browser console for errors
3. Verify the referenced element exists (when using `for` attribute)
4. Confirm browser supports required features
