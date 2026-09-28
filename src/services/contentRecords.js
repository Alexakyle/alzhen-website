import { truckName } from '../data/truckTypes.js';
export const MAX_TRUCK_IMAGES = 3;
const text = value => typeof value === 'string' ? value.trim() : '';
export function imageUrl(value) {
  const url = text(value);
  return (/^https?:\/\//i.test(url) || /^\/(?!\/)/.test(url)) ? url : '';
}
function records(value) {
  if (!Array.isArray(value)) throw new Error('Expected a content array.');
  const ids = new Set();
  for (const item of value) {
    if (!item || !text(item.id) || ids.has(item.id)) throw new Error('Content requires unique string IDs.');
    ids.add(item.id);
  }
  return value;
}
export function normalizeTrucks(value) {
  return records(value).map(truck => {
    if (!truckName(truck)) throw new Error('Truck name is required.');
    // Compatibility for older single-photo records.
    const photos = truck.images ?? (truck.imageUrl ? [{ url: truck.imageUrl }] : []);
    if (!Array.isArray(photos)) throw new Error('Truck images must be an array.');
    return {
      id: truck.id, name: truckName(truck), truckType: text(truck.truckType),
      volume: text(truck.volume),
      maxLoad: text(truck.maxLoad) || 'Contact us for details',
      dimensions: text(truck.dimensions) || 'Contact us for details',
      images: photos.filter(photo => photo && imageUrl(photo.url)).slice(0, MAX_TRUCK_IMAGES)
        .map(photo => ({ url: imageUrl(photo.url), alt: text(photo.alt) })),
      commonCargos: records(truck.commonCargos ?? []).map(cargo => ({
        id: cargo.id, name: text(cargo.name), imageUrl: imageUrl(cargo.imageUrl), imageAlt: text(cargo.imageAlt),
      })),
    };
  });
}
function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value ? value : null;
}
export function normalizeAnnouncements(value) {
  return records(value).filter(item => item.status !== "archived").map(item => {
    if (!text(item.title)) throw new Error('Announcement title is required.');
    return { id: item.id, title: text(item.title), content: text(item.content),
      createdAt: text(item._createdAt), imageUrl: imageUrl(item.imageUrl), date: validDate(item.date), isSample: item.isSample === true };
  }).sort((a, b) => (b.createdAt || b.date || '').localeCompare(a.createdAt || a.date || ''));
}
