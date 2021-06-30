import * as path from './primitives/path';
import * as state from './primitives/state';
import * as property from './primitives/property';
import * as rect from './primitives/rect';
import * as transforms from './primitives/transforms';
import * as blit from './primitives/blit';
import * as text from './primitives/text';
import * as line from './primitives/line';
import * as g from './primitives/g';

export const primitives = {
  ...path,
  ...state,
  ...property,
  ...rect,
  ...transforms,
  ...blit,
  ...text,
  ...line,
  ...g,
};
