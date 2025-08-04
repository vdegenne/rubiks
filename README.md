# @vdegenne/rubiks

Rubik's cube wrapper web component built around the awesome rubik's cube web component [web-cube](https://github.com/MrAxf/web-cube).
This wrapper aims to provide additional features such as keyboard listeners for the motions, better methods (e.g. `u()`, `f()`, ... in line with the official notations), motion sequences and more :D
Also this framework uses [Lit](https://lit.dev/) in the background which helps with maintainability.

## Usage

```js
import '@vdegenne/rubiks'
```

in HTML

```html
<rubiks-element></rubiks-element>
```

By default the element takes the size of the container, e.g.

```html
<div style="width:200px;height:200px;">
	<!-- size: 200px; -->
	<rubiks-element></rubiks-element>
</div>
```

If you want to force the element size directly, use this syntax:

```html
<div id="rubiks-list">
	<rubiks-element style="width:200px;height:200px;"></rubiks-element>
	<rubiks-element style="width:200px;height:200px;"></rubiks-element>
	<rubiks-element style="width:200px;height:200px;"></rubiks-element>
	<rubiks-element style="width:200px;height:200px;"></rubiks-element>
</div>
```
