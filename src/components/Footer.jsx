import React from 'react';
import { ArrowUpRight, Truck, MapPin, Phone, Mail, MessageCircle, Clock, Radio } from 'lucide-react';
import { contact } from '../data/profile';
import { nav, slugs } from '../data/site';
export default function Footer({go, compact=false}) {
 const link=(label,page)=> <a href={'#'+page} onClick={e=>{e.preventDefault();go(page)}}>{label}<ArrowUpRight size={15}/></a>;
 return <footer className="alzhen-footer">
 <div className="footer-glow" aria-hidden="true"/>
 {!compact&&<div className="footer-invitation"><div><span className="eyebrow">YOUR NEXT MOVE STARTS HERE</span><h2>Let’s get things moving.</h2></div><button className="button" onClick={()=>go('contact')}>Talk to our team <ArrowUpRight size={19}/></button></div>}
 <div className="footer-columns">
 <div className="footer-identity"><a href="#home" onClick={e=>{e.preventDefault();go('home')}} className="footer-logo"><img src="/images/alzhen-logo.png" alt="Alzhen Trucking Services" width="86" height="86"/><span>ALZHEN<small>TRUCKING SERVICES</small></span></a><p>Your cargo. Our commitment.<br/>Connecting businesses across Luzon, Visayas, and Mindanao.</p><a className="footer-social" href={contact.facebook} target="_blank" rel="noreferrer"><MessageCircle size={19}/> Connect on Facebook <ArrowUpRight size={15}/></a></div>
 <div className="footer-links"><h3>Explore Alzhen</h3>{nav.map((name,i)=><React.Fragment key={name}>{link(name,slugs[i])}</React.Fragment>)}</div>
 <div className="footer-contact"><h3>Let’s connect</h3><p><MapPin size={18}/><span>{contact.address}</span></p><a href="tel:+639777383546"><Phone size={18}/>{contact.phone}</a><a href="tel:+639280245963"><Phone size={18}/>{contact.phone2}</a><a href={'mailto:'+contact.email}><Mail size={18}/>{contact.email}</a><a href={'mailto:'+contact.email2}><Mail size={18}/>{contact.email2}</a></div>
 <div className="footer-hours"><h3>Along for the journey</h3><div><Clock size={21}/><span>Office hours<strong>{contact.officeHours}</strong></span></div><div><Radio size={21}/><span>Cargo monitoring<strong>24 hours · 7 days</strong></span></div><span className="footer-route-label">LUZON · VISAYAS · MINDANAO</span></div>
 </div>
 <div className="footer-highway" aria-hidden="true"><Truck size={30}/><span/></div>
 <div className="footer-base"><span>© {new Date().getFullYear()} Alzhen Trucking Services. All rights reserved.</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div>
 </footer>;
}
