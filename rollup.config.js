import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: './src/lib/index.js',
  plugins: [
    eslint(),
    terser({
      module: true,
    }),
    strip(),
    cleanup(),
  ],
  output: {
    name: 'declarativas',
    file: 'declarativas.js',
    format: 'umd',
    exports: 'named',
  },
};
