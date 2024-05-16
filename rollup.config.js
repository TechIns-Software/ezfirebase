import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default [
  {
    input: 'src/firebaseLib.js',
    output: [
      {
        file: 'dist/firebaseLib.umd.js',
        format: 'umd',
        name: 'firebaseLib',
        globals: {
          'firebase/app': 'firebase',
          'firebase/messaging': 'firebase.messaging'
        },
        sourcemap: true
      },
      {
        file: 'dist/firebaseLib.esm.js',
        format: 'es',
        sourcemap: true
      },
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
      }),
    ],
  },
  {
    input: 'src/firebase-messaging-sw.js',
    output: [
      {
        file: 'dist/firebase-messaging-sw.js',
        format: 'umd',
        name: 'firebaseLibServiceWorker',
        sourcemap: true
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
      }),
    ],
  },
];