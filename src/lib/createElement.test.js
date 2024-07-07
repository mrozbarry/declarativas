import test from 'ava';
import { createElement, createMutator } from './createElement.js';

test('creates a mutator', (t) => {
  t.snapshot(createMutator(function test() {}));
});

test('it creates an element', (t) => {
  const MyComponent = (props, children) => [
    createMutator(function A() {}),
    props.showB && createMutator(function B() {}),
    children,
  ];

  t.snapshot(createElement(MyComponent, { showB: false }, [
    createElement(MyComponent, { showB: true }),
  ]));
});
