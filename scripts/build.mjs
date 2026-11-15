import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const path = relative => fileURLToPath(new URL(relative, root));
const {version} = JSON.parse(await readFile(path('package.json'), 'utf8'));
await rm(path('dist/'), {recursive: true, force: true});
await cp(path('public/'), path('dist/'), {recursive: true});
await cp(path('src/'), path('dist/src/'), {recursive: true});

const runtime = 'node_modules/@mediapipe/tasks-vision/';
await mkdir(path('dist/vendor/'));
await cp(path(runtime + 'vision_bundle.mjs'), path('dist/vendor/vision_bundle.mjs'));
await cp(path(runtime + 'wasm/'), path('dist/vendor/'), {recursive: true});

const html = await readFile(path('dist/index.html'), 'utf8');
await writeFile(path('dist/index.html'), html.replace('__APP_VERSION__', version));
