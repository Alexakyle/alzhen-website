import React, { useRef, useState, useEffect } from 'react';
import { BriefcaseBusiness, ArrowUpRight, ShieldCheck, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { contact } from '../data/profile';
const documents=[
 {title:'DTI Registration',type:'Business name registration',image:'dti-registration.png'},
 {title:'BIR Registration',type:'Certificate of registration',image:'bir-registration-1.png',second:'bir-registration-2.png'}
];
export default function Careers(){
 const viewer = useRef(null);
 const [selected, setSelected] = useState(null);
 const [page, setPage] = useState(0);
 const openDocument = doc => { setSelected(doc); setPage(0); viewer.current.showModal(); };
 useEffect(() => {
  if (!selected) return;
  const previous = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = previous; };
 }, [selected]);
 const pages = selected ? [selected.image, selected.second].filter(Boolean) : [];

 return <div className="journey-page careers-page careers-board-page">
 <section className="section careers-board-intro"><div><span className="eyebrow">ALZHEN TRUCKING SERVICES</span><h1>Careers &amp; Permits</h1><p>Opportunities with our team. Documents for your confidence.</p></div></section>
 <section className="section careers-board-content">
 <div className="recruitment-column"><div className="board-heading"><BriefcaseBusiness size={22}/><h2>Careers</h2></div>
 <article className="recruitment-post"><div className="recruitment-cover"><img src="/images/company/fleet-gathering.png" alt="Alzhen team gathering beside a wing van"/></div><div className="recruitment-body"><h3>No openings at the moment</h3><p>New roles and application details will be posted here.</p><a href={contact.facebook} target="_blank" rel="noreferrer">Follow Alzhen on Facebook <ArrowUpRight size={17}/></a></div></article>
 </div>
 <div className="permits-column"><div className="board-heading"><ShieldCheck size={22}/><h2>Permits & registration</h2></div><p className="permits-caption">Select a document to take a closer look.</p><div className="permit-documents">{documents.map(doc=><button className="permit-display-card" key={doc.title} onClick={()=>openDocument(doc)} aria-label={'Expand '+doc.title}><span className="permit-display-image"><img src={'/images/permits/'+doc.image} alt={doc.title+' supplied by Alzhen'} loading="lazy"/><span className="permit-expand-icon"><Expand size={18}/></span></span><span className="permit-display-caption"><strong>{doc.title}</strong><small>{doc.second?'2 pages':'1 page'} · Click to expand</small></span></button>)}</div><details className="permit-more"><summary>Other permits <span>Copies to follow</span></summary><ul><li>Mayor’s Permit</li><li>Sanitary Permit</li></ul></details><p className="permits-verification">Need a current copy? <a href={'mailto:'+contact.email}>contact Alzhen</a>.</p></div>
 </section>
 <dialog ref={viewer} className="permit-lightbox" aria-labelledby="permit-viewer-title" onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget) viewer.current.close();}}>
 {selected&&<div className="permit-lightbox-content"><div className="permit-lightbox-toolbar"><div><h2 id="permit-viewer-title">{selected.title}</h2><span>Page {page+1} of {pages.length}</span></div><button autoFocus onClick={()=>viewer.current.close()} aria-label="Close document"><X size={23}/></button></div><div className="permit-lightbox-scroll"><img src={'/images/permits/'+pages[page]} alt={selected.title+', page '+(page+1)}/></div>{pages.length>1&&<div className="permit-page-controls"><button disabled={page===0} onClick={()=>setPage(page-1)}><ChevronLeft size={17}/> Previous</button><span>{page+1} / {pages.length}</span><button disabled={page===pages.length-1} onClick={()=>setPage(page+1)}>Next <ChevronRight size={17}/></button></div>}</div>}
 </dialog></div>;
}
