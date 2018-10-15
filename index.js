import {dir} from 'tmp';
import npmRun from 'npm-run';
import {join} from 'path';
import {rollup} from 'rollup';
import {promisify} from 'util';
import replace from 'rollup-plugin-replace';
import {devDependencies} from './package.json'

export async function buildSW() {
  const createTempDir = promisify(dir);
  const tempDir = await createTempDir({});
  // Transpile TSC in a temp dir
  npmRun.sync(`tsc -p ./src/tsconfig.json --outDir ${tempDir}`);
  const filename = join(tempDir, 'index.js');
  // rollup the files in the tempdir
  const bundle = await rollup({
    input: filename,
    plugins: [
      replace({
          __WORKBOX__VERSION__: devDependencies['workbox-sw']
      })
    ]
  });
  const {code} = await bundle.generate({
    name: 'AmpServiceWorker',
    format: 'es',
    sourceMap: true,
  });

  return code
}
