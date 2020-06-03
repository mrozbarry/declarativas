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
  (context, props) => context.rotate(props.value),
);

export const scale = operation.make(
  'scale',
  (context, props) => context.rotate(
    props.x,
    props.y,
  ),
);
