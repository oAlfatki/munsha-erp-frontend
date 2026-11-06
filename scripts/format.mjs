import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ESLint } from 'eslint';
import * as prettier from 'prettier';
import tseslint from 'typescript-eslint';
import { readabilityPlugin } from './eslint/readability.mjs';

const spacing = new ESLint({
  overrideConfigFile: true,
  fix: true,
  overrideConfig: [
    {
      files: ['**/*.{ts,tsx,js,mjs}'],
      linterOptions: { reportUnusedDisableDirectives: 'off' },
      languageOptions: { parser: tseslint.parser },
      plugins: { readability: readabilityPlugin },
      rules: { 'readability/spacing': 'error' },
    },
  ],
});

/** Prettier owns syntax layout; the final ESLint pass preserves requested function-body spacing. */

export async function formatCode(text, filePath) {

  const options = await prettier.resolveConfig(filePath);
  const formatted = await prettier.format(text, { ...options, filepath: filePath });
  if (!/\.[cm]?[jt]sx?$/.test(filePath)) return formatted;
  const [result] = await spacing.lintText(formatted, { filePath });
  if (result.fatalErrorCount) throw Error('Cannot format ' + filePath);
  return result.output ?? formatted;
}

async function collect(directory) {

  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const file = path.join(directory, entry.name);
      // This archived oracle is byte-checked; its formatting is intentionally historical.
      if (file === path.join('tests', 'reference')) return [];
      return entry.isDirectory() ? collect(file) : [file];
    }),
  );
  return files.flat().filter((file) => /\.(ts|tsx|mjs|css|json|md)$/.test(file));
}

async function main() {

  const shouldWrite = process.argv.includes('--write');
  const files = [
    ...(await Promise.all(['src', 'tests', 'scripts'].map(collect))).flat(),
    'eslint.config.mjs',
    'vite.config.ts',
    'vitest.config.ts',
    'playwright.config.ts',
    'README.md',
  ];
  let changes = 0;
  for (const file of files) {
    const text = await fs.readFile(file, 'utf8');
    const formatted = await formatCode(text, file);
    if (text === formatted) continue;
    changes++;
    if (shouldWrite) await fs.writeFile(file, formatted);
    else console.error('Formatting differs: ' + file);
  }
  console.log(
    `${files.length} files checked; ${changes} ${shouldWrite ? 'formatted' : 'differences'}`,
  );
  if (changes && !shouldWrite) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
