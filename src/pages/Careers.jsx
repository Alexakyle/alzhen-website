import React, { useRef, useState, useEffect } from 'react';
import { Mail, Truck, BriefcaseBusiness, ArrowUpRight, ShieldCheck, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { contact } from '../data/profile';
import { getCareers } from '../services/websiteContent';
import useWebsiteContent from '../hooks/useWebsiteContent';
const documents=[
 {title:'Mayor’s Permit 2026',type:'Business permit',image:'mayors-permit-2026.png'},
 {title:'Sanitary Permit 2026',type:'Permit to operate',image:'sanitary-permit-2026.png'},
 {title:'DTI Registration',type:'Business name registration',image:'dti-registration.png'},
 {title:'BIR Registration',type:'Certificate of registration',image:'bir-registration-1.png',second:'bir-registration-2.png'}
];
export default function Careers(){
 const {items: jobs, loading, error} = useWebsiteContent(getCareers);
 const [jobPage, setJobPage] = useState(1);
 const jobPages = Math.max(1, Math.ceil(jobs.length / 2));
 const currentJobPage = Math.min(jobPage, jobPages);
 const visibleJobs = jobs.slice((currentJobPage - 1) * 2, currentJobPage * 2);
 function changeJobPage(next) {
  setJobPage(next);
  document.getElementById('career-posts')?.scrollIntoView({behavior:'smooth',block:'start'});
 }
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
 <div className="recruitment-column" id="career-posts"><div className="board-heading"><BriefcaseBusiness size={22}/><h2>Your next journey.</h2></div><p className="career-invitation">Find your place on the Alzhen team.</p>
 {loading ? <p role="status">Loading opportunities…</p> : error ? <p role="alert">Hiring posts are temporarily unavailable. Please contact Alzhen for current openings.</p> : jobs.length ? visibleJobs.map(job => <article className="recruitment-post" key={job.id}>
 <div className="recruitment-body"><div className="career-card-top"><span className="career-open"><i/>WE’RE HIRING</span><Truck size={24} aria-hidden="true"/></div><h3>{job.title}</h3>{job.date && <time dateTime={job.date}>Posted {job.date}</time>}
 <h4>Job description / responsibilities</h4><p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{job.content}</p>
 {job.qualifications && <><h4>Qualifications</h4><p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{job.qualifications}</p></>}
 <div className="career-apply"><h4>Ready for your next move?</h4><p>Send your application to our team.</p><a className="career-apply-button" href={'mailto:alzhentruckingservices@gmail.com?subject='+encodeURIComponent('Application: '+job.title)}><Mail size={17}/>Apply via email<ArrowUpRight size={17}/></a><span>alzhentruckingservices@gmail.com</span></div></div>
 </article>) : <article className="recruitment-post"><div className="recruitment-body"><h3>No openings at the moment</h3><p>New roles and application details will be posted here.</p><a href={contact.facebook} target="_blank" rel="noreferrer">Follow Alzhen on Facebook <ArrowUpRight size={17}/></a></div></article>}

 {!loading && !error && jobPages > 1 && <nav className="career-pagination" aria-label="Hiring post pages"><button disabled={currentJobPage === 1} onClick={() => changeJobPage(currentJobPage - 1)}>← Previous</button><span role="status">Page {currentJobPage} of {jobPages}</span><button disabled={currentJobPage === jobPages} onClick={() => changeJobPage(currentJobPage + 1)}>Next →</button></nav>}
 </div>
 <div className="permits-column"><div className="board-heading"><ShieldCheck size={22}/><h2>Permits & registration</h2></div><p className="permits-caption">Select a document to take a closer look.</p><div className="permit-documents">{documents.map(doc=><button className="permit-display-card" key={doc.title} onClick={()=>openDocument(doc)} aria-label={'Expand '+doc.title}><span className="permit-display-image"><img src={'/images/permits/'+doc.image} alt={doc.title+' supplied by Alzhen'} loading="lazy"/><span className="permit-expand-icon"><Expand size={18}/></span></span><span className="permit-display-caption"><strong>{doc.title}</strong><small>{doc.second?'2 pages':'1 page'} · Click to expand</small></span></button>)}</div><p className="permits-verification">Need a current copy? <a href={'mailto:'+contact.email}>contact Alzhen</a>.</p></div>
 </section>
 <dialog ref={viewer} className="permit-lightbox" aria-labelledby="permit-viewer-title" onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget) viewer.current.close();}}>
 {selected&&<div className="permit-lightbox-content"><div className="permit-lightbox-toolbar"><div><h2 id="permit-viewer-title">{selected.title}</h2><span>Page {page+1} of {pages.length}</span></div><button autoFocus onClick={()=>viewer.current.close()} aria-label="Close document"><X size={23}/></button></div><div className="permit-lightbox-scroll"><img src={'/images/permits/'+pages[page]} alt={selected.title+', page '+(page+1)}/></div>{pages.length>1&&<div className="permit-page-controls"><button disabled={page===0} onClick={()=>setPage(page-1)}><ChevronLeft size={17}/> Previous</button><span>{page+1} / {pages.length}</span><button disabled={page===pages.length-1} onClick={()=>setPage(page+1)}>Next <ChevronRight size={17}/></button></div>}</div>}
 </dialog></div>;
}
