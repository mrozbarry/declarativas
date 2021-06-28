export const Initialize = ({ numberOfColumns, numberOfRows, rnd }) => (state) => ({
  ...state,
  squares: Array.from({
    length: numberOfColumns * numberOfRows,
  }, (_, index) => ({
    color: 'hsla(' + [
      rnd.next().value * 359,
      '60%',
      '40%',
      0.3,
    ]
      .join(', ') + ')',
    angle: rnd.next().value * 360,
    speed: (rnd.next().value * 6) - 3,
    x: ((index % numberOfColumns) * (640 / numberOfColumns)) + (640 / numberOfColumns / 2),
    y: (Math.floor(index / numberOfColumns) * (480 / numberOfRows)) + (480 / numberOfRows / 2),
  })),
});

export const TrackFrames = (state) => {
  const currentTime = performance.now();
  const delta = currentTime - state.lastFrameAt;

  return {
    ...state,
    lastFrameAt: currentTime,
    frameDeltas: [delta, ...state.frameDeltas.slice(0, 9)],
  };
};

export const Rotate = (state) => ({
  ...state,
  squares: state.squares.map((square) => ({
    ...square,
    angle: square.angle + square.speed,
  })),
});

