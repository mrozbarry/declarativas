import test from 'ava';
import { render } from './render.js';
import { Canvas } from '../../support/canvas.js';
import { createElement, createMutator } from './createElement.js';

test('it renders nothing', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render([], context);
  });
});

test('can render a mutator', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render([
      createMutator(function setFillStyle(ctx) {
        ctx.fillStyle = 'foo';
      }),
    ], context);
  });

  t.is(context.fillStyle, 'foo');
});

test('can render an element', (t) => {
  const context = (new Canvas()).getContext('2d');

  const MyComponent = (props) => [
    createMutator(function setFillStyle(ctx) {
      ctx.fillStyle = props.value;
    }),
  ];

  t.notThrows(() => {
    render([
      createElement(MyComponent, { value: 'green' }),
    ], context);
  });

  t.is(context.fillStyle, 'green');
});

test('can render deep nested components', (t) => {
  const context = (new Canvas()).getContext('2d');

  const FillComponent = (props, children) => [
    createMutator(function setFillStyle(ctx) {
      ctx.fillStyle = props.value;
    }),
    children,
  ];

  const StrokeComponent = (props, children) => [
    createMutator(function setFillStyle(ctx) {
      ctx.strokeStyle = props.value;
    }),
    children,
  ];

  t.notThrows(() => {
    render([
      createElement(FillComponent, { value: 'blue' }, [
        createElement(FillComponent, { value: 'black' }, [
          createElement(StrokeComponent, { value: 'orange' }, [
          ]),
        ]),
      ]),
    ], context);
  });

  t.is(context.fillStyle, 'black');
  t.is(context.strokeStyle, 'orange');
});
