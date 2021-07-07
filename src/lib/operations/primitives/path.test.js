import test from 'ava';
import * as sinon from 'sinon';
import {
  beginPath,
  moveTo,
  lineTo,
  arc,
  arcTo,
  ellipse,
  bezierCurveTo,
  quadraticCurveTo,
  rect,
  drawFocusIfNeeded,
  closePath,
  clip,
  stroke,
  fill,
} from './path';
import { Canvas } from '../../../../support/canvas';

test('beginPath exec calls beginPath context', (t) => {
  const context = (new Canvas()).getContext('2d');

  beginPath.exec({ context });

  t.is(context.beginPath.callCount, 1);
});

test('moveTo exec calls moveTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  moveTo.exec({ context }, {
    x: 100,
    y: 200
  });

  t.is(context.moveTo.callCount, 1);
  t.truthy(context.moveTo.calledWithExactly(100, 200));
});

test('lineTo exec calls lineTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  lineTo.exec({ context }, {
    x: 100,
    y: 200
  });

  t.is(context.lineTo.callCount, 1);
  t.truthy(context.lineTo.calledWithExactly(100, 200));
});

test('arc exec calls arc context', (t) => {
  const context = (new Canvas()).getContext('2d');

  arc.exec({ context }, {
    x: 100,
    y: 200,
    radius: 500,
    startAngle: 0,
    endAngle: 1,
  });

  t.is(context.arc.callCount, 1);
  t.truthy(context.arc.calledWithExactly(100, 200, 500, 0, 1, false));
});

test('arc defaults endAngle to TWO_PI', (t) => {
  const context = (new Canvas()).getContext('2d');

  arc.exec({ context }, {
    x: 100,
    y: 200,
    radius: 500,
    startAngle: 0,
  });

  t.is(context.arc.callCount, 1);
  t.truthy(context.arc.calledWithExactly(100, 200, 500, 0, Math.PI * 2, false));
});

test('arcTo exec calls arcTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  arcTo.exec({ context }, {
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

test('ellipse exec calls ellipse context', (t) => {
  const context = (new Canvas()).getContext('2d');

  ellipse.exec({ context }, {
    x: 100,
    y: 200,
    radius: { x: 500, y: 501 },
    rotation: 2,
    startAngle: 0,
    endAngle: 1,
  });

  t.is(context.ellipse.callCount, 1);
  t.truthy(context.ellipse.calledWithExactly(100, 200, 500, 501, 2, 0, 1, false));
});

test('ellipse defaults rotation to 0, and endAngle to TWO_PI', (t) => {
  const context = (new Canvas()).getContext('2d');

  ellipse.exec({ context }, {
    x: 100,
    y: 200,
    radius: { x: 500, y: 501 },
    startAngle: 0.5,
  });

  t.is(context.ellipse.callCount, 1);
  t.truthy(context.ellipse.calledWithExactly(100, 200, 500, 501, 0, 0.5, Math.PI * 2, false));
});

test('bezierCurveTo exec calls bezierCurveTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  bezierCurveTo.exec({ context }, {
    controlPointA: {
      x: 100,
      y: 200
    },
    controlPointB: {
      x: 300,
      y: 400,
    },
    x: 1,
    y: 2,
  });

  t.is(context.bezierCurveTo.callCount, 1);
  t.truthy(context.bezierCurveTo.calledWithExactly(
    100,
    200,
    300,
    400,
    1,
    2,
  ));
});

test('quadraticCurveTo exec calls quadraticCurveTo context', (t) => {
  const context = (new Canvas()).getContext('2d');

  quadraticCurveTo.exec({ context }, {
    controlPoint: {
      x: 100,
      y: 200
    },
    x: 1,
    y: 2,
  });

  t.is(context.quadraticCurveTo.callCount, 1);
  t.truthy(context.quadraticCurveTo.calledWithExactly(
    100,
    200,
    1,
    2,
  ));
});

test('rect exec calls rect context', (t) => {
  const context = (new Canvas()).getContext('2d');

  rect.exec({ context }, {
    x: 1,
    y: 2,
    width: 3,
    height: 4,
  });

  t.is(context.rect.callCount, 1);
  t.truthy(context.rect.calledWithExactly(
    1,
    2,
    3,
    4,
  ));
});

test('drawFocusIfNeeded exec calls drawFocusIfNeeded context', (t) => {
  const context = (new Canvas()).getContext('2d');
  const path = {};
  const element = {};

  drawFocusIfNeeded.exec({ context }, {
    path,
    element,
  });

  t.is(context.drawFocusIfNeeded.callCount, 1);
  t.truthy(context.drawFocusIfNeeded.calledWithExactly(
    path,
    element,
  ));
});

test('drawFocusIfNeeded exec calls drawFocusIfNeeded context without path', (t) => {
  const context = (new Canvas()).getContext('2d');
  const element = {};

  drawFocusIfNeeded.exec({ context }, {
    element,
  });

  t.is(context.drawFocusIfNeeded.callCount, 1);
  t.truthy(context.drawFocusIfNeeded.calledWithExactly(
    element,
  ));
});

test('closePath exec calls closePath context', (t) => {
  const context = (new Canvas()).getContext('2d');

  closePath.exec({ context });

  t.is(context.closePath.callCount, 1);
});

test('clip exec calls clip context', (t) => {
  const context = (new Canvas()).getContext('2d');

  clip.exec({ context });

  t.is(context.clip.callCount, 1);

  const path = {};

  clip.exec({ context }, { path, rule: 1 });
  t.truthy(context.clip.calledWithExactly(path, 1));

  clip.exec({ context }, { rule: 1 });
  t.truthy(context.clip.calledWithExactly(1));
});

test('stroke exec calls stroke context', (t) => {
  const context = (new Canvas()).getContext('2d');

  stroke.exec({ context });

  t.is(context.stroke.callCount, 1);

  const path = {};

  stroke.exec({ context }, { path, rule: 1 });
  t.truthy(context.stroke.calledWithExactly(path, 1));

  stroke.exec({ context }, { rule: 1 });
  t.truthy(context.stroke.calledWithExactly(1));
});

test('fill exec calls fill context', (t) => {
  const context = (new Canvas()).getContext('2d');

  fill.exec({ context });

  t.is(context.fill.callCount, 1);

  const path = {};

  fill.exec({ context }, { path, rule: 1 });
  t.truthy(context.fill.calledWithExactly(path, 1));

  fill.exec({ context }, { rule: 1 });
  t.truthy(context.fill.calledWithExactly(1));
});
