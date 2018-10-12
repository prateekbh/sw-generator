import replace from 'rollup-plugin-replace';
import pkg from '../package.json';

export default {
    input: 'output/index.js',
    output: {
      name: 'AmpServiceWorker',
      format: 'es',
      file: 'build/index.js',
      sourceMap: true,
    },
    plugins: [
        replace({
            __WORKBOX__VERSION__: pkg.devDependencies['workbox-sw']
        })
      ]
  };
