import { primitives } from './operations/index';

export const render = (context, nodes) => {
  if (!nodes || nodes.length === 0) {
    return;
  }

  let node;
  let op;

  for (node of nodes) {
    if (!node) {
      continue;
    }

    if (Array.isArray(node)) {
      render(context, node);
      continue;
    }

    try {
      op = primitives[node.type];
      op.exec(
        context,
        node.props,
      );
    } catch (exception) {
      const error = new TypeError(
        `Unable to render ${node.type}`
      );
      error.source = exception;
      throw error;
    }
  }
  console.groupEnd();
};
