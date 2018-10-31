import { ServiceWorkerConfiguration } from '../configuration';

declare type BabelConfig = {
  babelrc: Boolean;
  plugins: Array<string | Array<any>>;
};

export default function({ assetCachingOptions }: ServiceWorkerConfiguration) {
  const babelConfig: BabelConfig = {
    babelrc: false,
    plugins: ['@babel/plugin-transform-async-to-generator'],
  };

  if (!assetCachingOptions || assetCachingOptions.length === 0) {
    console.log('removing cacheAssets');
    babelConfig.plugins.push([
      'filter-imports',
      {
        imports: {
          './asset-caching/index': ['cacheAssets'],
        },
      },
    ]);
  }

  return babelConfig;
}
