import * as operation from '../operation';

export const beginPath = () => operation.make(
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
