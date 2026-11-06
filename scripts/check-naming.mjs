import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const PROJECT_ROOT = process.cwd();
const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;
const PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;
const CONSTANT_CASE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BOOLEAN_PREFIX = /^(is|has|can|should)[A-Z]/;
const CALLBACK_NAMES = new Set(['close', 'save', 'cancel', 'change', 'submit', 'action']);
const failures = [];

const report = (file, message) => failures.push(`${path.relative(PROJECT_ROOT, file)}: ${message}`);

function getFiles(directory) {

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!KEBAB_CASE.test(entry.name)) report(filePath, 'Folder must use kebab-case');
      return getFiles(filePath);
    }
    return [filePath];
  });
}

const sourceFiles = getFiles(path.join(PROJECT_ROOT, 'src'));
const configuration = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
const parsedConfiguration = ts.parseJsonConfigFileContent(
  configuration.config,
  ts.sys,
  PROJECT_ROOT,
);
const program = ts.createProgram(parsedConfiguration.fileNames, parsedConfiguration.options);
const checker = program.getTypeChecker();

function isBoolean(node) {

  const type = checker.getTypeAtLocation(node);
  return (
    Boolean(type.flags & ts.TypeFlags.BooleanLike) ||
    Boolean(
      type.isUnion?.() &&
        type.types.every(
          (member) => member.flags & (ts.TypeFlags.BooleanLike | ts.TypeFlags.Undefined),
        ),
    )
  );
}

function isCallable(node) {

  return checker.getNonNullableType(checker.getTypeAtLocation(node)).getCallSignatures().length > 0;
}

function isModuleConstant(node) {

  return (
    ts.isVariableDeclaration(node) &&
    ts.isVariableDeclarationList(node.parent) &&
    Boolean(node.parent.flags & ts.NodeFlags.Const) &&
    ts.isVariableStatement(node.parent.parent) &&
    ts.isSourceFile(node.parent.parent.parent)
  );
}

for (const filePath of sourceFiles) {
  // Generated shadcn primitives retain their upstream names and exports.
  if (filePath.includes('/shared/ui/primitives/')) continue;
  const filename = path.basename(filePath);
  if (filename.endsWith('.d.ts') || filename === 'index.ts' || filename === 'main.tsx') continue;
  if (
    filename.endsWith('.tsx') &&
    !/^(?:[a-z-]+\.)?routes\.tsx$/.test(filename) &&
    !PASCAL_CASE.test(filename.slice(0, -4))
  )
    report(filePath, 'React file must use PascalCase');
  if (filename.endsWith('.ts')) {
    const stem = filename.slice(0, -3);
    const isHookFile = /\/hooks\//.test(filePath) || /^use[A-Z]/.test(stem);
    if (isHookFile && !/^use[A-Z][a-zA-Z0-9]*$/.test(stem))
      report(filePath, 'Hook file must use useCamelCase');
    const isTypeFile = /\/types\//.test(filePath);
    if (isTypeFile) {
      const ast = ts.createSourceFile(
        filePath,
        fs.readFileSync(filePath, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      const definitions = ast.statements.filter(
        (node) => ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node),
      );
      if (definitions.length !== 1 || definitions[0]?.name.text !== stem || !PASCAL_CASE.test(stem))
        report(filePath, 'Type file must declare one matching PascalCase type');
      if (/Input$/.test(stem) && !/^I[A-Z]/.test(stem))
        report(filePath, 'Form input type must start with I');
    } else if (
      !isHookFile &&
      !/^src\/core\/api\/(apiClient|apiConfig|apiError|queryClient|readAllPages)\.ts$/.test(
        path.relative(PROJECT_ROOT, filePath),
      ) &&
      !KEBAB_CASE.test(stem.replace(/\.types$/, ''))
    )
      report(filePath, 'TypeScript file must use kebab-case');
  }
}
for (const sourceFile of program.getSourceFiles()) {
  const filePath = sourceFile.fileName;
  if (
    !filePath.startsWith(PROJECT_ROOT + '/src/') ||
    filePath.includes('/shared/ui/primitives/') ||
    sourceFile.isDeclarationFile
  )
    continue;
  const componentBindings = new Set();

  function collectTags(node) {

    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      ts.isIdentifier(node.tagName)
    )
      componentBindings.add(checker.getSymbolAtLocation(node.tagName));
    ts.forEachChild(node, collectTags);
  }

  collectTags(sourceFile);

  function visit(node) {

    if (
      (ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isTypeParameterDeclaration(node)) &&
      node.name &&
      !PASCAL_CASE.test(node.name.text)
    )
      report(filePath, `Type ${node.name.text} must use PascalCase`);
    if (ts.isEnumMember(node) && ts.isIdentifier(node.name) && !PASCAL_CASE.test(node.name.text))
      report(filePath, `Enum member ${node.name.text} must use PascalCase`);
    if (
      (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) &&
      node.name &&
      ts.isIdentifier(node.name)
    ) {
      const name = node.name.text;
      const component = filePath.endsWith('.tsx') && /^[A-Z]/.test(name);
      if (!(component ? PASCAL_CASE : CAMEL_CASE).test(name))
        report(filePath, `Function ${name} has invalid casing`);
    }
    if (
      (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) &&
      ts.isIdentifier(node.name)
    ) {
      const identifier = node.name;
      const name = identifier.text;
      if (name.startsWith('_')) return;
      const typeName = checker.typeToString(checker.getTypeAtLocation(identifier));
      const isSchema = Boolean(checker.getTypeAtLocation(identifier).getProperty('safeParse'));
      const isFunction = isCallable(identifier);
      const isContext = /Context</.test(typeName);
      const isServiceObject = /(?:Api|Service)$/.test(name) || name === 'apiClient';
      if (isSchema) {
        if (!CAMEL_CASE.test(name) || !name.endsWith('Schema'))
          report(filePath, `Schema ${name} must use camelCaseSchema`);
      } else if (isModuleConstant(node) && !isFunction && !isServiceObject) {
        if (!CONSTANT_CASE.test(name))
          report(filePath, `Module constant ${name} must use UPPER_SNAKE_CASE`);
      } else if (!isSchema && !isContext) {
        const component =
          filePath.endsWith('.tsx') &&
          /^[A-Z]/.test(name) &&
          (isFunction || componentBindings.has(checker.getSymbolAtLocation(identifier)));
        if (!(component ? PASCAL_CASE : CAMEL_CASE).test(name))
          report(filePath, `Binding ${name} must use ${component ? 'PascalCase' : 'camelCase'}`);
        if (!isFunction && isBoolean(identifier) && !BOOLEAN_PREFIX.test(name))
          report(filePath, `Boolean ${name} requires is/has/can/should prefix`);
      }
    }
    if (ts.isPropertySignature(node) && ts.isIdentifier(node.name)) {
      const parent = node.parent;
      const propsName = parent.name?.text || parent.parent?.name?.text || '';
      if (/Props$/.test(propsName)) {
        const name = node.name.text;
        if (isBoolean(node.name) && !BOOLEAN_PREFIX.test(name))
          report(filePath, `Boolean prop ${name} requires a prefix`);
        if (CALLBACK_NAMES.has(name) && isCallable(node.name))
          report(filePath, `Callback prop ${name} must start with on`);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}
if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`Naming check failed: ${failures.length} violations.`);
  process.exitCode = 1;
} else
  console.log(
    `Naming check passed for ${sourceFiles.length} source files (documented upstream and contract exceptions preserved).`,
  );
