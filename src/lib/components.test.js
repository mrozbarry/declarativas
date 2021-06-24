import test from 'ava';
import { c } from './c';
import * as components from './components';

test('renders circle', (t) => {
  t.snapshot({
    allOptions: c(
      components.circle,
      {
        fill: 'fill',
        stroke: 'stroke',
        cx: 10,
        cy: 20,
        r: 30,
        pathLength: Math.PI,
      },
    ),
    fullCircle: c(
      components.circle,
      {
        fill: 'fill',
        stroke: 'stroke',
        cx: 10,
        cy: 20,
        r: 30,
      },
    ),
  });
});

test('renders ellipse', (t) => {
  t.snapshot({
    allOptions: c(
      components.ellipse,
      {
        fill: 'fill',
        stroke: 'stroke',
        cx: 10,
        cy: 20,
        rx: 30,
        ry: 40,
        pathLength: Math.PI,
      },
    ),
    fullCircle: c(
      components.ellipse,
      {
        fill: 'fill',
        stroke: 'stroke',
        cx: 10,
        cy: 20,
        rx: 30,
        ry: 40,
      },
    ),
  });
});

test('renders properties', (t) => {
  t.snapshot({
    noChildren: c(
      components.properties,
      {
        imageSmoothingEnabled: false,
        globalAlpha: 0.7,
        textAlign: 'left',
      },
    ),
    withChildren: c(
      components.properties,
      { fillStyle: 'fill' },
      [
        c('fillRect', { x: 1, y: 2, width: 3, height: 4 }),
      ],
    ),
  });
});

test('renders rect', (t) => {
  t.snapshot({
    allOptions: c(
      components.rect,
      {
        fill: 'fill',
        stroke: 'stroke',
        x: 10,
        y: 20,
        width: 30,
        height: 40,
      },
    ),
  });
});
