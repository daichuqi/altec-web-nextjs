import { access, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export const projectRoot = process.cwd();
export const publicRoot = path.join(projectRoot, "public");
export const sourceRoot = path.join(projectRoot, "src");

export function fail(message) {
  console.error(message);
  process.exit(1);
}

export async function pathExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

export const fileExists = pathExists;

export function relativeToRoot(file) {
  return path.relative(projectRoot, file);
}

export async function walkFiles(directory, options = {}) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (options.skipDirectory?.(entry.name, absolutePath)) {
        continue;
      }

      files.push(...(await walkFiles(absolutePath, options)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}
