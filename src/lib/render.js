import { primitives } from './operations/index';

export const render = (context, nodes) => {
  if (!nodes || nodes.length === 0) {
    console.log('no nodes');
    return;
  }

  let node;
  let op;

  for (node of nodes) {
    if (!node) continue;

    if (Array.isArray(node)) {
      render(context, node);
      continue;
    } else if (typeof node.type === 'function') {
      render(context, node.type(node.props, node.children));
      continue;
    }

    try {
      op = primitives[node.type];
      op.exec(
        context,
        node.props,
      );
    } catch (exception) {
      console.warn('Unable to render', node.value);
      throw exception;
    }
  }
};
