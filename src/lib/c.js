import { primitives } from './operations/index';

export const c = (functionOrName, props, ...children) => {
  if (typeof functionOrName === 'function') {
    return functionOrName(props, children);
  }
  try {
    const descriptor = primitives[functionOrName];
    return descriptor.build(props, children);
  } catch (err) {
    const error = new TypeError(`Unable to build ${functionOrName} primitive`);
    error.source = err;
    throw error;
  }
};
