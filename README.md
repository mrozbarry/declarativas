# Declarativas

Declarative canvas for the browser.

## 30s Demo

```html
<canvas width="640" height="480">
  Canvas not supported
</canvas>

<script type="module">
import { app, c, effects } from 'declarativas';

const RotateRect = (state) => {
  return [
    { ...state, angle: (state.angle + 1) % 360 },
    effects.none(),
  ]
};

app({
  init: { angle: 0 },

  render: (state, canvas) => [
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

  subscribe: (state, builtIns) => [
    builtIns.onFrame(RotateRect),
  ],

  canvas: document.querySelector('canvas'),
});
</script>
```
