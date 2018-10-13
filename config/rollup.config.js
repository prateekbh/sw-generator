import replace from 'rollup-plugin-replace';
import pkg from '../package.json';

export default {
    output: {
      name: 'AmpServiceWorker',
      format: 'es',
      sourceMap: true,
    },
    plugins: [
        replace({
            __WORKBOX__VERSION__: pkg.devDependencies['workbox-sw']
        })
      ]
  };
