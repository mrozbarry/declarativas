import test from 'ava';
import sinon from 'sinon';
import { make } from './operation';

test('it creates build and exec methods', (t) => {
  const foo = make('foo', () => {});

  t.is(typeof foo.build, 'function');
  t.is(typeof foo.exec, 'function');
});

test('.build() creates a canvas render node', (t) => {
  const foo = make('foo', () => {});

  t.deepEqual(foo.build({ bar: 'baz' }, [1, 2, 3]), {
    type: 'foo',
    props: { bar: 'baz' },
    children: [1, 2, 3]
  });
});

test('.build() defaults to empty object for props, and empty array for children', (t) => {
  const foo = make('foo', () => {});

  t.deepEqual(foo.build(), {
    type: 'foo',
    props: {},
    children: []
  });
});

test('.exec() accepts a canvas 2d context and props', (t) => {
  const context = {};
  const exec = sinon.fake();
  const props = { bar: 'baz' };

  const foo = make('foo', exec);
  foo.exec(context, props);

  t.is(exec.callCount, 1);
  t.truthy(exec.calledWithExactly(context, props));
});
