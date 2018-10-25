import {buildSW} from '../';
import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import nodeStatic from 'node-static';
import http from 'http';

const writeFile = promisify(fs.writeFile);

(async function(){
  const serviceWorker = await buildSW({
    documentCachingOptions: {
      denyList: [/menu.amp.html/],
    },
    assetCachingOptions: [
      {
        regexp: /.(jpg|png|gif)$/,
        cachingStrategy: 'CACHE_FIRST'
      }
    ]
  });
  await writeFile(path.join(__dirname, 'amp-sw.js'), serviceWorker);
  const serveDir = new nodeStatic.Server('./sample');
  http.createServer((request, response) => {
    request.addListener('end', function () {
      //
      // Serve files!
      //
      serveDir.serve(request, response);
    }).resume();
  }).listen(5000, () => {
    console.log('listening on http://localhost:5000/');
  });
})();
