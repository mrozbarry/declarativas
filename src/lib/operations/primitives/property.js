import * as operation from '../operation.js';

const setAttributeOperation = (attribute) => operation.make(
  attribute,
  (context, props) => {
    context[attribute] = props.value;
  },
);

export const fillStyle = setAttributeOperation('fillStyle');
export const font = setAttributeOperation('font');
export const globalAlpha = setAttributeOperation('globalAlpha');
export const globalCompositeOperation = setAttributeOperation('globalCompositeOperation');
export const imageSmoothingEnabled = setAttributeOperation('imageSmoothingEnabled');
export const lineCap = setAttributeOperation('lineCap');
export const lineDashOffset = setAttributeOperation('lineDashOffset');
export const lineJoin = setAttributeOperation('lineJoin');
export const lineWidth = setAttributeOperation('lineWidth');
export const miterLimit = setAttributeOperation('miterLimit');
export const shadowBlur = setAttributeOperation('shadowBlur');
export const shadowColor = setAttributeOperation('shadowColor');
export const shadowOffsetX = setAttributeOperation('shadowOffsetX');
export const shadowOffsetY = setAttributeOperation('shadowOffsetY');
export const strokeStyle = setAttributeOperation('strokeStyle');
export const textAlign = setAttributeOperation('textAlign');
export const textBaseline = setAttributeOperation('textBaseline');

