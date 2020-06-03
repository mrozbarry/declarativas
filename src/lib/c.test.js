import test from 'ava';
import { c } from './c';

test('it can create a node from a primitive', (t) => {
  const node = c('fillStyle', { value: 'blue' });

  t.deepEqual(node, {
    type: 'fillStyle',
    props: { value: 'blue' },
    children: [],
  });
});

test('it can create nodes from a function-component', (t) => {
  const Component = () => [
    c('fillStyle', { value: 'black' }),
    c('fillRect', {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }),
  ];

  const node = c(Component);

  t.deepEqual(node, [
    { type: 'fillStyle', props: { value: 'black' }, children: [] },
    { type: 'fillRect', props: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }, children: [] },
  ]);
});

test('it throws a TypeError when c() cannot find the specified primitive', (t) => {
  t.throws(() => {
    c('notACanvasOperation');
  }, {
    message: 'Unable to build notACanvasOperation primitive',
  });
});
