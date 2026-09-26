import React, { useState } from 'react';
import { Truck } from 'lucide-react';

export default function TruckPhotos({ images, name }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState({});
  const index = Math.min(selected, Math.max(0, images.length - 1));
  const photo = images[index];
  return <div className="truck-photos">
    <div className="fleet-catalog-photo">
      {photo && !failed[photo.url]
        ? <img key={photo.url} src={photo.url} alt={photo.alt || name} loading="lazy" onError={() => setFailed(previous => ({ ...previous, [photo.url]: true }))}/>
        : <div className="truck-photo-unavailable"><Truck size={48}/><span>Photo unavailable</span></div>}
      <span>LOCAL & INTER-ISLAND</span>
    </div>
    {images.length > 1 && <div className="truck-photo-selector" role="group" aria-label={`${name} photos`}>
      {images.map((image, i) => <button key={i} type="button" aria-pressed={index === i} aria-label={`Show ${name} photo ${i + 1}`} onClick={() => setSelected(i)}>{i + 1}</button>)}
      <small>Photo {index + 1} of {images.length}</small>
    </div>}
  </div>;
}
