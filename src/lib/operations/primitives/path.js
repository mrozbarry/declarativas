import * as operation from '../operation';

export const beginPath = operation.make(
  'beginPath',
  (context) => context.beginPath(),
);

export const moveTo = operation.make(
  'moveTo',
  (context, props) => context.moveTo(props.x, props.y),
);

export const lineTo = operation.make(
  'lineTo',
  (context, props) => context.lineTo(props.x, props.y),
);

export const arc = operation.make(
  'arc',
  (context, props) => context.arcTo(
    props.x,
    props.y,
    props.radius,
    props.startAngle,
    props.endAngle,
    props.anticlockwise || false,
  ),
);

export const arcTo = operation.make(
  'arcTo',
  (context, props) => context.arcTo(
    props.controlPointA.x,
    props.controlPointA.y,
    props.controlPointB.x,
    props.controlPointB.y,
    props.radius,
  ),
);

export const ellipse= operation.make(
  'ellipse',
  (context, props) => context.ellipse(
    props.x,
    props.y,
    props.radiusX,
    props.radiusY,
    props.rotation,
    props.startAngle,
    props.endAngle,
    props.anticlockwise || false,
  ),
);

export const bezierCurveTo = operation.make(
  'bezierCurveTo',
  (context, props) => context.bezierCurveTo(
    props.controlPointA.x,
    props.controlPointA.y,
    props.controlPointB.x,
    props.controlPointB.y,
    props.x,
    props.y,
  ),
);

export const quadraticCurveTo = operation.make(
  'quadraticCurveTo',
  (context, props) => context.bezierCurveTo(
    props.controlPoint.x,
    props.controlPoint.y,
    props.x,
    props.y,
  ),
);

export const rect = operation.make(
  'rect',
  (context, props) => context.rect(
    props.x,
    props.y,
    props.width,
    props.height,
  ),
);

export const drawFocusIfNeeded = operation.make(
  'drawFocusIfNeeded',
  (context, props) => props.element && props.path
    ? context.drawFocusIfNeeded(props.path, props.element)
    : context.drawFocusIfNeeded(props.element)
);

export const closePath = operation.make(
  'closePath',
  (context) => context.closePath(),
);

export const clip = operation.make(
  'clip',
  (context) => context.clip(),
);

export const stroke = operation.make(
  'stroke',
  (context) => context.stroke(),
);

export const fill = operation.make(
  'fill',
  (context) => context.fill(),
);
