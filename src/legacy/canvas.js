const styleOp = (key) => (value, children) => (ctx) => {
  ctx[key] = value;

  return children;
};

const callOp = (key) => () => (ctx) => {
  ctx[key]();
};

const coordOp = (key) => (coord) => (ctx) => {
  ctx[key](coord[0], coord[1]);
};

const OP = {
  strokeStyle: styleOp('strokeStyle'),
  fillStyle: styleOp('fillStyle'),
  lineCap: styleOp('lineCap'),
  lineJoin: styleOp('lineJoin'),
  lineWidth: styleOp('lineWidth'),
  font: styleOp('font'),
  textAlign: styleOp('textAlign'),
  textBaseline: styleOp('textBaseline'),

  clear: () => (ctx) => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height),

  rectFill: (props) => (ctx) => (
    ctx.fillRect(props.x, props.y, props.w, props.h)
  ),
  rectStroke: (props) => (ctx) => (
    ctx.strokeRect(props.x, props.y, props.w, props.h)
  ),

  save: () => (ctx) => ctx.save(),
  restore: () => (ctx) => ctx.restore(),

  scale: ([w, h], children = []) => (ctx) => {
    ctx.scale(w, h);

    return children;
  },

  translate: ([x, y], children = []) => (ctx, render) => {
    ctx.translate(x, y);

    return children;
  },

  rotate: (radians, children = []) => (ctx, render) => {
    ctx.rotate(radians);

    return children;
  },

  beginPath: callOp('beginPath'),
  closePath: callOp('closePath'),
  clip: (path, children = []) => (ctx) => {
    ctx.clip(path);

    return children;
  },

  moveTo: coordOp('moveTo'),
  lineTo: coordOp('lineTo'),

  arc: ({ position: [x, y], radius, startAngle, endAngle, antiClockwise }) => (ctx) => {
    ctx.arc((x), (y), radius, startAngle, endAngle, antiClockwise);
  },

  stroke: callOp('stroke'),
  fill: callOp('fill'),

  textFill: ({ position: [x, y], text }) => ctx => {
    ctx.fillText(text, (x), (y));
  },

  textStroke: ({ position: [x, y], text }) => ctx => {
    ctx.strokeText(text, (x), (y));
  },
};

const makeOp = (cmd, props = {}, children = []) => ({
  cmd,
  props,
  children,
});

export const strokeStyle = (style, children) => makeOp('strokeStyle', style, children);
export const fillStyle = (style, children) => makeOp('fillStyle', style, children);
export const lineCap = (style, children) => makeOp('lineCap', style, children);
export const lineJoin = (style, children) => makeOp('lineJoin', style, children);
export const lineWidth = (width, children) => makeOp('lineWidth', width, children);
export const radialGradient = (targetProp, innerPosition, innerRadius, outerPosition, outerRadius, colorStops, children) => (
  makeOp('radialGradient', { targetProp, innerPosition, innerRadius, outerPosition, outerRadius, colorStops }, children)
);

export const save = () => makeOp('save');
export const restore = () => makeOp('restore');

export const restorable = (children) => [
  save(),
  children,
  restore(),
];

export const clear = () => makeOp('clear');

export const rectFill = ([x, y], [w, h]) => makeOp('rectFill', { x, y, w, h }, []);
export const rectStroke = ([x, y], [w, h]) => makeOp('rectStroke', { x, y, w, h }, []);
export const scale = ([w, h], children) => makeOp('scale', [w, h], children);
export const translate = ([x, y], children) => makeOp('translate', [x, y], children);
export const rotate = (radians, children) => makeOp('rotate', radians, children);

export const withRestore = (fn) => {
  return [
    save(),
    fn({
      scale,
      translate,
      rotate,
    }),
    restore(),
  ];
};

export const beginPath = () => makeOp('beginPath');
export const closePath = () => makeOp('closePath');
export const clip = (path, children) => makeOp('clip', path, children);

export const path = ({ close, after = stroke }, children) => [
  beginPath(),
  children,
  (close ? [closePath()] : []),
  after(),
];

export const moveTo = ([x, y]) => makeOp('moveTo', [x, y]);
export const lineTo = ([x, y]) => makeOp('lineTo', [x, y]);
export const arc = ([x, y], radius, startAngle, endAngle, antiClockwise = false) => (
  makeOp('arc', { position: [x, y], radius, startAngle, endAngle, antiClockwise })
);

export const stroke = () => makeOp('stroke');
export const fill = () => makeOp('fill');

export const textFill = ([x, y], text) => makeOp('textFill', { position: [x, y], text });
export const textStroke = ([x, y], text) => makeOp('textStroke', { position: [x, y], text });

export const polygonStroke = (points) => {
  const first = points[0];
  const tail = points.slice(1);

  return path({ close: true, after: stroke }, [
    moveTo(first),
    tail.map(point => lineTo(point)),
  ]);
};

export const circleStroke = ([x, y], radius) => [
  beginPath(),
  arc([x, y], radius, 0, Math.PI * 2),
  stroke(),
];

export const circleFill = ([x, y], radius) => [
  beginPath(),
  arc([x, y], radius, 0, Math.PI * 2),
  fill(),
];

export const properties = (config, children = []) => Object.keys(config)
  .reduce((nestedChildren, key) => makeOp(
    key,
    config[key],
    nestedChildren,
  ), children);

const render = (operations, ctx) => {
  if (!operations) return;

  const operationList = []
    .concat(operations)
    .filter(Boolean);

  let opDef;
  for(opDef of operationList) {
    if (Array.isArray(opDef)) {
      render(opDef, ctx);
    } else {
      const { cmd, props, children } = opDef;
      const op = OP[cmd];
      render(op(props, children)(ctx), ctx);
    }
  }
};

export default render;
