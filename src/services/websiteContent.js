import trucks from '../data/trucks.json';
import announcements from '../data/announcements.json';
import { normalizeTrucks, normalizeAnnouncements } from './contentRecords';

const apiBase = (import.meta.env.VITE_CONTENT_API_BASE_URL || '').replace(/\/$/, '');
async function readCollection(collection, localRecords) {
  if (!apiBase) return localRecords;
  const response = await fetch(`${apiBase}/${collection}`, { headers: { Accept: 'application/json' }, cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Unable to load ${collection} (${response.status}).`);
  return response.json();
}
export async function getTrucks() {
  return normalizeTrucks(await readCollection('trucks', trucks));
}
export async function getAnnouncements() {
  return normalizeAnnouncements(await readCollection('announcements', announcements));
}

export async function getCareers() {
  const records = await readCollection('careers', []);
  return normalizeAnnouncements(records).map(job => ({...job, qualifications: records.find(item => item.id === job.id)?.qualifications || ''}));
}
