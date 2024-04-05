# Declarativas

Declarative canvas for the browser.

[<img src="https://img.shields.io/npm/v/declarativas?style=flat-square" alt="Npm" />](https://www.npmjs.com/package/declarativas)

## Why use declarativas?

### Component driven

Just like Angular, React, Vue, and others, write components with properties.

<details>
<summary>Here's an example of a `<Text>` component</summary>

```jsx
/** jsx c */

import { render, c } from 'declarativas';

// Component to render text in a more compact way
const Text = ({ font = '16px sans-serif', fill, stroke, align = 'left', valign = 'alphabetic', strokeWidth = 1, x = 0, y = 0 }, string) => [
  c('save'),

  fill && c('fillStyle', { value: fill }),
  stroke && c('strokeStyle', { value: stroke }),
  stroke && c('lineWidth', { value: strokeWidth })

  c('font', { value: font }),
  c('textAlign', { value: align }),
  c('textBaseline', { value: valign }),

  fill && c('fillText', { text: string, x, y }),
  stroke && c('strokeText', { text: string, x, y }),
  
  c('restore'),
];

// Basic rendering
render(
  context2d,
  [
    Text({ valign: 'top', fill: 'black' }, 'Hello world'),
  ],
);

// Or with JSX
render(
  context2d,
  [
    <Text valign="top" fill="black">{'Hello world'}</Text>
  ],
);
```

</details>

<details>
<summary>Or here's a component that reverts the state changes you make in child components</summary>

```jsx
/** jsx c */

import { render, c } from 'declarativas';

// Component to render text in a more compact way
const Stateful = (props, children) => [
  c('save'),
  children,
  c('restore'),
];

// Basic rendering
render(
  context2d,
  [
    // globally translate drawing options by x=100, y=30
    c('translate', { x: 100, y: 30 }),

    // globally set the fill style to red
    c('fillStyle', { value: 'red' }),

    Stateful({}, [
      // add an additional 20 units in each direction, x=120, y=50
      c('translate', { x: 20, y: 20 }),

      // change global fill style to black
      c('fillStyle', { value: 'black' }),
      // Draw rectangle starting at x=120, y=50
      c('fillRect', { x: 0, y: 0, width: 10, height: 10 }),
    ]),

    // back to translated x=100, y=30
    // fill style also reverts to 'red'
    // Draw rectangle starting at x=100, y=30
    c('fillRect', { x: 0, y: 0, width: 10, height: 10 }),
  ],
);

// Or with JSX
render(
  context2d,
  [
    <translate x={100} y={30} />,
    <fillStyle value="red" />,
    <Stateful>
      <translate x={20} y={20} />
      <fillStyle value='black' />
      <fillRect x={0} y={0} width={10} height={10} />
    </Stateful>,
    <fillRect x={0} y={0} width={10} height={10} />,
  ],
);
```

I find myself using `Stateful` a lot in my applications, even wrapping the entire render tree in it so my next render always starts in a predictable state.
</details>

### JSX compatible

Again, popular frameworks have really pushed to using JSX or similar setups (like Vue's templates).
JSX, or generally XML structure, makes it very easy to visualize the render heirarchy, and given the stateful nature of canvas, will also make it easy to know the current state your components are rendering to.

You can enable JSX using `jsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "c"
  }
}
```

or as a pragma comment:

```jsx
/** jsx c */

import { c } from 'declarativas';
```

### Write heirarchy-driven rendering

So much of canvas rendering is dependent on the current context state.
While there can be many ways to organize your canvas-rendering code, the nature of components and heirarchy will naturally organize your code in a way that makes state clear.

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
