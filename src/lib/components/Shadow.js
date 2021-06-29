import { c } from '../c';
import { RevertableState } from './RevertableState';

export const Shadow = (props, children) => RevertableState({}, [
  props.blur && c('shadowBlur', { value: props.blur }),
  props.color && c('shadowColor', { value: props.color }),
  ...(props.offset
    ? [
      props.offset.x && c('shadowOffsetX', { value: props.offset.x }),
      props.offset.y && c('shadowOffsetY', { value: props.offset.y }),
    ]
    : []
  ),

  children,
]);
