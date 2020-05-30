import {
  app,
  c,
  effects,
} from '../lib/index';

const toRadians = (degrees) => (
  degrees * Math.PI / 180
);

const Rotate = (state) => [
  {
    ...state,
    squares: state.squares.map((square) => ({
      ...square,
      angle: square.angle + square.speed,
    })),
  },
  effects.none(),
];

const stats = document.querySelector('#stats');
const TrackFrames = (state) => {
  const currentTime = performance.now();
  const delta = currentTime - state.lastFrameAt;

  stats.innerHTML = `
<div>FPS: ${(state.frameDeltas.length / (state.frameDeltas.reduce((sum, delta) => sum + delta, 0) / 1000)).toFixed(2)}</div>
`;

  return [
    {
      ...state,
      lastFrameAt: currentTime,
      frameDeltas: [delta, ...state.frameDeltas.slice(0, 9)],
    }
  ];
};

const numberOfColumns = 8;
const numberOfRows = 5;
app({
  init: [
    {
      lastFrameAt: performance.now(),
      frameDeltas: [],
      squares: Array.from({ length: numberOfColumns * numberOfRows}, (_, index) => ({
        angle: Math.random() * 360,
        speed: 1 + (Math.random() * 6),
        x: ((index % numberOfColumns) * (640 / numberOfColumns)) + (640 / numberOfColumns / 2),
        y: (Math.floor(index / numberOfColumns) * (480 / numberOfRows)) + (480 / numberOfRows / 2),
      })),
    },
    effects.none(),
  ],

  render: (state, canvas) => [
    c('save'),
    c('fillStyle', '#d0d0d0'),
    c('fillRect', {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    }),

    state.squares.map((square) => [
      c('save'),

      c('translate', {
        x: square.x,
        y: square.y,
      }),

      c('rotate', toRadians(square.angle)),

      c('fillStyle', 'white'),
      c('fillRect', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
      }),

      c('restore'),
    ]),

    c('restore'),
  ],

  subscribe: (state, builtIns) => [
    [builtIns.onFrame, Rotate],
    [builtIns.onFrame, TrackFrames],
  ],

  canvas: document.querySelector('canvas#app'),
});
