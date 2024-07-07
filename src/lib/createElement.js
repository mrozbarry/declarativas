export const createElement = (fn, props, children = []) => ({ type: 'element', fn, props, children });
export const createMutator = (fn) => ({ type: 'mutator', fn });
