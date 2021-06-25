import { c } from '../c';

export const Rect = (props) => [
  props.fill && [
    c('fillStyle', { value: props.fill }),
    c('fillRect', props),
  ],
  props.stroke && [
    c('strokeStyle', { value: props.stroke }),
    c('strokeRect', props),
  ],
];
