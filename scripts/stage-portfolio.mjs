import {cp, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const portfolio = process.argv[2];
if (!portfolio) {
  throw new Error('Pass the path to the holynova.github.io master checkout.');
}

const config = JSON.parse(await readFile(resolve(portfolio, 'wrangler.jsonc'), 'utf8'));
if (config.name !== 'xiaosang-portfolio' || config.assets?.directory !== '.') {
  throw new Error('Expected the xiaosang-portfolio Worker source.');
}

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
await cp(dist, resolve(portfolio, 'photo-breakout'), {recursive: true});
