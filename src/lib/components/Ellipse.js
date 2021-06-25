import { c } from '../c';

export const Ellipse = (props) => [
  props.fill && [
    c('fillStyle', { value: props.fill }),
    c('beginPath'),
    c('ellipse', {
      x: props.cx,
      y: props.cy,
      radiusX: props.rx,
      radiusY: props.ry,
      startAngle: 0,
      endAngle: props.pathLength || Math.PI * 2,
    }),
    c('fill'),
  ],
  props.stroke && [
    c('strokeStyle', { value: props.stroke }),
    c('beginPath'),
    c('ellipse', {
      x: props.cx,
      y: props.cy,
      radiusX: props.rx,
      radiusY: props.ry,
      startAngle: 0,
      endAngle: props.pathLength || Math.PI * 2,
    }),
    c('stroke'),
  ],
];

