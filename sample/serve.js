import {buildSW} from '../';
import serve from 'serve';
import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

const writeFile = promisify(fs.writeFile);

(async function(){
  const serviceWorker = await buildSW({});
  await writeFile(path.join(__dirname, 'sw.js'), serviceWorker);
  serve(__dirname);
})();
