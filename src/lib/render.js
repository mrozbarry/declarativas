import { primitives } from './operations/index';

export const render = (context, nodes) => {
  if (!nodes || nodes.length === 0) {
    return;
  }

  if (!Array.isArray(nodes)) {
    return render(context, [nodes]);
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
        { context, render },
        node.props,
        node.children,
      );
    } catch (exception) {
      const error = new TypeError(
        `Unable to render ${node.type}`
      );
      error.source = exception;
      throw error;
    }
  }
};
