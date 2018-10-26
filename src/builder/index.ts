import { join } from 'path';
import { rollup } from 'rollup';
import { DocumentCachingOptions } from '../generator/modules/document-caching';
import { AssetCachingOptions } from '../generator/modules/asset-caching';
import getBabelConfig from './babel';

// @ts-ignore
import npmRun from 'npm-run';
// @ts-ignore
import replace from 'rollup-plugin-re';
// @ts-ignore
import resolve from 'rollup-plugin-node-resolve';
// @ts-ignore
import babel from 'rollup-plugin-babel';
//import compiler from '@ampproject/rollup-plugin-closure-compiler';

export async function buildSW(
  {
    documentCachingOptions,
    assetCachingOptions,
  }: {
    documentCachingOptions: DocumentCachingOptions | null;
    assetCachingOptions: AssetCachingOptions | null;
  } = { documentCachingOptions: null, assetCachingOptions: null },
) {
  // Would like to use the TSC JavaScript API, but it is not stable yet.
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // Until then, use npm to transpile Typescript into a temp directory.
  npmRun.sync(`tsc -p ./src/tsconfig.json --outDir lib`);

  const replacePatterns = [
    {
      test: 'process.env.NODE_ENV',
      replace: "'production'",
    },
  ];

  if (documentCachingOptions) {
    // Manually traverse through both lists as JSON.stringify does not work for regexp
    const tempDocCachingOptions: DocumentCachingOptions = {};
    if (documentCachingOptions.allowList) {
      tempDocCachingOptions.allowList = [];
      documentCachingOptions.allowList.forEach(regexp => {
        tempDocCachingOptions.allowList &&
          tempDocCachingOptions.allowList.push(regexp.toString());
      });
    } else if (documentCachingOptions.denyList) {
      tempDocCachingOptions.denyList = [];
      documentCachingOptions.denyList.forEach(regexp => {
        tempDocCachingOptions.denyList &&
          tempDocCachingOptions.denyList.push(regexp.toString());
      });
    }
    tempDocCachingOptions.timeoutSeconds =
      documentCachingOptions.timeoutSeconds || 2;
    replacePatterns.push({
      test: '__REPLACE_CONFIG_documentCachingOptions = {}',
      replace: `__REPLACE_CONFIG_documentCachingOptions = ${JSON.stringify(
        tempDocCachingOptions,
      )}`,
    });
  }

  if (assetCachingOptions) {
    const tempAssetCachingOptions = assetCachingOptions.map(config => {
      return {
        regexp: config.regexp.toString(),
        cachingStrategy: config.cachingStrategy,
      };
    });
    replacePatterns.push({
      test: '__REPLACE_CONFIG_assetCachingOptions = []',
      replace: `__REPLACE_CONFIG_assetCachingOptions = ${JSON.stringify(
        tempAssetCachingOptions,
      )}`,
    });
  }

  const babelConfig = getBabelConfig();

  if (!assetCachingOptions || assetCachingOptions.length === 0) {
    babelConfig.plugins.push([
      'filter-imports',
      {
        imports: {
          './modules/asset-caching/index': ['cacheAssets'],
        },
      },
    ]);
  }

  // rollup the files in the tempdir
  const bundle = await rollup({
    input: join('lib', 'generator', 'index.js'),
    plugins: [
      replace({
        patterns: replacePatterns,
      }),
      resolve({}),
      babel(babelConfig),
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
