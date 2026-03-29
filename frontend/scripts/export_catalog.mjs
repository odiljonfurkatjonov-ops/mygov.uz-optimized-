import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { CANONICAL_SERVICES, SITUATION_CHAINS, TRAINING_EXAMPLES } from '../src/data/catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);
const outDir = join(rootDir, '..', 'backend', 'data');
const outPath = join(outDir, 'services_catalog.json');

const payload = {
  exported_at: new Date().toISOString(),
  canonical_services: CANONICAL_SERVICES,
  situation_chains: SITUATION_CHAINS,
  training_examples: TRAINING_EXAMPLES,
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Exported ${CANONICAL_SERVICES.length} services to ${outPath}`);
