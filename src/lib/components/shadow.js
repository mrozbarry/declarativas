import { c } from '../c';

export const shadow = (props, children) => [
  props.blur && c('shadowBlur', { value: props.blur }),
  props.color && c('shadowColor', { value: props.color }),
  props.offset && props.offset.x && c('shadowOffsetX', { value: props.offset.x }),
  props.offset && props.offset.y && c('shadowOffsetY', { value: props.offset.y }),

  children,
];
