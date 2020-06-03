import test from 'ava';
import { beginPath, moveTo, lineTo, closePath, stroke, fill, arcTo } from './path';

const testOperation = (t, input, expected) => {
  t.is(typeof input.build, 'function');
  t.is(typeof input.exec, 'function');

  t.deepEqual(input.build({ foo: 'bar' }), {
    type: expected,
    props: { foo: 'bar' },
    children: [],
  });
};
