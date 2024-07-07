import { createElement as h, Stateful, Translate, Rotate, Rect, Properties, Path, render, ClearRect, FillRect, StrokeRect } from './declarativas.esm.js';

const toRadians = (degrees) => (
  degrees * Math.PI / 180
);

const only = (object, ...keys) => keys.reduce((memo, key) => ({ ...memo, [key]: object[key] }), {});

const Square = (props) => h(Stateful, {}, [
  h(Translate, only(props, 'x', 'y')),
  h(Rotate, { angle: toRadians(props.angle) }),
  h(Properties, { fillStyle: props.color, strokeStyle: 'black' }),
  h(FillRect, { x: -35, y: -35, w: 70, h: 70 }),
  h(StrokeRect, { x: -35, y: -35, w: 70, h: 70 }),
  // h(Path, { stroke: true, fill: true, isClosed: false }, [
  //   h(Rect, { x: -35, y: -35, w: 70, h: 70 }),
  // ]),
]);

const makeSquareState = (x, y) => ({
  x, y,
  angle: Math.random() * 360,
  color: `rgb(${100 + Math.floor(Math.random() * 155)}, ${100 + Math.floor(Math.random() * 155)}, ${100 + Math.floor(Math.random() * 155)})`,
  speed: (5 + (Math.random() * 360)) * (Math.random() > 0.5 ? 1 : -1),
  sortOrder: Math.floor(Math.random() * 100),
});

const makeSquareRow = (y) => [
  makeSquareState(35 + (70 * 0), y),
  makeSquareState(35 + (70 * 1), y),
  makeSquareState(35 + (70 * 2), y),
  makeSquareState(35 + (70 * 3), y),
  makeSquareState(35 + (70 * 4), y),
  makeSquareState(35 + (70 * 5), y),
  makeSquareState(35 + (70 * 6), y),
  makeSquareState(35 + (70 * 7), y),
  makeSquareState(35 + (70 * 8), y),
  makeSquareState(35 + (70 * 9), y),
  makeSquareState(35 + (70 * 10), y),
];

const state = {
  lastTimestamp: 0,
  frameCount: 0,
  fps: [],
  squares: [
    ...makeSquareRow(35 + (70 * 0)),
    ...makeSquareRow(35 + (70 * 1)),
    ...makeSquareRow(35 + (70 * 2)),
    ...makeSquareRow(35 + (70 * 3)),
    ...makeSquareRow(35 + (70 * 4)),
    ...makeSquareRow(35 + (70 * 5)),
    ...makeSquareRow(35 + (70 * 6)),
    ...makeSquareRow(35 + (70 * 7)),
  ].sort((a, b) => a.sortOrder - b.sortOrder),
};

const fpsCount = document.querySelector('#fps-count');
const fpsCalculated = document.querySelector('#fps-calculated');
const useRaf = document.querySelector('input[type="checkbox"]');
const renderCount = document.querySelector('input[type="range"]');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const getDelta = () => {
  const now = performance.now();
  const delta = state.lastTimestamp
    ? (now - state.lastTimestamp)
    : null;
  state.lastTimestamp = now;

  if (state.frameCount % 25 === 0) {
    const calculatedFps = 1000 / delta;
    fpsCalculated.innerText = calculatedFps.toFixed(1);
  }

  return delta / 1000;
};

const schedule = (fn) => {
  if (useRaf.checked) {
    requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 0);
  }
};

const draw = () => {
  state.frameCount += 1;
  const delta = getDelta();
  if (delta === null) {
    schedule(draw);
  }

  const max = renderCount.value;
  const squares = state.squares.slice(0, max);

  squares
    .forEach((square) => {
      square.angle += (square.speed * delta);
    });

  render(
    [
      h(ClearRect, { x: 0, y: 0, w: canvas.width, h: canvas.height }),
      squares.map(props => h(Square, props)),
    ],
    context,
  );

  schedule(draw);
};

draw();
setInterval(() => {
  const { frameCount } = state;
  state.fps.push(frameCount);
  state.frameCount = 0;
  fpsCount.innerText = frameCount;
}, 1000);
