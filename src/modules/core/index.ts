/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AmpCachingModule } from '../amp-caching/index';
import { DocumentCachingModule } from '../document-caching/index';
import { AmpSwModule } from './AmpSwModule';
import { ServiceWorkerConfiguration } from '../../configuration';
declare global {
  interface WorkerGlobalScope {
    AMP_SW: {
      modules: AmpSWModules;
      registerModule: Function;
      init: Function;
    };
  }
}

interface AmpSWModules {
  [key: string]: AmpSwModule;
}

function init(config: ServiceWorkerConfiguration) {
  // Initialize all registered modules.
  const { modules } = self.AMP_SW;
  for (const moduleKey in modules) {
    const module = modules[moduleKey];
    const moduleConfig = getModuleConfig(config, moduleKey);
    module.init(moduleConfig);
  }
}

function getModuleConfig(
  config: ServiceWorkerConfiguration,
  moduleKey: string,
) {
  switch (moduleKey) {
    case 'DocumentCachingOptions':
      return config.documentCachingOptions;
    case 'AssetCachingOptions':
      return config.assetCachingOptions;
    default:
      return;
  }
}

function registerModule(moduleName: string, module: AmpSwModule) {
  self['AMP_SW'].modules[moduleName] = module;
}

// Initialize AMP_SW namespace
self['AMP_SW'] = {
  modules: {},
  init,
  registerModule,
};

const ampCachingModule = new AmpCachingModule();
registerModule(ampCachingModule.constructor.name, ampCachingModule);

const documentCachingModule = new DocumentCachingModule();
registerModule(documentCachingModule.constructor.name, documentCachingModule);

// Taking over the document

self.addEventListener('install', function(e: ExtendableEvent) {
  const { skipWaiting } = self as ServiceWorkerGlobalScope;
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', async (e: ExtendableEvent) => {
  const { clients } = self as ServiceWorkerGlobalScope;
  e.waitUntil(
    clients.claim().then(async () => {
      // Cache current document if its AMP.
      const windowClients = await clients.matchAll({ type: 'window' });
      return Promise.all(documentCachingModule.cacheAMPDocument(windowClients));
    }),
  );
});
