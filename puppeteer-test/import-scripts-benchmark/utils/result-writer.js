import * as fs from 'fs';
import {promisify} from 'util';
const writeFile = promisify(fs.writeFile);

/**
 * Writes the given stats to a json file
 * @param {object} stats
 * @param {string} outpath
 */
export async function saveResults(stats, outpath) {
  let runningSWStats = [];
  const killedSWStats = [];
  stats.forEach(stat => {
    runningSWStats.push(stat.preKillTiming);
    killedSWStats.push(stat.postKillTiming);
  });
  runningSWStats = runningSWStats.concat(killedSWStats);
  await writeFile(outpath, JSON.stringify(runningSWStats));
}