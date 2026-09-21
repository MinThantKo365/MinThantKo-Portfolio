const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const name = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[name]) process.env[name] = value;
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.copyFileSync(src, dest);
}

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

loadEnvFile(path.join(rootDir, '.env'));
loadEnvFile(path.join(rootDir, '.env.local'));

const key = process.env.WEB3FORMS_ACCESS_KEY?.trim().replace(/^["']|["']$/g, '');

if (!key) {
  console.error('Missing WEB3FORMS_ACCESS_KEY environment variable.');
  process.exit(1);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const siteFiles = ['index.html', 'style.css', 'script.js'];
for (const file of siteFiles) {
  fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
}

copyRecursive(path.join(rootDir, 'source_file'), path.join(distDir, 'source_file'));

const configContents = `window.PORTFOLIO_CONFIG = {
  web3formsAccessKey: '${key}'
};
`;

fs.writeFileSync(path.join(rootDir, 'config.js'), configContents);
fs.writeFileSync(path.join(distDir, 'config.js'), configContents);

console.log('Built dist/ and generated config.js for deployment.');
