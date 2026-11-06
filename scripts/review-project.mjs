import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';

const root = process.cwd();
const configuration = ts.parseJsonConfigFileContent(
  ts.readConfigFile('tsconfig.json', ts.sys.readFile).config,
  ts.sys,
  root,
);
const program = ts.createProgram(configuration.fileNames, configuration.options);
const checker = program.getTypeChecker();

function walk(directory) {

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const records = [];
for (const file of walk('src')) {
  const code = fs.readFileSync(file, 'utf8');
  const owner = file.match(/^src\/features\/([^/]+)\//)?.[1] || file.split('/')[1];
  const record = {
    file,
    owner,
    lines: code.split('\n').length,
    sha256: createHash('sha256').update(code).digest('hex'),
    functions: [],
    imports: [],
    http: [],
    schemas: [],
    findings: [],
  };
  const source = program.getSourceFile(path.resolve(file));
  if (source) {
    function location(node) {

      return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
    }

    function visit(node) {

      if (ts.isImportDeclaration(node)) record.imports.push(node.moduleSpecifier.text);
      if (
        (ts.isFunctionDeclaration(node) ||
          ts.isArrowFunction(node) ||
          ts.isFunctionExpression(node) ||
          ts.isMethodDeclaration(node)) &&
        node.body
      ) {
        record.functions.push({
          name:
            node.name?.getText(source) ||
            (ts.isVariableDeclaration(node.parent)
              ? node.parent.name.getText(source)
              : '(callback)'),
          line: location(node),
          end: source.getLineAndCharacterOfPosition(node.end).line + 1,
        });
      }
      if (ts.isCallExpression(node)) {
        const target = node.expression.getText(source);
        if (/^(eval|Function)$/.test(target))
          record.findings.push({
            severity: 'high',
            line: location(node),
            kind: 'dynamic-code-execution',
          });
        if (/^apiClient\.(get|post|put|patch|delete)$/.test(target))
          record.http.push({
            line: location(node),
            method: target.slice(10).toUpperCase(),
            target: node.arguments[0]?.getText(source),
          });
        const tags = checker.getResolvedSignature(node)?.getJsDocTags() || [];
        const deprecated = tags.find((tag) => tag.name === 'deprecated');
        if (deprecated)
          record.findings.push({
            severity: 'review',
            line: location(node),
            kind: 'deprecated-api',
            api: ts.isPropertyAccessExpression(node.expression)
              ? node.expression.name.text
              : target.slice(0, 120),
            detail: deprecated.text?.map((item) => item.text).join(''),
          });
      }
      if (ts.isVariableDeclaration(node) && /schema$/i.test(node.name.getText(source)))
        record.schemas.push({ name: node.name.getText(source), line: location(node) });
      if (ts.isJsxAttribute(node) && node.name.getText(source) === 'dangerouslySetInnerHTML')
        record.findings.push({ severity: 'high', line: location(node), kind: 'raw-html' });
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getText(source) === 'iframe' &&
        !node.attributes.properties.some((prop) => prop.name?.getText(source) === 'sandbox')
      )
        record.findings.push({
          severity: 'high',
          line: location(node),
          kind: 'unsandboxed-iframe',
        });
      ts.forEachChild(node, visit);
    }

    visit(source);
  }
  if (record.lines > 400)
    record.findings.push({
      severity: 'review',
      kind: 'large-module',
      detail: 'Review cohesive responsibilities; line count alone is not a defect.',
    });
  records.push(record);
}
const features = Object.fromEntries(
  [...new Set(records.map((record) => record.owner))].sort().map((owner) => {
    const files = records.filter((record) => record.owner === owner);
    return [
      owner,
      {
        files: files.length,
        functions: files.reduce((sum, file) => sum + file.functions.length, 0),
        http: files.reduce((sum, file) => sum + file.http.length, 0),
        schemas: files.flatMap((file) =>
          file.schemas.map((schema) => ({ file: file.file, ...schema })),
        ),
        findings: files.flatMap((file) =>
          file.findings.map((finding) => ({ file: file.file, ...finding })),
        ),
      },
    ];
  }),
);
if (!process.argv.includes('--check')) {
  fs.mkdirSync('docs/review', { recursive: true });
  fs.writeFileSync(
    'docs/review/source-inventory.json',
    JSON.stringify(
      {
        basis: '5ecc3cb',
        scope:
          'AST and full-file inventory; not a claim of manual line-by-line security certification',
        features,
        files: records,
      },
      null,
      2,
    ) + '\n',
  );
  const ignored = new Set(['.git', 'node_modules', 'dist', 'playwright-report', 'test-results']);
  const generated = new Set([
    'docs/review/source-inventory.json',
    'docs/review/project-files.json',
  ]);

  function projectFiles(directory = '.') {

    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      if (
        ignored.has(entry.name) ||
        (entry.name.startsWith('.env') && entry.name !== '.env.example')
      )
        return [];
      const file = path.join(directory, entry.name).replaceAll('\\', '/');
      if (generated.has(file)) return [];
      return entry.isDirectory() ? projectFiles(file) : [file];
    });
  }

  const inventory = projectFiles().map((file) => {
    const buffer = fs.readFileSync(file);
    const textFile =
      /\.(ts|tsx|mjs|js|css|json|md|html|yml|txt|svg)$/.test(file) ||
      file === '.env.example' ||
      file === '.npmrc';
    const record = {
      file,
      bytes: buffer.length,
      sha256: createHash('sha256').update(buffer).digest('hex'),
      category: file.startsWith('src/')
        ? 'product-source'
        : file.startsWith('tests/')
          ? 'test'
          : file.startsWith('scripts/')
            ? 'tooling'
            : file.startsWith('docs/')
              ? 'documentation'
              : /^(public|vendor)\//.test(file)
                ? 'asset'
                : 'configuration',
    };
    if (textFile) record.lines = buffer.toString('utf8').split('\n').length;
    if (/\.(tsx?|mjs|js)$/.test(file)) {
      const source = ts.createSourceFile(
        file,
        buffer.toString('utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      record.functions = [];

      function visit(node) {

        if (
          (ts.isFunctionDeclaration(node) ||
            ts.isArrowFunction(node) ||
            ts.isFunctionExpression(node) ||
            ts.isMethodDeclaration(node)) &&
          node.body
        )
          record.functions.push({
            name:
              node.name?.getText(source) ||
              (ts.isVariableDeclaration(node.parent)
                ? node.parent.name.getText(source)
                : '(callback)'),
            line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
            end: source.getLineAndCharacterOfPosition(node.end).line + 1,
          });
        ts.forEachChild(node, visit);
      }

      visit(source);
    }
    return record;
  });
  fs.writeFileSync(
    'docs/review/project-files.json',
    JSON.stringify(
      {
        scope:
          'All non-generated project files; dependency/build outputs and local secret files excluded',
        files: inventory,
      },
      null,
      2,
    ) + '\n',
  );
}
console.log(
  `${records.length} files indexed; ${records.reduce((sum, file) => sum + file.functions.length, 0)} functions; ${records.flatMap((file) => file.findings).length} review findings`,
);

if (process.argv.includes('--check')) {
  const failures = records.flatMap((record) =>
    record.findings
      .filter((finding) => finding.kind === 'deprecated-api' || finding.severity === 'high')
      .map((finding) => ({ file: record.file, ...finding })),
  );
  for (const failure of failures) console.error(JSON.stringify(failure));
  if (failures.length) process.exitCode = 1;
}
