import test from 'ava';
import * as property from './property';

const propertyMacro = (t, input, expected) => {
  const context = {};
  property[input].exec({ context }, { value: expected });
  t.is(context[input], expected);
};

test(
  'a property sets the global context value', propertyMacro,
  'fillStyle', '#f0f',
);

test('property provides all the current non-experimental canvas context properties', (t) => {
  t.deepEqual(Object.keys(property), [
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
  ]);
});
