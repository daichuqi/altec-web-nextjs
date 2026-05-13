import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const skippedDirectories = new Set([".git", ".next", "node_modules", "out"]);
const removedFiles = [];

async function clean(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectories.has(entry.name)) {
        continue;
      }

      await clean(absolutePath);
      continue;
    }

    if (entry.name === ".DS_Store") {
      await rm(absolutePath, { force: true });
      removedFiles.push(absolutePath);
    }
  }
}

await clean(projectRoot);

if (removedFiles.length > 0) {
  console.log(`Removed ${removedFiles.length} macOS metadata file(s).`);
}
