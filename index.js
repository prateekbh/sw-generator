import npmRun from 'npm-run';
import { join } from 'path';
import { rollup } from 'rollup';
import replace from 'rollup-plugin-re';
import resolve from 'rollup-plugin-node-resolve';
import compiler from '@ampproject/rollup-plugin-closure-compiler';

export async function buildSW() {
  // Would like to use the TSC JavaScript API, but it is not stable yet.
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // Until then, use npm to transpile Typescript into a temp directory.
  npmRun.sync(`tsc -p ./src/tsconfig.json --outDir output`);

  // rollup the files in the tempdir
  const bundle = await rollup({
    input: join('output', 'index.js'),
    plugins: [
      replace({
        patterns: [
          {
            test: '__REPLACE_CONFIG_documentCachingOptions = {}',
            replace: '__REPLACE_CONFIG_documentCachingOptions = blah',
          },
          {
            test: 'process.env.NODE_ENV',
            replace: "'production'",
          },
        ],
      }),
      resolve({}),
      /* TODO: uncomment this after https://github.com/ampproject/rollup-plugin-closure-compiler/issues/92
      * is resolved
      */
      // compiler({
      //   compilation_level: 'ADVANCED',
      //   jscomp_off: 'checkVars',
      // }),
    ],
  });
  const { code } = await bundle.generate({
    name: 'AmpServiceWorker',
    format: 'es',
    sourceMap: true,
  });

  return code;
}
