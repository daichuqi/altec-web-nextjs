import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fail, projectRoot } from "./common.mjs";

export const localEnvFile = path.join(projectRoot, ".env.local");

export function loadLocalEnv(file = localEnvFile) {
  if (!existsSync(file)) {
    return;
  }

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

export function missingEnv(keys) {
  return keys.filter((key) => !process.env[key]);
}

export function assertRequiredEnv(keys, label = "environment variables") {
  const missing = missingEnv(keys);
  if (missing.length > 0) {
    fail(`Missing required ${label}: ${missing.join(", ")}`);
  }
}
