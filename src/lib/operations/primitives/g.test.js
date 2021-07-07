import test from 'ava';
import * as sinon from 'sinon';
import { g } from './g';
import { fillStyle } from './property';
import { Canvas } from '../../../../support/canvas';

test('g groups a series of components', (t) => {
  const context = (new Canvas()).getContext('2d');
  const render = sinon.fake();

  g.exec({ context, render }, {}, [
    fillStyle.build({ value: 'foo' }),
  ]);

  t.is(render.callCount, 1);
  t.deepEqual(render.lastCall.args[0], context);
  t.deepEqual(render.lastCall.args[1], [
    fillStyle.build({ value: 'foo' }),
  ]);
});
