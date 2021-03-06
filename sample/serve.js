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
      documentCachingOptions: {
        timeoutSeconds: 1.5,
      },
      offlinePageOptions: {
        url: 'http://localhost:8080/menu/offline.html'
      }
    }, "./dist/core.js");
    await writeFile(path.join(__dirname, 'Blog', 'amp-sw.js'), serviceWorker);
    await writeFile(path.join(__dirname, 'Menu', 'amp-sw.js'), serviceWorker);
  });
})();
