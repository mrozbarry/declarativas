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
    return 0;
  }

  let ops = 0;
  for (let node of nodes.flat()) {
    if (!node) {
      continue;
    }

    switch (node.type) {
    case 'mutator':
      ops += 1 + render(node.fn(context), context);
      break;

    case 'element':
      ops += render(node.fn(node.props, node.children, context), context);
      break;
    }
  }

  return ops;
};
