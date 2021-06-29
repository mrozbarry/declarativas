import test from 'ava';
import { c } from './c';
import { Circle, Ellipse, Properties, Rect } from './components';
import {RevertableState} from './components/RevertableState';
import {Shadow} from './components/Shadow';

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

test('renders revertable state', (t) => {
  t.snapshot({
    child: c(
      RevertableState,
      {},
      c('rect', { x: 0, y: 0, width: 1, height: 1 })
    ),
    children: c(
      RevertableState,
      {},
      [
        c('fillStyle', { value: 'blue' }),
        c('fillRect', { x: 0, y: 0, width: 1, height: 1 })
      ],
    ),
  });
});

test('renders shadow', (t) => {
  t.snapshot({
    allOptions: c(
      Shadow,
      {
        blur: 5,
        color: '#f0f',
        offset: { x: 1, y: 1 },
      },
    ),
    noOffset: c(
      Shadow,
      {
        blur: 5,
        color: '#f0f',
      },
    ),
  });
});
