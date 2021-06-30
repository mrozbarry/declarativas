import * as operation from '../operation';

const numberOr = (value, fallback) => (
  typeof value === 'number' ? value : fallback
);

export const drawImage = operation.make(
  'drawImage',
  ({ context }, props) => props.source
    ? context.drawImage(
      props.image,
      props.source.x,
      props.source.y,
      props.source.width,
      props.source.height,
      props.destination.x,
      props.destination.y,
      props.destination.width,
      props.destination.height,
    )
    : context.drawImage(
      props.image,
      props.destination.x,
      props.destination.y,
      numberOr(props.destination.width, props.image.width),
      numberOr(props.destination.height, props.image.height),
    ),
);

export const putImageData = operation.make(
  'putImageData',
  ({ context }, props) => props.source
    ? context.putImageData(
      props.imageData,
      props.destination.x,
      props.destination.y,
      props.source.x,
      props.source.y,
      props.source.width,
      props.source.height,
    )
    : context.putImageData(
      props.imageData,
      props.destination.x,
      props.destination.y,
    ),
);
