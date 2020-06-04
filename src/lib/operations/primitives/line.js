import * as operation from '../operation';

export const setLineDash = operation.make(
  'setLineDash',
  (context, props) => context.setLineDash(
    props.segments,
  ),
);
