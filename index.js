import npmRun from 'npm-run';
import { join } from 'path';
import { rollup } from 'rollup';
import replace from 'rollup-plugin-re';
import resolve from 'rollup-plugin-node-resolve';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { argv } from 'yargs';

export async function buildSW({ documentCachingOptions } = {}) {
  // Would like to use the TSC JavaScript API, but it is not stable yet.
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // Until then, use npm to transpile Typescript into a temp directory.
  npmRun.sync(`tsc -p ./src/tsconfig.json --outDir output`);

  const replacePatterns = [
    {
      test: 'process.env.NODE_ENV',
      replace: "'production'",
    },
  ];

  if (documentCachingOptions) {
    const tempDocCachingOptions = {};
    if (documentCachingOptions.allowList) {
      tempDocCachingOptions.allowList = [];
      documentCachingOptions.allowList.forEach(regexp => {
        tempDocCachingOptions.allowList.push(regexp.toString());
      });
    } else if (documentCachingOptions.denyList) {
      tempDocCachingOptions.denyList = [];
      documentCachingOptions.denyList.forEach(regexp => {
        tempDocCachingOptions.denyList.push(regexp.toString());
      });
    }
    replacePatterns.push({
      test: '__REPLACE_CONFIG_documentCachingOptions = {}',
      replace: `__REPLACE_CONFIG_documentCachingOptions = ${JSON.stringify(
        tempDocCachingOptions,
      )}`,
    });
  }

  // rollup the files in the tempdir
  const bundle = await rollup({
    input: join('output', 'index.js'),
    plugins: [
      replace({
        patterns: replacePatterns,
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
