import test from 'ava';
import { clearRect, fillRect, strokeRect } from './rect';
import { Canvas } from '../../../../support/canvas'

test('clearRect exec runs clearRect context', (t) => {
  const context = (new Canvas()).getContext('2d');

  clearRect.exec({ context }, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  t.is(context.clearRect.callCount, 1);
  t.truthy(context.clearRect.calledWithExactly(0, 0, 100, 100));
});

test('fillRect exec runs fillRect context', (t) => {
  const context = (new Canvas()).getContext('2d');

  fillRect.exec({ context }, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  t.is(context.fillRect.callCount, 1);
  t.truthy(context.fillRect.calledWithExactly(0, 0, 100, 100));
});

test('strokeRect exec runs strokeRect context', (t) => {
  const context = (new Canvas()).getContext('2d');

  strokeRect.exec({ context }, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  t.is(context.strokeRect.callCount, 1);
  t.truthy(context.strokeRect.calledWithExactly(0, 0, 100, 100));
});
