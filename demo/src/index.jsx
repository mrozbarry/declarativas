/*
 * @jsx c
 */

import { c, components } from '../../src/lib/index.js';
import * as app from './app';
import * as actions from './actions';
import * as rnd from './rnd';

const { Rect, RevertableState } = components;

const toRadians = (degrees) => (
  degrees * Math.PI / 180
);

const controls = {
  numberOfRows: document.querySelector('input#numberOfRows'),
  numberOfCols: document.querySelector('input#numberOfCols'),
  fps: document.querySelector('#stats'),
  tree: document.querySelector('#tree'),
};

const random = rnd.make();

const pipe = (fns) => (value) => (
  fns.reduce((state, fn) => fn(state), value)
);

const Square = (props) => <RevertableState>
  <translate x={props.x} y={props.y} />
  <rotate value={toRadians(props.angle)} />
  <Rect
    x={-35}
    y={-35}
    width={70}
    height={70}
    fill={props.color}
    stroke="black"
  />
</RevertableState>;

const game = app.make({
  view: (state, context) => <g>
    <Rect
      fill="#d0d0d0"
      x={0}
      y={0}
      width={context.canvas.width}
      height={context.canvas.height}
    />
    {state.squares.map((square) => <Square {...square} />)}
  </g>,

  context: document.querySelector('#app').getContext('2d'),
});

const loop = () => {
  // Pure state functions
  const state = game.next(pipe([
    actions.Rotate,
    actions.TrackFrames,
  ])).value;

  // Side effects here
  controls.fps.innerText = `
FPS: ${(state.frameDeltas.length / (state.frameDeltas.reduce((sum, delta) => sum + delta, 0) / 1000)).toFixed(2)}
`;

  requestAnimationFrame(loop);
};

const onControlInput = () => {
  game.next(
    actions.Initialize({
      numberOfColumns: controls.numberOfCols.value || 2,
      numberOfRows: controls.numberOfRows.value || 2,
      rnd: random,
    }),
  );
};
controls.numberOfCols.addEventListener('input', onControlInput);
controls.numberOfRows.addEventListener('input', onControlInput);

game.next(pipe([
  () => ({
    play: true,
    squares: [],
    lastFrameAt: performance.now(),
    frameDeltas: [],
  }),
  actions.Initialize({
    numberOfColumns: controls.numberOfCols.value,
    numberOfRows: controls.numberOfRows.value,
    rnd: random,
  }),
]));

loop();
