import React,{useState} from 'react';
import {Radio,Warehouse,Route,Users,Settings,ArrowUpRight} from 'lucide-react';
import {operationHighlights} from '../data/profile';
const scenes=[['delivery-port.jpg',Radio,'Always in the loop'],['warehouse-transfer.jpg',Warehouse,'People on the ground'],['inter-island-truck.png',Route,'Experience that travels'],['loading-metal.png',Users,'A team behind every load'],['fleet-blue.jpg',Settings,'Ready for the next mile']];
export default function OperationsShowcase(){
 const [active,setActive]=useState(0);const [photo,Icon,line]=scenes[active];
 return <section className="section operations-showcase"><div className="operations-intro"><span className="eyebrow">BEHIND EVERY DELIVERY</span><h2>Support that<br/><em>keeps you moving.</em></h2><p>A closer look at the people, care, and coordination behind your cargo.</p></div>
 <div className="operations-experience"><div className="operations-photo" key={photo}><img src={'/images/company/'+photo} alt={['Alzhen truck at a port','Cargo handling at a warehouse','Truck on an inter-island delivery','Personnel loading cargo','Alzhen wing van'][active]} loading="lazy"/><div className="operations-photo-caption"><Icon size={28}/><span>{line}</span></div><span className="operations-photo-number">0{active+1}</span></div>
 <div className="operations-details"><div className="operations-choices" role="group" aria-label="Explore our operating support">{operationHighlights.map(([title],i)=>{const I=scenes[i][1];return <button key={title} aria-pressed={i===active} aria-controls="support-detail" onClick={()=>setActive(i)}><I size={19}/><span>{title}</span><ArrowUpRight size={15}/></button>})}</div><div id="support-detail" className="operations-detail" aria-live="polite"><span>OUR COMMITMENT / 0{active+1}</span><h3>{operationHighlights[active][0]}</h3><p>{operationHighlights[active][1]}</p></div></div></div>
 </section>;
}
