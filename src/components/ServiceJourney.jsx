import React, { useState } from 'react';
import { Truck, ClipboardList, CalendarDays, PackageCheck, Radio, FileCheck2, Receipt, ShieldCheck, MessageCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { operationSteps, commitments } from '../data/profile';
const steps = [
 ['Tell us what’s moving.', 'Start with your cargo, pickup point, destination, and preferred delivery date.'],
 ['Put the journey in place.', 'The team plans the route and schedule around your transport requirements.'],
 ['Match the load to the truck.', 'Truck allocation takes your cargo and delivery requirements into account.'],
 ['Stay connected along the way.', '24/7 cargo monitoring and warehouse coordinators support the journey.'],
 ['Arrive at the destination.', 'The delivery reaches its destination for completion and handover.'],
 ['Close the loop.', 'Proof of delivery documents the completed shipment.'],
 ['Complete the paperwork.', 'Billing follows the delivery documentation and agreed arrangements.']
];
const icons = [ClipboardList, CalendarDays, Truck, Radio, PackageCheck, FileCheck2, Receipt];
export default function ServiceJourney() {
 const [active, setActive] = useState(0);
 const Icon = icons[active];
 return <>
 <section className="section dispatch-section">
  <div className="section-top"><div><span className="eyebrow">HOW WE OPERATE</span><h2>Every stop. A step forward.</h2></div><p className="small-note">Choose a stop to follow the journey.</p></div>
  <div className="dispatch-board">
   <div className="dispatch-stops" role="group" aria-label="Delivery stages">{operationSteps.map((step,i)=><button key={step} aria-pressed={active===i} onClick={()=>setActive(i)} className={active===i?'is-current':''}><span className="dispatch-pin">{active===i?<Truck size={23}/>:String(i+1).padStart(2,'0')}</span><span>{step}</span></button>)}</div>
   <div className="dispatch-detail" key={active} aria-live="polite"><div className="dispatch-symbol"><Icon size={58}/><span>0{active+1} / 07</span></div><div><span className="eyebrow">{operationSteps[active]}</span><h3>{steps[active][0]}</h3><p>{steps[active][1]}</p></div><button className="dispatch-next" onClick={()=>setActive((active+1)%7)} aria-label="Show next delivery stage">Next stop ↗</button></div>
  </div>
 </section>
 <section className="section care-section"><div className="section-top"><div><span className="eyebrow">OUR SERVICE COMMITMENT</span><h2>Care at every stage.</h2></div><p>People. Cargo. Every mile in between.</p></div>
 <div className="care-layout"><div className="care-photo"><img src="/images/company/loading-metal.png" alt="Alzhen crew assisting with cargo loading" loading="lazy"/><div><span className="eyebrow">THE PEOPLE BEHIND THE JOURNEY</span><h3>More than moving cargo.</h3><p>A commitment we carry with us.</p></div><span className="care-orbit" aria-hidden="true"><Truck size={25}/></span></div>
 <div className="care-promises">{commitments.map(([title,description],i)=>{const Symbol=[CheckCircle2,ShieldCheck,FileCheck2,MessageCircle,TrendingUp][i];return <article key={title} className="care-promise"><span className="care-icon"><Symbol size={23}/></span><div><h3>{title}</h3><p>{description}</p></div><span className="care-index">0{i+1}</span></article>})}</div></div>
 </section></>;
}
