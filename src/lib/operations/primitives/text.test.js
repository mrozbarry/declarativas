import test from 'ava';
import { fillText, strokeText } from './text';
import { Canvas } from '../../../../support/canvas';

test('fillText exec calls fillText context', (t) => {
  const context = (new Canvas()).getContext('2d');

  fillText.exec({ context }, {
    text: 'foo',
    x: 100,
    y: 200,
    maxWidth: 500,
  });

  t.is(context.fillText.callCount, 1);
  t.truthy(context.fillText.calledWithExactly(
    'foo',
    100,
    200,
    500,
  ));
});

test('strokeText exec calls strokeText context', (t) => {
  const context = (new Canvas()).getContext('2d');

  strokeText.exec({ context }, {
    text: 'foo',
    x: 100,
    y: 200,
    maxWidth: 500,
  });

  t.is(context.strokeText.callCount, 1);
  t.truthy(context.strokeText.calledWithExactly(
    'foo',
    100,
    200,
    500,
  ));
});
