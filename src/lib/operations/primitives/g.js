import * as operation from '../operation';

export const g = operation.make(
  'g',
  ({ context, render }, _props, children) => {
    render({ context, render }, children);
  },
);
