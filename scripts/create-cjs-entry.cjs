const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const distDir = join(__dirname, '..', 'dist');
const cjsDir = join(distDir, 'cjs');

mkdirSync(distDir, { recursive: true });
mkdirSync(cjsDir, { recursive: true });

// Mark the CJS output so Node treats .js files in this folder as CommonJS.
writeFileSync(join(cjsDir, 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 2));

// Expose the CommonJS entrypoint where consumers expect it.
writeFileSync(join(distDir, 'index.cjs'), "module.exports = require('./cjs/index.js');\n");
