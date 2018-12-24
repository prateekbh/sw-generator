import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-re';
import filesize from 'rollup-plugin-filesize';
import babel from 'rollup-plugin-babel';
import compiler from '@ampproject/rollup-plugin-closure-compiler';


const replacePatterns = [
  {
      test: 'process.env.NODE_ENV',
      replace: "'production'",
  },
];

export default {
  input : [
    'lib/modules/core/index.js',
    'lib/modules/asset-caching/index.js'
  ],
  output: {
    dir: 'out',
    format: 'esm',
  },
  plugins: [
    resolve({}),
    replace({
        patterns: replacePatterns,
    }),
    babel({
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry"
          }
        ]
      ]
    }),
    compiler({
      compilation_level: 'simple',
    }),
    filesize(),
  ]
};
