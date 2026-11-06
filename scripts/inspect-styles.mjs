import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import postcss from 'postcss';

/** Expand relative imports in cascade order; preserve selectors, values and nested rule order. */

export function inspectStyles(file, stack = []) {

  if (stack.includes(file)) throw Error('CSS import cycle: ' + file);
  const root = postcss.parse(fs.readFileSync(file, 'utf8'));

  function project(node) {

    if (node.type === 'comment') return [];
    if (node.type === 'atrule' && node.name === 'import' && /^['"]\./.test(node.params)) {
      const relative = node.params.match(/^['"]([^'"]+)['"]$/)?.[1];
      if (!relative) throw Error('Unsupported conditional local import: ' + node.params);
      return inspectStyles(path.resolve(path.dirname(file), relative), [...stack, file]);
    }
    const entry = { type: node.type };
    for (const key of ['name', 'params', 'selector', 'prop', 'value', 'important']) {
      if (node[key] !== undefined)
        entry[key] =
          typeof node[key] === 'string' ? node[key].trim().replace(/\s+/g, ' ') : node[key];
    }
    if (node.nodes) entry.nodes = node.nodes.flatMap(project);
    return [entry];
  }

  return root.nodes.flatMap(project);
}

export function styleFingerprint(file = 'src/app/styles.css') {

  return createHash('sha256')
    .update(JSON.stringify(inspectStyles(path.resolve(file))))
    .digest('hex');
}
