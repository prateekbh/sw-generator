const tmp = require('tmp');
const npmRun = require('npm-run');
const fs= require('fs');
const path = require('path');
const chalk = require('chalk');

const tmpobj = tmp.dirSync();
const tempDir = tmpobj.name;

// Transpile TSC in a temp dir
npmRun.sync(`tsc -p tsconfig.json --outDir ${tempDir}`);

const filename = path.join(tempDir, 'index.js');
const outfile = path.join(tempDir, 'build', 'index.js');

// rollup the files in the tempdir
npmRun.sync(`rollup ${filename} --config config/rollup.config.js --file ${outfile}`);

// return the generated SW
return fs.readFileSync(outfile, {
    encoding: 'UTF-8',
});
