import * as operation from './operation';

export const save = operation.make(
  'save',
  ({ context }) => context.save(),
);

export const restore = operation.make(
  'restore',
  ({ context }) => context.restore(),
);
