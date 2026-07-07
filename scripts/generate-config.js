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

const rootDir = path.join(__dirname, '..');
loadEnvFile(path.join(rootDir, '.env'));
loadEnvFile(path.join(rootDir, '.env.local'));

const key = process.env.WEB3FORMS_ACCESS_KEY?.trim().replace(/^["']|["']$/g, '');

if (!key) {
  console.error('Missing WEB3FORMS_ACCESS_KEY environment variable.');
  process.exit(1);
}

const configPath = path.join(rootDir, 'config.js');
const contents = `window.PORTFOLIO_CONFIG = {
  web3formsAccessKey: '${key}'
};
`;

fs.writeFileSync(configPath, contents);
console.log('Generated config.js for deployment.');
