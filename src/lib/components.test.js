import test from 'ava';
import { c } from './c';
import { Circle, Ellipse, Properties, Rect } from './components';

test('renders circle', (t) => {
  t.snapshot({
    allOptions: c(
      Circle,
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
      Circle,
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
      Ellipse,
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
      Ellipse,
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
      Properties,
      {
        imageSmoothingEnabled: false,
        globalAlpha: 0.7,
        textAlign: 'left',
      },
    ),
    withChildren: c(
      Properties,
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
      Rect,
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
