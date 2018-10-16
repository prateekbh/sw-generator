import { dir } from 'tmp';
import npmRun from 'npm-run';
import { join } from 'path';
import { rollup } from 'rollup';
import { promisify } from 'util';
import replace from 'rollup-plugin-replace';
import { devDependencies } from './package.json';

export async function buildSW() {
  const createTempDir = promisify(dir);
  const tempDir = await createTempDir({});

  // Would like to use the TSC JavaScript API, but it is not stable yet.
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  // Until then, use npm to transpile Typescript into a temp directory.
  npmRun.sync(`tsc -p ./src/tsconfig.json --outDir ${tempDir}`);
  
  // rollup the files in the tempdir
  const bundle = await rollup({
    input: join(tempDir, 'index.js'),
    plugins: [
      replace({
        __WORKBOX__VERSION__: devDependencies['workbox-sw'],
      }),
    ],
  });
  const { code } = await bundle.generate({
    name: 'AmpServiceWorker',
    format: 'es',
    sourceMap: true,
  });
  
  return code;
}
