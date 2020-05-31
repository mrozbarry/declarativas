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

const Initialize = ({ numberOfColumns, numberOfRows }) => (state) => [
  {
    ...state,
    squares: Array.from({ length: numberOfColumns * numberOfRows}, (_, index) => ({
      color: 'hsla(' + [
        Math.random() * 359,
        '60%',
        '40%',
        0.3,
      ]
        .join(', ') + ')',
      angle: Math.random() * 360,
      speed: (Math.random() * 6) - 3,
      x: ((index % numberOfColumns) * (640 / numberOfColumns)) + (640 / numberOfColumns / 2),
      y: (Math.floor(index / numberOfColumns) * (480 / numberOfRows)) + (480 / numberOfRows / 2),
    })),
  },
  effects.none(),
];

const ControlListeners = () => {
  const rowsElement = document.querySelector('input#numberOfRows');
  const colsElement = document.querySelector('input#numberOfCols');

  return (dispatch) => {
    let numberOfRows = rowsElement.value;
    let numberOfColumns = colsElement.value;

    const trigger = () => {
      dispatch(Initialize({
        numberOfRows,
        numberOfColumns,
      }));
    };

    const onRowsChange = (event) => {
      numberOfRows = event.target.value;
      trigger();
    };

    const onColsChange = (event) => {
      numberOfColumns = event.target.value;
      trigger();
    };
    rowsElement.addEventListener('input', onRowsChange);
    colsElement.addEventListener('input', onColsChange);

    trigger();

    return () => {
      rowsElement.removeEventListener('input', onRowsChange);
      colsElement.removeEventListener('input', onColsChange);
    };
  };
};

app({
  init: Initialize({
    numberOfColumns: document.querySelector('input#numberOfCols').value,
    numberOfRows: document.querySelector('input#numberOfRows').value,
  })({
    lastFrameAt: performance.now(),
    frameDeltas: [],
  }),

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

      c('fillStyle', square.color),
      c('fillRect', {
        x: -35,
        y: -35,
        width: 70,
        height: 70,
      }),

      c('restore'),
    ]),

    c('restore'),
  ],

  subscribe: (state, builtIns) => [
    [builtIns.onFrame, Rotate],
    [builtIns.onFrame, TrackFrames],
    [ControlListeners],
  ],

  canvas: document.querySelector('canvas#app'),
});
