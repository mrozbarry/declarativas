import test from 'ava';
import { setLineDash } from './line';
import { Canvas } from '../../../../support/canvas';

test('setLineDash primitive calls setLineDash context', (t) => {
  const context = (new Canvas()).getContext('2d');
  const segments = [3, 3, 3, 3, 20, 3, 3, 3, 3];

  setLineDash.exec({ context }, {
    segments,
  });

  t.is(context.setLineDash.callCount, 1);
  t.truthy(context.setLineDash.calledWithExactly(segments));
});

