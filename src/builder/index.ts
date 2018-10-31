import { join } from 'path';
import { rollup } from 'rollup';
import getBabelConfig from './babel';

// @ts-ignore
import npmRun from 'npm-run';
// @ts-ignore
import replace from 'rollup-plugin-re';
// @ts-ignore
import resolve from 'rollup-plugin-node-resolve';
// @ts-ignore
import babel from 'rollup-plugin-babel';
import { serializeObject } from './serialize';
import { ServiceWorkerConfiguration } from '../configuration';
//import compiler from '@ampproject/rollup-plugin-closure-compiler';

export async function buildSW(
  {
    documentCachingOptions,
    assetCachingOptions,
  }: ServiceWorkerConfiguration = {
    documentCachingOptions: {},
    assetCachingOptions: undefined,
  },
) {
  // Would like to use the TSC JavaScript API, but it is not stable yet.
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // Until then, use npm to transpile Typescript into a temp directory.
  npmRun.sync(`tsc -p ./src/tsconfig.json`);

  const replacePatterns = [
    {
      test: 'process.env.NODE_ENV',
      replace: "'production'",
    },
  ];

  if (documentCachingOptions) {
    replacePatterns.push({
      test: '__REPLACE_CONFIG_documentCachingOptions = {}',
      replace: `__REPLACE_CONFIG_documentCachingOptions = ${serializeObject(
        documentCachingOptions,
      )}`,
    });
  }

  if (assetCachingOptions) {
    replacePatterns.push({
      test: '__REPLACE_CONFIG_assetCachingOptions = []',
      replace: `__REPLACE_CONFIG_assetCachingOptions = ${serializeObject(
        assetCachingOptions,
      )}`,
    });
  }

  const babelConfig = getBabelConfig({
    documentCachingOptions,
    assetCachingOptions,
  });

  // rollup the files in the tempdir
  const bundle = await rollup({
    input: join('lib', 'generator', 'index.js'),
    plugins: [
      resolve({}),
      babel(babelConfig),
      replace({
        patterns: replacePatterns,
      }),
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
    sourcemap: true,
  });

  return code;
}
