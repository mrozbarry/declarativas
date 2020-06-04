import test from 'ava';
import { drawImage, putImageData } from './blit';
import { Canvas } from '../../../../support/canvas';

test('primitive drawImage calls context drawImage with full image width and height when not specifying a source or size', (t) => {
  const context = (new Canvas()).getContext('2d');
  const image = {
    width: 10,
    height: 20,
  };

  drawImage.exec(context, {
    image,
    destination: {
      x: 100,
      y: 200,
    },
  });

  t.is(context.drawImage.callCount, 1);
  t.truthy(context.drawImage.calledWithExactly(
    image,
    100,
    200,
    10,
    20,
  ));
});

test('primitive drawImage calls context drawImage when not specifying a source', (t) => {
  const context = (new Canvas()).getContext('2d');
  const image = {
    width: 10,
    height: 20,
  };

  drawImage.exec(context, {
    image,
    destination: {
      x: 100,
      y: 200,
      width: 30,
      height: 40,
    },
  });

  t.is(context.drawImage.callCount, 1);
  t.truthy(context.drawImage.calledWithExactly(
    image,
    100,
    200,
    30,
    40,
  ));
});

test('primitive drawImage calls context drawImage with source region', (t) => {
  const context = (new Canvas()).getContext('2d');
  const image = {
    width: 10,
    height: 20,
  };

  drawImage.exec(context, {
    image,
    destination: {
      x: 100,
      y: 200,
      width: 30,
      height: 40,
    },
    source: {
      x: 50,
      y: 60,
      width: 70,
      height: 80,
    },
  });

  t.is(context.drawImage.callCount, 1);
  t.truthy(context.drawImage.calledWithExactly(
    image,
    50,
    60,
    70,
    80,
    100,
    200,
    30,
    40,
  ));
});

test('primitive putImageData calls context putImageData at a destination', (t) => {
  const context = (new Canvas()).getContext('2d');
  const imageData = {
    width: 10,
    height: 20,
  };

  putImageData.exec(context, {
    imageData,
    destination: {
      x: 99,
      y: 66,
    }
  });

  t.is(context.putImageData.callCount, 1);
  t.truthy(context.putImageData.calledWithExactly(imageData, 99, 66));
});

test('primitive putImageData calls context putImageData at a destination with a region of the image', (t) => {
  const context = (new Canvas()).getContext('2d');
  const imageData = {
    width: 10,
    height: 20,
  };

  putImageData.exec(context, {
    imageData,
    destination: {
      x: 99,
      y: 66,
    },
    source: {
      x: 5,
      y: 10,
      width: 15,
      height: 20,
    },
  });

  t.is(context.putImageData.callCount, 1);
  t.truthy(context.putImageData.calledWithExactly(imageData, 99, 66, 5, 10, 15, 20));
});
