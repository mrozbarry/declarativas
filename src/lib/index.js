import { app as ferpApp, effects } from 'ferp';
import { primitives } from './operations/index';
import { render } from './render';

const renderToCanvas = (props) => effects.thunk(() => {
  props.setRafHandle(
    requestAnimationFrame(
      () => {
        render(props.context, props.operations);
        for (let fcb of props.frameCallbacks) {
          fcb();
        }
      },
    ),
  );
  return effects.none();
});

const app = (props) => {
  const context = props.canvas.getContext('2d');
  let frameCallbacks = [];

  let rafHandle = null;
  const setRafHandle = (handle) => {
    cancelAnimationFrame(rafHandle);
    rafHandle = handle;
  };

  const getStateEffectFromAction = (action, state) => {
    if (Array.isArray(action)) {
      return action[0](state, action[1]);
    }
    return action(state);
  };

  const update = (action, state) => {
    if (!action) {
      return [state, effects.none()];
    }
    const result = getStateEffectFromAction(action, state);
    return [
      result[0],
      effects.batch([
        renderToCanvas({
          operations: props.render(result[0], props.canvas),
          canvas: props.canvas,
          context,
          setRafHandle,
          frameCallbacks,
        }),
        result[1],
      ]),
    ];
  };

  const onFrame = (action) => (dispatch) => {
    const callback = () => dispatch(action);
    frameCallbacks.push(callback);

    dispatch((state) => [state, effects.none()]);

    return () => {
      frameCallbacks = frameCallbacks.filter(fcb => fcb !== callback);
    };
  };

  let subscribe = undefined;
  if (props.subscribe) {
    subscribe = (state) => {
      return props.subscribe(state, {
        onFrame,
      });
    };
  }

  return ferpApp({
    init: update(
      () => props.init,
      {},
    ),
    update,
    subscribe,
  });
};

const c = (functionOrName, props, children) => {
  if (typeof functionOrName === 'function') {
    return functionOrName(props, children);
  }
  try {
    const descriptor = primitives[functionOrName];
    return descriptor.build(props, children);
  } catch (err) {
    console.error(`Unable to run primitive: ${functionOrName}`);
    console.error(err);
    throw err;
  }
};

export {
  app,
  c,
  effects,
};

