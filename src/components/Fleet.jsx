import React, { useState } from 'react';
import {ArrowUpRight,Weight,Move, Package} from 'lucide-react';
import { getTrucks } from '../services/websiteContent';
import useWebsiteContent from '../hooks/useWebsiteContent';
import TruckPhotos from './TruckPhotos';
function CargoList({ cargos }) {
 const [expanded,setExpanded]=useState(false);
 if(!cargos.length)return null;
 return <div className="fleet-cargo"><h4>Common cargo</h4><ul>{(expanded?cargos:cargos.slice(0,3)).map(cargo=><li key={cargo.id}><span className="cargo-thumbnail"><Package size={25}/>{cargo.imageUrl&&<img src={cargo.imageUrl} alt={cargo.imageAlt || cargo.name} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/>}</span>{cargo.name}</li>)}</ul>{cargos.length>3&&<button className="cargo-toggle" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Show less':`View all ${cargos.length} cargo types`}</button>}</div>;
}
export default function Fleet({go}){
 const {items:trucks, loading, error}=useWebsiteContent(getTrucks);
 if(loading) return <p role="status">Loading trucks…</p>;
 if(error) return <p role="alert">Truck listings are unavailable. Please try again later.</p>;
 if(!trucks.length) return <p>No truck listings available at the moment.</p>;
 return <div className="fleet-catalog">{trucks.map(truck=><article className="fleet-catalog-card" key={truck.id}>
  <div className="fleet-card-heading"><div><span>ALZHEN / OUR FLEET</span><h3>{truck.name}</h3></div><button onClick={()=>go('contact')} aria-label={`Inquire about the ${truck.name}`}><ArrowUpRight/></button></div>
  <TruckPhotos images={truck.images} name={truck.name}/>
  <dl className="fleet-specifications"><div><Weight size={23}/><dt>Maximum load</dt><dd>{truck.maxLoad}</dd></div><div><Move size={23}/><dt>{truck.volume ? "Cargo volume" : "Cargo dimensions"}</dt><dd>{truck.volume || truck.dimensions}</dd></div></dl>
  {truck.dimensions !== "Contact us for details" && <p className="truck-dimension-note">Dimensions: {truck.dimensions}</p>}
  <CargoList cargos={truck.commonCargos}/>
  <button className="fleet-inquire" onClick={()=>go('contact')}>Inquire about this truck <ArrowUpRight size={18}/></button>
 </article>)}</div>;
}
