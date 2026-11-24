// Make the AI Judge Laugh: the Office Joke Open — entry program (program/v1).
//
// Writes one single-line joke about office life, at most 200
// characters, to /output/entry.txt.
//
// The line was chosen against the judge's brief, in the order the judge
// weighs things:
//   1. A one-line joke about office life: the office printer and the
//      manager — unmistakably an office joke, told in a single line.
//   2. Funny: the punchline pays off the setup — the printer only jams
//      on urgent documents, so it must be reading the calendar, and
//      it reads it better than the manager does.
//   3. Specific office detail: the jammed printer, the urgent document,
//      the shared calendar — not a generic complaint about work.
//   4. Fresh: the joke turns the printer into the office's most
//      attentive reader, rather than retreading the meeting that
//      could have been an email.
//   5. Clear on first read: anyone who has worked in an office has
//      met both the jammed printer and the manager who never reads
//      the calendar, and no explanation is needed.
//
// The line: Our office printer only jams on urgent documents, which is
// how I know it reads my calendar better than my manager does.
// 119 characters, one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Our office printer only jams on urgent documents, which is how I know it reads my calendar better than my manager does.";

// Gate self-check, mirroring ONLY the sealed scorer: UTF-8 text of 1 to
// 200 characters, not only white space.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
  }
  if (!line.trim()) {
    throw new Error("line is only white space");
  }
}

gate(LINE);
// The harness runs the program with MAKEFUN_OUTPUT_DIR=/output; honour
// it when set so a local re-run lands in the same place as the grade.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, LINE, "utf8");
// Read back what was written and confirm it is exactly the gated line,
// so a partial or mangled write fails loudly instead of being judged.
const written = readFileSync(`${OUT_DIR}/entry.txt`, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the gated line");
}
gate(written);
