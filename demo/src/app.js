import { render } from '../../src/lib/index.js';

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
    const tree = view(state, context);
    render(
      context,
      tree,
    );
  }
}

export function make(props) {
  const app = makeIterator(props);
  app.next(); // iterators that both accept and publish data need this initial .next call
  return app;
}
