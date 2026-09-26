import trucks from '../data/trucks.json';
import announcements from '../data/announcements.json';
import { normalizeTrucks, normalizeAnnouncements } from './contentRecords';

const apiBase = (import.meta.env.VITE_CONTENT_API_BASE_URL || '').replace(/\/$/, '');
async function readCollection(collection, localRecords) {
  if (!apiBase) return localRecords;
  const response = await fetch(`${apiBase}/${collection}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Unable to load ${collection} (${response.status}).`);
  return response.json();
}
export async function getTrucks() {
  return normalizeTrucks(await readCollection('trucks', trucks));
}
export async function getAnnouncements() {
  return normalizeAnnouncements(await readCollection('announcements', announcements));
}
