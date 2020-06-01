import { render } from '../lib/index';

export function *make({
  context,
  initialState,
  view,
}) {
  let state = { ...initialState };
  const runView = () => render(
    context,
    view(state, context),
  );

  const pipe = (fns) => (value) => (
    fns.reduce((state, fn) => fn(state), value)
  );

  runView();

  while (true) {
    const fns = yield state;
    state = pipe(fns)(state);
    if (!state) return;
    runView();
  }
}
