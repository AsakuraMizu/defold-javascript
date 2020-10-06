import multi from 'rollup-plugin-multi-input';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelInputPlugin, getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

const config = {
  input: ['src/**/*.ts'],
  output: {
    dir: 'dist',
    format: 'cjs',
    strict: false,
  },
  plugins: [
    multi(),
    commonjs(),
    resolve({ extensions }),
    getBabelInputPlugin({
      extensions,
      babelHelpers: 'bundled',
    }),
    getBabelOutputPlugin(),
  ],
};

if (process.env.PRODUCTION) {
  config.plugins.push(terser());
}

export default config;
