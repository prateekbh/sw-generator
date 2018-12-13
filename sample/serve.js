const {buildSW} = require('../lib/builder');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const http = require('http');
const handler = require('serve-handler');

const writeFile = promisify(fs.writeFile);

(function(){
  http.createServer((request, response) => {
    request.addListener('end', async () => {
      //
      // Serve files!
      //
      await handler(request, response, {
        "public": "sample"
      });
    }).resume();
  }).listen(8080, async () => {
    console.log('listening on http://localhost:8080/');
    const serviceWorker = await buildSW({
      assetCachingOptions: [
        {
          regexp: /cache.json$/,
          cachingStrategy: 'CACHE_FIRST',
        },
        {
          regexp: /network.json$/,
          cachingStrategy: 'NETWORK_FIRST',
        }
      ],
      mode: 'local'
    });
    await writeFile(path.join(__dirname, 'Blog', 'amp-sw.js'), serviceWorker);
    await writeFile(path.join(__dirname, 'Menu', 'amp-sw.js'), serviceWorker);
  });
})();
