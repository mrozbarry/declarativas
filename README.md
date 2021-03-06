# Declarativas

Declarative canvas for the browser.

[<img src="https://img.shields.io/npm/v/declarativas?style=flat-square" alt="Npm" />](https://www.npmjs.com/package/declarativas)

## Quick Demo

```html
<canvas width="640" height="480">
  Canvas not supported
</canvas>

<script type="module">
import { render, c } from 'declarativas';

render(
  canvas.getContext('2d'),
  [
    c('save'),
    c('clearRect', {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    }),
    c('rotate', state.angle * Math.PI / 180),
    c('strokeStyle', '#000'),
    c('rect', {
      x: 100,
      y: 100,
      width: 20,
      height: 20,
    })
    c('restore'),
  ]),
);
</script>
```

## More holistic demo

[Demo](./src/demo) source is probably the more interactive demo currently.

## Other Resources

 - [Declarativas Example Collection on CodePen.io](https://codepen.io/collection/nxpMVd)
