import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  plugins: [
    resolve({
      mainFields: ['browser', 'es2015', 'module', 'jsnext:main', 'main'],
      preferBuiltins: true,
    }),
    commonjs(),
    nodePolyfills(),
  ],
};
