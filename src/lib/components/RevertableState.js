import { c } from '../c';

export const RevertableState = (_, children) => [
  c('save'),
  children,
  c('restore'),
];
