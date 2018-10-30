import { DocumentCachingOptions } from './modules/document-caching';
import { AssetCachingOptions } from './modules/asset-caching';

export interface ServiceWorkerConfiguration {
  documentCachingOptions: DocumentCachingOptions;
  assetCachingOptions: AssetCachingOptions;
}
