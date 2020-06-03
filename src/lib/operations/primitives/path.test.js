import test from 'ava';
import {
  beginPath,
  moveTo,
  lineTo,
  arcTo,
  closePath,
  stroke,
  fill,
} from './path';
import { Canvas } from '../../../../support/canvas';

test('beginPath exec calls beginPath context', (t) => {
  const context = (new Canvas()).getContext('2d');

  beginPath.exec(context);

  t.is(context.beginPath.callCount, 1);
});

test('moveTo exec calls moveTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  moveTo.exec(context, {
    x: 100,
    y: 200
  });

  t.is(context.moveTo.callCount, 1);
  t.truthy(context.moveTo.calledWithExactly(100, 200));
});

test('lineTo exec calls lineTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  lineTo.exec(context, {
    x: 100,
    y: 200
  });

  t.is(context.lineTo.callCount, 1);
  t.truthy(context.lineTo.calledWithExactly(100, 200));
});

test('arcTo exec calls arcTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  arcTo.exec(context, {
    controlPointA: {
      x: 100,
      y: 200
    },
    controlPointB: {
      x: 300,
      y: 400,
    },
    radius: 500,
  });

  t.is(context.arcTo.callCount, 1);
  t.truthy(context.arcTo.calledWithExactly(
    100,
    200,
    300,
    400,
    500,
  ));
});

test('closePath exec calls closePath context', (t) => {
  const context = (new Canvas()).getContext('2d');

  closePath.exec(context);

  t.is(context.closePath.callCount, 1);
});

test('stroke exec calls stroke context', (t) => {
  const context = (new Canvas()).getContext('2d');

  stroke.exec(context);

  t.is(context.stroke.callCount, 1);
});

test('fill exec calls fill context', (t) => {
  const context = (new Canvas()).getContext('2d');

  fill.exec(context);

  t.is(context.fill.callCount, 1);
});
