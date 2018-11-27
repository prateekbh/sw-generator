const {buildSW} = require('../lib/builder');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const nodeStatic = require('node-static');
const http = require('http');

const writeFile = promisify(fs.writeFile);

(function(){
  const serveDir = new nodeStatic.Server('./sample');
  http.createServer((request, response) => {
    request.addListener('end', function () {
      //
      // Serve files!
      //
      serveDir.serve(request, response);
    }).resume();
  }).listen(5000, async () => {
    console.log('listening on http://localhost:5000/');
    const serviceWorker = await buildSW({
      documentCachingOptions: {
        timeoutSeconds: 1.5,
      },
      offlinePageOptions: {
        url: 'http://localhost:5000/menu/offline.html'
      }
    });
    await writeFile(path.join(__dirname, 'Blog', 'amp-sw.js'), serviceWorker);
    await writeFile(path.join(__dirname, 'Menu', 'amp-sw.js'), serviceWorker);
  });
})();
