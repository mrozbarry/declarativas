import { c } from '../c';
import { revertableState } from './revertableState';

export const properties = (props, children) => {
  const propComponents = Object
    .keys(props)
    .map((key) => c(key, { value: props[key] }));

  if (!children || children.length === 0) return propComponents;

  return revertableState({}, propComponents);
};
