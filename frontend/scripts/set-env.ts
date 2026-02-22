import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environment } from '@environments/environment';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const envFilePath = join(projectRoot, 'src/environments/environment.ts');

const generatedEnvironment: Partial<typeof environment> = {
  production: true,
  apiUrl: process.env['API_URL'] || 'http://localhost:3000/api',
};
const generatedEnvironmentContent = `export const environment = ${JSON.stringify(generatedEnvironment, null, 2)};\n`;

writeFileSync(envFilePath, generatedEnvironmentContent, 'utf8');
console.log('Generated environment file at:', envFilePath);
console.log(generatedEnvironment);
