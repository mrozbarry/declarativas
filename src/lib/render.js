/**
 * @param {array} nodes
 * @param {CanvasRenderingContext2d|OffscreenCanvasRenderingContext2D} context
 */
export const render = (nodes, context) => {
  if (!Array.isArray(nodes)) {
    return render([nodes], context);
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

    case 'call':
      if (node.name in context) {
        context[node.name](...node.args);
      }
      break;

    case 'propChange':
      if (node.key in context) {
        context[node.key] = node.value;
      }
      break;


    case 'element':
      render(node.fn(node.props, node.children, context), context);
      break;
    }
  }
};
