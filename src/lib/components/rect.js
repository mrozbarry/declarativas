import { c } from '../c';

export const rect = (props) => [
  props.fill && [
    c('fillStyle', { value: props.fill }),
    c('filledRect', props),
  ],
  props.stroke && [
    c('strokeStyle', { value: props.stroke }),
    c('strokeRect', props),
  ],
];
