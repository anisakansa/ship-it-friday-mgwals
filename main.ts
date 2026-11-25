// Ship It Friday — make.fun entry (u-mgwals-ship-it-friday-30bd407a).
// One-line git commit message from an AI coding agent, written just
// before it breaks production on a Friday.
//
// Deterministic by design: the entry is a constant string plus a pure
// gate. No clock, no Date, no Math.random, no network, no environment
// reads. The program only writes the entry file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix: replaced the database with a JSON file, it is Friday, the backup was just vibes anyway";

// Gate (deterministic, exact): the competition gate allows 1-159 UTF-8
// characters, not only whitespace. This entry pins its exact length.
const EXPECTED_LENGTH = 91;

function isPureAscii(text: string): boolean {
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) > 127) return false;
  }
  return true;
}

function gate(text: string): void {
  if (text.length !== EXPECTED_LENGTH) {
    throw new Error(`entry length ${text.length}, expected ${EXPECTED_LENGTH}`);
  }
  if (text.length < 1 || text.length > 159) {
    throw new Error("entry outside the 1-159 character gate");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim() !== text) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (!isPureAscii(text)) {
    throw new Error("entry must be pure ASCII");
  }
  // Rubric guard: must read as a real commit message (conventional
  // prefix) and must carry the Friday feeling explicitly.
  if (!/^(fix|feat|chore|refactor): /.test(text)) {
    throw new Error("entry must start with a conventional commit prefix");
  }
  if (!text.includes("Friday")) {
    throw new Error("entry must carry the Friday feeling");
  }
}

gate(ENTRY);

const outDir = join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip check: the file on disk must be byte-identical to the
// constant, with no trailing newline added.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip mismatch: file differs from entry");
}
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
