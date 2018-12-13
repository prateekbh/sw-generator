import { promisify } from 'util';
import { exec } from 'child_process';
import chalk from 'chalk';

export async function sh (command, { cwd, logger = console, outputFilter = String } = {}) {
  try {
    let { stdout, stderr } = await promisify(exec)(command, { cwd });
    stdout = outputFilter(stdout.toString()).trim();
    stderr = outputFilter(stderr.toString()).trim();
    if (stdout && stdout.length) logger.info(chalk.dim((stdout)));
    if (stderr && stderr.length) logger.error(chalk.red.dim((stderr)));
    return stdout;
  } catch (err) {
    logger.error(chalk.red(`Error: ${err}`));
    throw err;
  }
}