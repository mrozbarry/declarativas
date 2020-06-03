import * as operation from '../operation';

const rectOperation = (name) => {
  return operation.make(
    name,
    (context, props) => context[name](
      props.x,
      props.y,
      props.width,
      props.height,
    ),
  );
};

export const clearRect = rectOperation('clearRect');
export const fillRect = rectOperation('fillRect');
export const strokeRect = rectOperation('strokeRect');
