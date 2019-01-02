import * as fs from 'fs';
import {promisify} from 'util';
import {argv} from 'yargs';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async function(){
  const timings = JSON.parse(await readFile(`${__dirname}/${argv.filename}`));
  let output = '';
  const keys = Object.keys(timings[0].preKillTiming);
  output = `STATE,${keys.join(',')}\n`;
  timings.forEach(timing => {
    const preKillValues = Object.values(timing.preKillTiming).join(',');
    const postKillValues = Object.values(timing.postKillTiming).join(',');
    output+=`SW was awake,${preKillValues}\n`;
    output+=`SW was stopped,${postKillValues}\n`;
  });
  console.log(output);
})();