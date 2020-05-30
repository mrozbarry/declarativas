import * as path from './primitives/path';
import * as state from './primitives/state';
import * as property from './primitives/property';
import * as rect from './primitives/rect';
import * as transforms from './primitives/transforms';

export const primitives = {
  ...path,
  ...state,
  ...property,
  ...rect,
  ...transforms,
};
