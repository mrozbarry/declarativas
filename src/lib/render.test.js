import test from 'ava';
import { render } from './render';
import { c } from './c';
import { Canvas } from '../../support/canvas';

test('it renders nothing', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, []);
  });
});

test('it cannot render an operation that does not exist', (t) => {
  const context = (new Canvas()).getContext('2d');

  const expectedError = {
    message: 'Unable to render thisDoesNotExistInTheCanvasApi',
  };

  t.throws(() => {
    render(context, [
      {
        type: 'thisDoesNotExistInTheCanvasApi',
        props: {},
        children: []
      },
    ]);
  }, expectedError);
});

test('it can render a valid operation', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, [
      {
        type: 'fillStyle',
        props: {},
        children: []
      },
    ]);
  });
});

test('it can render deep nested arrays', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, [[[
      {
        type: 'fillStyle',
        props: {
          value: 'blue',
        },
        children: []
      },
    ]]]);
  });

  t.is(context.fillStyle, 'blue');
});

test('it can skip rendering toggled items', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, [
      false && {
        type: 'fillStyle',
        props: {
          value: 'blue',
        },
        children: []
      },
    ]);
  });

  t.is(context.fillStyle, undefined);
});

test('it can skip rendering toggled nested items', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, [
      false && [
        {
          type: 'fillStyle',
          props: {
            value: 'blue',
          },
          children: []
        },
        {
          type: 'fillRect',
          props: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
          children: []
        },
      ]
    ]);
  });

  t.is(context.fillStyle, undefined);
  t.is(context.fillRect.callCount, 0);
});

test('it can render nodes generated by c()', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, [
      c('fillStyle', { value: 'blue' }),
      c('fillRect', {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      })
    ]);
  });

  t.is(context.fillStyle, 'blue');
  t.is(context.fillRect.callCount, 1);
});

test('wraps single nodes in an array', (t) => {
  const context = (new Canvas()).getContext('2d');

  t.notThrows(() => {
    render(context, c('fillStyle', { value: 'blue' }));
  });

  t.is(context.fillStyle, 'blue');
});
