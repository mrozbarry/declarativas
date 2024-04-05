import test from 'ava';
import { save, restore } from './state';
import { Canvas } from '../../../support/canvas';

test('save exec calls save context', (t) => {
  const context = (new Canvas()).getContext('2d');

  save.exec({ context });

  t.is(context.save.callCount, 1);
});

test('restore exec calls restore context', (t) => {
  const context = (new Canvas()).getContext('2d');

  restore.exec({ context });

  t.is(context.restore.callCount, 1);
});
