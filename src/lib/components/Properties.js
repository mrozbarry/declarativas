import { c } from '../c';
import { RevertableState } from './RevertableState';

export const Properties = (props, children) => {
  const propComponents = Object
    .keys(props)
    .map((key) => c(key, { value: props[key] }));

  if (!children || children.length === 0) return propComponents;

  return RevertableState({}, propComponents);
};
