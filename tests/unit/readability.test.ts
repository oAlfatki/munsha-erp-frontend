import { expect, it } from 'vitest';
import { formatCode } from '../../scripts/format.mjs';

it('enforces requested spacing and remains idempotent', async () => {
  const text =
    "import {x} from 'x';\nexport function first(){return x;}\nexport function second(){return first();}";
  const formatted = await formatCode(text, 'src/readability-example.ts');
  expect(formatted).toContain("from 'x';\n\n");
  expect(formatted).toMatch(/function first\(\) \{\n\n  return/);
  expect(formatted).toContain('}\n\nexport function second');
  expect(await formatCode(formatted, 'src/readability-example.ts')).toBe(formatted);
});

it('preserves semantic lint directives during the formatting-only pass', async () => {
  const text =
    "export function clean(value: string) {\n// eslint-disable-next-line no-control-regex -- File name controls.\nreturn value.replace(/[\\u0000-\\u001f]/g, '');\n}";
  expect(await formatCode(text, 'src/readability-example.ts')).toContain(
    'eslint-disable-next-line no-control-regex',
  );
});

it('keeps documentation attached and separates named methods and their bodies', async () => {
  const text =
    '/** Public operation. */\nexport function run(){return 1;}\nconst api={one(){return run();},two:()=>{return 2;}};';
  const formatted = await formatCode(text, 'src/readability-example.ts');
  expect(formatted).toContain('/** Public operation. */\nexport function');
  expect(formatted).toContain('one() {\n\n');
  expect(formatted).toContain('},\n\n  two:');
  expect(await formatCode(formatted, 'src/readability-example.ts')).toBe(formatted);
});
