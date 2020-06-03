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

export const closePath = operation.make(
  'closePath',
  (context) => context.closePath(),
);

export const stroke = operation.make(
  'stroke',
  (context) => context.stroke(),
);

export const fill = operation.make(
  'fill',
  (context) => context.fill(),
);
