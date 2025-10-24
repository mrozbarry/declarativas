import { createCall, createElement, createMutator, createPropChange } from './createElement.js';
import { render } from './render.js';

const numberOr = (value, fallback) => (
  typeof value === 'number' ? value : fallback
);

/**
 * @param {{
 *   image: ImageData,
 *   src: null|{x:number, y:number, w:number, h:number},
 *   dest:null|{x:number, y:number, w:null|number, h:null|number}
 * }} props
 * @return {object}
 */
export const DrawImage = (props) => (
  props.src
    ? createCall('drawImage',
      props.image,
      props.src.x,
      props.src.y,
      props.src.w,
      props.src.h,
      props.dest.x,
      props.dest.y,
      props.dest.w,
      props.dest.h
    )
    : createCall('drawImage',
      props.image,
      props.dest.x,
      props.dest.y,
      numberOr(props.dest.w, props.image.width),
      numberOr(props.dest.h, props.image.height),
    )
);

export const FillRect = ({ x, y, w, h }) => createCall('fillRect', x, y, w, h);
export const StrokeRect = ({ x, y, w, h }) => createCall('strokeRect', x, y, w, h);

/**
 * @params {{
 *   isClosed: bool,
 *   fill: bool,
 *   stroke: bool,
 * }} props
 * @params {array} children
 */
export const Path = (props, children) => [
  createCall('beginPath'),
  children,
  (props.isClosed && !props.fill) && createCall('closePath'),
  props.fill && createCall('fill'),
  props.stroke && createCall('stroke'),
];

export const MoveTo = ({ x, y }) => createCall('moveTo', x, y);
export const LineTo = ({ x, y }) => createCall('lineTo', x, y);
export const Rect = ({ x, y, w, h }) => createCall('rect', x, y, w, h);
export const RoundRect = ({ x, y, w, h, radii }) => createCall('roundRect', x, y, w, h, radii);
export const Arc = ({ x, y, radius, startAngle, endAngle, counterClockwise = false }) => createCall(
  'arc',
  x, y,
  radius,
  startAngle, endAngle,
  counterClockwise,
);
export const ArcTo = ({ a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, radius }) => createCall('arcTo', x1, y1, x2, y2, radius);
/** @param {array<{x, y}>} controlPoints */
export const CurveTo = ({ controlPoints, x, y }) => {
  switch (controlPoints.length) {
  case 1: return createCall('quadraticCurveTo',
    controlPoints[0].x, controlPoints[0].y,
    x, y,
  );
  case 2: return createCall('bezierCurveTo',
    controlPoints[0].x, controlPoints[0].y,
    controlPoints[1].x, controlPoints[1].y,
    x, y
  );
  default: throw new RangeError('CurveTo must have either 1 control points (Quadratic) or 2 (Bezier)');
  }
};
export const Ellipse = ({ x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise = false }) => createCall('ellipse', x, y,
  radiusX, radiusY,
  rotation,
  startAngle, endAngle,
  counterclockwise,
);

export const Text = ({ text, x = 0, y = 0, maxWidth }) => maxWidth
  ? createCall('fillText', text, x, y, maxWidth)
  : createCall('fillText', text, x, y);

export const ClearRect = ({ x, y, w, h }) => createCall('clearRect', x, y, w, h);
export const ClearCanvas = () => createMutator(ctx => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height));

export const Translate = ({ x = 0, y = 0 }) => createCall('translate', x, y);
export const Rotate = ({ angle }) => createCall('rotate', angle);
export const Scale = ({ x, y }) => createCall('scale', x, y);
export const Transform = ({ a, b, c, d, e, f }) => createCall('transform', a, b, c, d, e, f);

export const Stateful = (_props, children) => [
  createCall('save'),
  children,
  createCall('restore'),
];

export const Property = ({ key, value }) => createPropChange(key, value);
export const Properties = (props) => Object
  .keys(props)
  .map(key => createElement(Property, { key, value: props[key] }));

export const ErrorBoundary = ({ onError }, children) => createMutator(ctx => {
  try {
    return render(children, ctx);
  } catch (err) {
    return onError(err);
  }
});

export const Group = (_props, children) => children;
