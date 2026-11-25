// bounty-entrants-03 entry (Node 22, standard library only).
//
// The entry is the bounties themselves: this repository names, in
// BOUNTY.json, the bounties we sponsored on make.fun. The house counts
// their entrants in make.fun's own database, so this program does not
// score anything and does not need the network. Its only job is to hand
// BOUNTY.json to the grader: read it from the repository root and write
// it to /output/BOUNTY.json, where the gate reads it.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'BOUNTY.json');
const target = join(OUTPUT_DIR, 'BOUNTY.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

let text: string;
try {
  text = readFileSync(source, 'utf-8');
} catch (err) {
  console.error(`BOUNTY.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Fail fast on a malformed bounty file instead of handing the gate bad JSON.
try {
  const parsed = JSON.parse(text) as { bounties?: unknown; url?: unknown };
  const names = parsed.bounties ?? (parsed.url ? [parsed.url] : []);
  if (!Array.isArray(names) || names.length === 0) {
    throw new Error('BOUNTY.json names no bounties');
  }
  console.log(`BOUNTY.json names ${names.length} ${names.length === 1 ? 'bounty' : 'bounties'}`);
} catch (err) {
  console.error(`BOUNTY.json is not valid: ${(err as Error).message}`);
  process.exit(1);
}

writeFileSync(target, text);
console.log(`BOUNTY.json copied to ${target}`);
