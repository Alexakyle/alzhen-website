import React, {useState,useEffect} from 'react';
import { galleryPhotos } from '../data/gallery';
import '../styles/truck-gallery.css';
export default function TruckGallery({hero=false,category}){
 const photos = category ? galleryPhotos.filter(p=>p.category===category) : galleryPhotos;
 const [active,setActive]=useState(-1), [slots,setSlots]=useState(()=>Array.from({length:12},(_,i)=>i % Math.max(photos.length,1)));
 useEffect(()=>{if(!hero||photos.length<2)return;const media=matchMedia('(prefers-reduced-motion: reduce)');let step=0;const order=[0,1,2,3,7,6,5,4,8,9,10,11];const timer=setInterval(()=>{if(!media.matches&&!document.hidden){const slot=order[step++%12];setActive(slot);setSlots(prev=>prev.map((value,i)=>i===slot?(value+1)%photos.length:value));}},2400);return()=>clearInterval(timer)},[hero]);
 if(!photos.length)return <p>Company photographs are coming soon.</p>;
 return <div className={hero?'museum-gallery road-museum':'museum-collection'}>
 {hero ? <>
  <div className="photo-road-exhibition">
  <svg className="photo-road-track" viewBox="0 0 600 480" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 80H510Q570 80 570 160T510 240H90Q30 240 30 320T90 400H620" className="photo-road-edge"/><path d="M-20 80H510Q570 80 570 160T510 240H90Q30 240 30 320T90 400H620" className="photo-road-asphalt"/><path d="M-20 80H510Q570 80 570 160T510 240H90Q30 240 30 320T90 400H620" className="photo-road-stripes"/></svg>
  <div className="photo-wall road-photo-wall" aria-label="Company photo road gallery">
   {slots.map((photoIndex,i)=>{const photo=photos[photoIndex];return <div key={i} className={`road-photo-stop ${active===i?'stop-active':''}`}><span className="photo-water-ring" aria-hidden="true"/><figure className="photo-wall-card" style={{'--lean':`${[-4,2,-2,3][i%4]}deg`}}><img key={photoIndex} src={photo.src} alt={photo.alt}/></figure></div>})}
  </div></div>
  <p className="museum-note">{photos.some(p=>p.sample)?'Sample photographs · Actual Alzhen photos coming soon':'Life on the road with Alzhen'}</p>
 </> : <><div className="museum-photo-grid">{photos.map((photo,i)=><figure key={i}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.title}</figcaption></figure>)}</div><p className="museum-note">{photos.some(p=>p.sample)&&<>Temporary sample photographs from <a href="https://unsplash.com/s/photos/cargo-trucks" target="_blank" rel="noreferrer">Unsplash</a>, not Alzhen’s vehicles.</>}</p></>}
 </div>;
}
