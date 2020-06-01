import { c } from '../lib/index';
import * as app from './app';
import * as actions from './actions';
import * as rnd from './rnd';

const toRadians = (degrees) => (
  degrees * Math.PI / 180
);

const controls = {
  numberOfRows: document.querySelector('input#numberOfRows'),
  numberOfCols: document.querySelector('input#numberOfCols'),
  fps: document.querySelector('#stats'),
};

const random = rnd.make();

/* Example Component */
const RevertableState = (_props, children) => [
  c('save'),
  children,
  c('restore'),
];

const FilledRect = (props) => [
  c('fillStyle', { value: props.fill }),
  c('fillRect', {
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
  }),
];

const Square = (props) => c(RevertableState, null, [
  c('translate', {
    x: props.x,
    y: props.y,
  }),

  c('rotate', { value: toRadians(props.angle) }),

  c(FilledRect, {
    fill: props.color,
    x: -35,
    y: -35,
    width: 70,
    height: 70,
  }),
]);

const game = app.make({
  initialState: actions.Initialize({
    numberOfColumns: controls.numberOfCols.value,
    numberOfRows: controls.numberOfRows.value,
    rnd: random,
  })({
    play: true,
    squares: [],
    lastFrameAt: performance.now(),
    frameDeltas: [],
  }),

  view: (state, context) => c(RevertableState, null, [
    c(FilledRect, {
      fill: '#d0d0d0',
      x: 0,
      y: 0,
      width: context.canvas.width,
      height: context.canvas.height,
    }),

    state.squares.map((square) => c(Square, square)),
  ]),

  context: document.querySelector('#app').getContext('2d'),
});

const loop = () => {
  // Pure state functions
  const state = game.next([
    actions.Rotate,
    actions.TrackFrames,
  ]).value;

  // Side effects here
  controls.fps.innerText = `
FPS: ${(state.frameDeltas.length / (state.frameDeltas.reduce((sum, delta) => sum + delta, 0) / 1000)).toFixed(2)}
`;

  // And schedule next frame
  requestAnimationFrame(loop);
};

const onControlInput = () => {
  game.next([
    actions.Initialize({
      numberOfColumns: controls.numberOfCols.value || 2,
      numberOfRows: controls.numberOfRows.value || 2,
      rnd: random,
    })
  ]);
};
controls.numberOfCols.addEventListener('input', onControlInput);
controls.numberOfRows.addEventListener('input', onControlInput);

loop();
