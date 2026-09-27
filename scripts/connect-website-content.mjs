// Activate the admin API only after its database is ready; preserve all Mailjet settings.
import { readFile, writeFile } from 'node:fs/promises';
import { normalizeTrucks, normalizeAnnouncements } from '../src/services/contentRecords.js';
const base = (process.argv[2] || 'http://localhost:5001/api/website').replace(/\/$/, '');
const parsed = new URL(base);
if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error('Use a public HTTP(S) API URL without credentials.');
try {
  for (const [collection,normalize] of [['trucks',normalizeTrucks],['announcements',normalizeAnnouncements]]) {
    const response = await fetch(`${base}/${collection}`, {signal:AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error(`${collection} endpoint returned ${response.status}. Ask your partner to run 001_website_content.sql and restart the backend first.`);
    normalize(await response.json());
  }
  const file = new URL('../.env.local', import.meta.url);
  let env = await readFile(file,'utf8').catch(error=>{if(error.code==='ENOENT')return '';throw error;});
  env = env.replace(/^VITE_CONTENT_API_BASE_URL=.*\r?\n?/gm,'');
  await writeFile(file,`${env.trimEnd()}\nVITE_CONTENT_API_BASE_URL=${base}\n`,{mode:0o600});
  console.log('Website content connected. Restart npm run dev to load the setting.');
} catch(error) { console.error(error.message);process.exitCode=1; }
