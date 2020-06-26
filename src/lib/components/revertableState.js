import { c } from '../c';

export const revertableState = (_, children) => [
  c('save'),
  children,
  c('restore'),
];
