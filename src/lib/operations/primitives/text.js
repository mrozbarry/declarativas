import * as operation from '../operation.js';

export const fillText = operation.make(
  'fillText',
  (context, props) => context.fillText(
    props.text,
    props.x,
    props.y,
    props.maxWidth,
  ),
);

export const strokeText = operation.make(
  'strokeText',
  (context, props) => context.strokeText(
    props.text,
    props.x,
    props.y,
    props.maxWidth,
  ),
);
