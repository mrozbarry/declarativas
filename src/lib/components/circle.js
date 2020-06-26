import { c } from '../c';

export const circle = (props) => [
  props.fill && [
    c('fillStyle', { value: props.fill }),
    c('beginPath'),
    c('arc', {
      x: props.cx,
      y: props.cy,
      radius: props.r,
      startAngle: 0,
      endAngle: props.pathLength || Math.PI * 2,
    }),
    c('fill'),
  ],
  props.stroke && [
    c('strokeStyle', { value: props.stroke }),
    c('beginPath'),
    c('arc', {
      x: props.cx,
      y: props.cy,
      radius: props.r,
      startAngle: 0,
      endAngle: props.pathLength || Math.PI * 2,
    }),
    c('stroke'),
  ],
];
