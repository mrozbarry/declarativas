import { primitives } from './operations/index';

export const render = (context, nodes) => {
  if (!nodes || nodes.length === 0) {
    return;
  }

  const renderChildren = (childOperations) => render(
    context,
    childOperations,
  );

  let node;
  let op;
  for(node of nodes) {
    if (Array.isArray(node)) {
      render(context, node);
      continue;
    }
    op = primitives[node.type];
    op.exec(
      context,
      node.props,
      renderChildren,
    );
  }
};
