import { render } from '../../declarativas.esm.js';

function *makeIterator({
  context,
  view,
}) {
  let state = {};
  let update = (nextState) => nextState;

  while (true) {
    update = yield state;
    state = update({ ...state });
    if (!state) return;
    render(
      context,
      view(state, context),
    );
  }
}

export function make(props) {
  const app = makeIterator(props);
  app.next(); // iterators that both accept and publish data need this initial .next call
  return app;
}
