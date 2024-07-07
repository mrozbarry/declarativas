/**
 * @param {array} nodes
 * @param {CanvasRenderingContext2d|OffscreenCanvasRenderingContext2D} context
 * @returns {null}
 */
export const render = (nodes, context) => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }

  if (nodes.length === 0) {
    return;
  }

  for (let node of nodes) {
    if (!node) {
      continue;
    }
    if (Array.isArray(node)) {
      render(node, context);
      continue;
    }

    switch (node.type) {
    case 'mutator':
      render(node.fn(context), context);
      break;

    case 'element':
      render(node.fn(node.props, node.children, context), context);
      break;
    }
  }
};
