import test from 'ava';
import { Canvas } from '../../support/canvas.js';
import { Arc, ArcTo, CurveTo, DrawImage, Ellipse, ErrorBoundry, LineTo, MoveTo, Path, Properties, Property, Stateful, Text } from './components.js';
import { createMutator, createElement as h } from './createElement.js';
import { render } from './render.js';

test('can DrawImage with source region', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(DrawImage, {
      image: {},
      src: { x: 1, y: 1, w: 1, h: 1 },
      dest: { x: 0, y: 0, w: 1, h: 1 },
    }),
    context,
  );

  t.is(1, context.drawImage.callCount);
});

test('can DrawImage without source region', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(DrawImage, {
      image: {},
      dest: { x: 0, y: 0, w: 1, h: 1 },
    }),
    context,
  );

  t.is(1, context.drawImage.callCount);
});

test('can DrawImage without source region or destination size', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(DrawImage, {
      image: {},
      dest: { x: 0, y: 0 },
    }),
    context,
  );

  t.is(1, context.drawImage.callCount);
});

test('can draw a closed path', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Path, {
      isClosed: true,
      stroke: true,
    }, [
      h(MoveTo, { x: 0, y: 0 }),
      h(LineTo, { x: 10, y: 0 }),
      h(CurveTo, { controlPoints: [{ x: 5, y: 100 }], x: 10, y: 10 }),
    ]),
    context,
  );

  t.is(1, context.beginPath.callCount);
  t.is(1, context.moveTo.callCount);
  t.is(1, context.lineTo.callCount);
  t.is(1, context.closePath.callCount);
  t.is(1, context.quadraticCurveTo.callCount);
  t.is(1, context.stroke.callCount);
  t.is(0, context.fill.callCount);
});

test('CurveTo can only be quadratic or bezier', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.throws(() => {
    render(
      h(Path, {
        isClosed: true,
        stroke: true,
      }, [
        h(CurveTo, { controlPoints: [], x: 10, y: 10 }),
      ]),
      context,
    );
  });

  t.is(1, context.beginPath.callCount);
  t.is(0, context.quadraticCurveTo.callCount);
  t.is(0, context.bezierCurveTo.callCount);
});

test('path skips close if filling', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Path, {
      isClosed: true,
      fill: true,
    }, [
      h(MoveTo, { x: 0, y: 0 }),
      h(LineTo, { x: 10, y: 0 }),
      h(CurveTo, { controlPoints: [{ x: 5, y: 100 }, { x: 0, y: 0 }], x: 10, y: 10 }),
    ]),
    context,
  );

  t.is(1, context.beginPath.callCount);
  t.is(1, context.moveTo.callCount);
  t.is(1, context.lineTo.callCount);
  t.is(0, context.closePath.callCount);
  t.is(1, context.bezierCurveTo.callCount);
  t.is(1, context.fill.callCount);
  t.is(0, context.stroke.callCount);
});

test('path draws an arc', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Path, {
      stroke: true,
    }, [
      h(Arc, { x: 0, y: 0, radius: 1, startAngle: 0, endAngle: 180 }),
    ]),
    context,
  );

  t.is(1, context.beginPath.callCount);
  t.is(1, context.arc.callCount);
  t.is(1, context.stroke.callCount);
});

test('path draws an arcTo', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Path, {
      stroke: true,
    }, [
      h(ArcTo, { a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, radius: 1 }),
    ]),
    context,
  );

  t.is(1, context.beginPath.callCount);
  t.is(1, context.arcTo.callCount);
  t.is(1, context.stroke.callCount);
});

test('path draws an ellipse', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Path, {
      stroke: true,
    }, [
      h(Ellipse, { x: 0, y: 0, radiusX: 1, radiusY: 1, rotation: 0, startAngle: 0, endAngle: 1 }),
    ]),
    context,
  );

  t.is(1, context.beginPath.callCount);
  t.is(1, context.ellipse.callCount);
  t.is(1, context.stroke.callCount);
});

test('draws text', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Text, {
      text: 'Hello World',
    }),
    context,
  );

  t.is(1, context.fillText.callCount);
  t.deepEqual(['Hello World', 0, 0], context.fillText.getCall(0).args);
});

test('draws text at a position', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Text, {
      text: 'Hello World',
      x: 1, y: 2,
    }),
    context,
  );

  t.is(1, context.fillText.callCount);
  t.deepEqual(['Hello World', 1, 2], context.fillText.getCall(0).args);
});

test('draws text at a position and limits width', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Text, {
      text: 'Hello World',
      x: 1, y: 2,
      maxWidth: 100,
    }),
    context,
  );

  t.is(1, context.fillText.callCount);
  t.deepEqual(['Hello World', 1, 2, 100], context.fillText.getCall(0).args);
});

test('uses save and restore states to prevent leaking changes', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Stateful, {}, [
      h(Property, { key: 'fillStyle', value: 'blue' }),
    ]),
    context,
  );

  t.is(1, context.save.callCount);
  t.is('blue', context.fillStyle);
  t.is(1, context.restore.callCount);
});

test('does not save a property that does not exist in canvas', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Property, { key: 'taco', value: 'blue' }),
    context,
  );

  t.false('taco' in context);
});

test('can mass set properties', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(Properties, {
      fillStyle: 'blue',
      strokeStyle: 'yellow',
    }),
    context,
  );

  t.is('blue', context.fillStyle);
  t.is('yellow', context.strokeStyle);
});

test('can catch errors', (t) => {
  const context = (new Canvas()).getContext('2d');

  render(
    h(ErrorBoundry, {
      onError: (err) => {
        return [
          h(Properties, { fillStyle: 'green' }),
        ];
      },
    }, [
      createMutator(ctx => ctx.thisFunctionDoesNotExist()),
    ]),
    context,
  );

  t.is('green', context.fillStyle);
});
