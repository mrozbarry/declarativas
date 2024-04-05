import * as path from './path';
import * as state from './state';
import * as property from './property';
import * as rect from './rect';
import * as transforms from './transforms';
import * as blit from './blit';
import * as text from './text';
import * as line from './line';

export const primitives = {
  ...path,
  ...state,
  ...property,
  ...rect,
  ...transforms,
  ...blit,
  ...text,
  ...line,
};
