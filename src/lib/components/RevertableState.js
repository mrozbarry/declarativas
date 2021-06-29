import { c } from '../c';

export const RevertableState = (_, children) => [
  c('save'),
  ...(Array.isArray(children) ? children : [children]),
  c('restore'),
];
