import test from 'ava';
import { primitives } from './index';

test('all standardized context 2d properties and methods are available', (t) => {
  t.deepEqual(Object.keys(primitives).sort(), [
    'fillStyle',
    'font',
    'globalAlpha',
    'globalCompositeOperation',
    'imageSmoothingEnabled',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'shadowBlur',
    'shadowColor',
    'shadowOffsetX',
    'shadowOffsetY',
    'strokeStyle',
    'textAlign',
    'textBaseline',
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'drawFocusIfNeeded',
    'drawImage',
    'ellipse',
    'fill',
    'fillRect',
    'fillText',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeRect',
    'strokeText',
    'transform',
    'translate',
  ].sort());
});
