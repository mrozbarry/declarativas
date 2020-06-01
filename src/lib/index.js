import { primitives } from './operations/index';
import { render } from './render';

const c = (functionOrName, props, children) => {
  if (typeof functionOrName === 'function') {
    return functionOrName(props, children);
  }
  try {
    const descriptor = primitives[functionOrName];
    return descriptor.build(props, children);
  } catch (err) {
    console.error(`Unable to run primitive: ${functionOrName}`);
    console.error(err);
    throw err;
  }
};

export {
  render,
  c,
};

