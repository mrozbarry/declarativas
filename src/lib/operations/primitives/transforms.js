import * as operation from '../operation';

export const translate = operation.make(
  'translate',
  (context, props) => context.translate(
    props.x,
    props.y,
  ),
);

export const rotate = operation.make(
  'rotate',
  (context, angle) => context.rotate(angle),
);

