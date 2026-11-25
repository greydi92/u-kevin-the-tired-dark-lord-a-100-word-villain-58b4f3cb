// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one ~100-word monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Iterate round 1 (2026-11-25): the draft said "the ink looks tired" —
// that *announced* the weariness. Now the ink gives up halfway instead:
// the exhaustion is shown in the voice, never named.
// No network, no input files, no secrets. Exits 0.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = `Come in. No, don't kneel, the floor's cold. Three hundred years I've ruled the Ashen Marches, and tonight the ritual finally aligns: the eclipse, the bell, the blood of— hold on. Marlow, did you feed the ravens? No? Then the ravens eat first, the apocalypse waits. I wrote the proclamation in triplicate. Triplicate. Even the ink gave up halfway. You ask if I still want the world? Of course. I just want it after lunch. After a sit-down. After someone else carries the crown up the stairs. Kneel if you must. I'll be right here, plotting. Slowly. Very, very slowly.`;

// Resolve the output directory: explicit env first, then /output.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR?.trim() ||
  process.env.MAKEFUN_BOT_DIR?.trim() ||
  "/output";

mkdirSync(outDir, { recursive: true });

// Gate guard: the sealed scorer needs UTF-8 text of 1-600 characters,
// not only whitespace. Fail loudly here rather than shipping a bad file.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 600 || ENTRY.trim().length === 0) {
  throw new Error(`entry out of gate bounds: ${chars} characters`);
}
const words = ENTRY.trim().split(/\s+/).length;
if (words < 90 || words > 110) {
  throw new Error(`entry off target length: ${words} words`);
}

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Keep the script dir import so the entrypoint is self-contained and
// path-independent even if the grader moves the working directory.
void dirname(fileURLToPath(import.meta.url));
