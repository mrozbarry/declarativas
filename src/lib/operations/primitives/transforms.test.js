import test from 'ava';
import {
  translate,
  rotate,
  scale,
  setTransform,
  transform,
} from './transforms';
import { Canvas } from '../../../../support/canvas';

test('transform exec calls transform context', (t) => {
  const context = (new Canvas()).getContext('2d');

  translate.exec(context, {
    x: 100,
    y: 200,
  });

  t.is(context.translate.callCount, 1);
  t.truthy(context.translate.calledWithExactly(
    100,
    200,
  ));
});

test('rotate exec calls rotate context', (t) => {
  const context = (new Canvas()).getContext('2d');

  rotate.exec(context, {
    value: 100,
  });

  t.is(context.rotate.callCount, 1);
  t.truthy(context.rotate.calledWithExactly(
    100,
  ));
});

test('scale exec calls scale context', (t) => {
  const context = (new Canvas()).getContext('2d');

  scale.exec(context, {
    x: 300,
    y: 400,
  });

  t.is(context.scale.callCount, 1);
  t.truthy(context.scale.calledWithExactly(
    300,
    400,
  ));
});

test('setTransform exec calls setTransform context with matrix values', (t) => {
  const context = (new Canvas()).getContext('2d');

  setTransform.exec(context, {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  });

  t.is(context.setTransform.callCount, 1);
  t.truthy(context.setTransform.calledWithExactly(
    1,
    2,
    3,
    4,
    5,
    6,
  ));
});

test('setTransform exec calls setTransform context with a matrix', (t) => {
  const context = (new Canvas()).getContext('2d');
  const matrix = {};

  setTransform.exec(context, {
    matrix,
  });

  t.is(context.setTransform.callCount, 1);
  t.truthy(context.setTransform.calledWithExactly(matrix));
});

test('transform exec calls transform context with matrix values', (t) => {
  const context = (new Canvas()).getContext('2d');

  transform.exec(context, {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  });

  t.is(context.transform.callCount, 1);
  t.truthy(context.transform.calledWithExactly(
    1,
    2,
    3,
    4,
    5,
    6,
  ));
});
