import React, {useEffect,useState} from 'react';
import {Truck,ArrowUpRight} from 'lucide-react';
const slides=[{title:'Every mile matters',from:'Your cargo',to:'Your destination',label:'Plan your delivery',page:'contact'},{title:'Built for your business',from:'10-wheeler',to:'12-wheeler wing vans',label:'Meet our fleet',page:'trucks'},{title:'Connected nationwide',from:'Luzon · Visayas',to:'Mindanao',label:'Get to know Alzhen',page:'about'}];
export default function JourneyCard({go}){
 const [index,setIndex]=useState(0),[hover,setHover]=useState(false),[focus,setFocus]=useState(false),[manual,setManual]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(m.matches);sync();m.addEventListener('change',sync);return()=>m.removeEventListener('change',sync)},[]);
 useEffect(()=>{if(hover||focus||manual||reduced)return;const id=setInterval(()=>{if(!document.hidden)setIndex(n=>(n+1)%slides.length)},6000);return()=>clearInterval(id)},[hover,focus,manual,reduced]);
 const slide=slides[index];
 return <section className="journey-card rotating-card" aria-label="Explore Alzhen" aria-roledescription="carousel" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setFocus(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocus(false)}}>
 <div key={index} className="journey-slide"><span className="journey-label">{slide.title}</span><div className="journey-track" aria-hidden="true"><span className="route-dot"/><div className="route-dashes"/><Truck size={32}/><span className="route-dot destination"/></div><div className="journey-endpoints"><span>{slide.from}</span><span>{slide.to}</span></div><button className="journey-action" onClick={()=>go(slide.page)}>{slide.label}<ArrowUpRight size={16}/></button></div>
 <div className="journey-pagination" role="group" aria-label="Choose a highlight">{slides.map((s,i)=><button key={s.title} aria-label={s.title} aria-pressed={i===index} onClick={()=>{setIndex(i);setManual(true)}}><span className={i===index?'current':''}/></button>)}</div>
 </section>
}
