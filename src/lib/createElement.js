export const createElement = (fn, props, ...children) => ({ type: 'element', fn, props, children });
export const createMutator = (fn) => ({ type: 'mutator', fn });
export const createCall = (name, ...args) => ({ type: 'call', name, args });
export const createPropChange = (key, value) => ({ type: 'propChange', key, value });
