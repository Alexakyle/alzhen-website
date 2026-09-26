import React from 'react';
import { Truck, Package, MapPin, Flag, Send, Megaphone, Handshake } from 'lucide-react';
const motifs = {home: Truck, about: Flag, trucks: Package, announcements: Megaphone, careers: Handshake, contact: Send};
export default function HighwayBackdrop({page}) {
  const Motif = motifs[page] || Truck;
  return <div className="highway-backdrop" aria-hidden="true">
    {[0,1,2].map((lane) => <div className={`highway-margin margin-${lane}`} key={lane}>
      <svg className="margin-road" viewBox="0 0 60 620" fill="none"><path d="M30 -20V160Q30 200 42 230T42 310Q30 355 30 390V650" className="road-bed"/><path d="M30 -20V160Q30 200 42 230T42 310Q30 355 30 390V650" className="road-center"/></svg>
      <span className="margin-truck"><Truck size={22}/></span><span className="margin-stop"><Motif size={19}/></span><span className="margin-pin"><MapPin size={16}/></span>
    </div>)}
    <div className="highway-horizon"><div className="horizon-sun"/><div className="horizon-hills"/><span className="horizon-truck"><Truck size={39}/><i/><i/></span><div className="horizon-lane"/></div>
  </div>;
}
