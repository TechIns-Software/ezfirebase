import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/firebaseLib.js',
  output: [
    {
      file: 'dist/firebaseLib.umd.js',
      format: 'umd',
      name: 'firebaseLib',
      globals: {
        'firebase/app': 'firebase',
        'firebase/messaging': 'firebase.messaging'
      }
    },
    {
      file: 'dist/firebaseLib.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 0.25%', 'not dead', 'ie 11']
          }
        }]
      ]
    })
  ],
  external: ['firebase/app', 'firebase/messaging']
};