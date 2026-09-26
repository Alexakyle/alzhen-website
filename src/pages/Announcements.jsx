import MotionBackground from "../components/MotionBackground";
import React, { useState } from "react";
import {
  Truck,
  ArrowUpRight,
  Megaphone,
  CalendarDays,
  TrafficCone,
  ChevronUp,
} from "lucide-react";
import "../styles/announcements.css";

import { getAnnouncements } from "../services/websiteContent";
import useWebsiteContent from "../hooks/useWebsiteContent";

function AnnouncementCard({ announcement }) {
 const [expanded, setExpanded] = useState(false);
 const paragraphs = announcement.content.split(/\n\s*\n/);
 return <article className="ann-feature">
 {announcement.imageUrl ? <div className="ann-feature-art"><img className="announcement-upload" src={announcement.imageUrl} alt={announcement.title} loading="lazy"/></div> : <div className="ann-feature-art" aria-hidden="true"><div className="ann-art-grid"/><div className="ann-megaphone"><Megaphone size={90} strokeWidth={1.4}/></div><span className="ann-art-title">NEWS.<br/><em>ON THE MOVE.</em></span><div className="ann-art-road"><Truck size={44}/></div></div>}
 <div className="ann-feature-body"><div className="ann-meta"><span className="ann-category">COMPANY UPDATE</span>{announcement.isSample&&<span>Sample announcement</span>}</div><h3>{announcement.title}</h3><p style={{whiteSpace:'pre-wrap'}}>{paragraphs[0]}</p><div className="ann-date"><CalendarDays size={16}/>{announcement.date ? <time dateTime={announcement.date}>{new Intl.DateTimeFormat('en-PH',{dateStyle:'long',timeZone:'UTC'}).format(new Date(announcement.date+'T00:00:00Z'))}</time> : 'Publication date to be confirmed'}</div>
 {paragraphs.length>1&&<><div id={'announcement-'+announcement.id} className="ann-details" hidden={!expanded}>{paragraphs.slice(1).map((text,i)=><p key={i} style={{whiteSpace:'pre-wrap'}}>{text}</p>)}</div><button className="ann-read" aria-expanded={expanded} aria-controls={'announcement-'+announcement.id} onClick={()=>setExpanded(!expanded)}>{expanded?'Close update':'Read the update'}{expanded?<ChevronUp size={20}/>:<ArrowUpRight size={20}/>}</button></>}
 </div></article>;
}

export default function Announcements() {
  const {items:announcements, loading, error}=useWebsiteContent(getAnnouncements);
  return (
    <div className="ann-page">
      <section className="ann-direct-heading"><MotionBackground/><div><span className="ann-pill"><Megaphone size={16}/>ALZHEN / COMPANY BULLETIN</span><h1>Announcements<span>.</span></h1><p>Company news, service updates, and advisories. All in one place.</p></div><div className="bulletin-motion" aria-hidden="true"><Megaphone size={52}/><span>NEWS ON THE MOVE</span><Truck size={29}/></div></section>
      <section className="ann-updates" id="latest-updates">
        <div className="ann-section-title">
          <div>
            <span className="eyebrow">LATEST UPDATES</span>
            <h2>From Alzhen.</h2>
          </div>
          <span className="ann-outline-label">COMPANY NEWS & ADVISORIES</span>
        </div>
        <div className="ann-content-grid">
          <div className="announcement-list">
            {loading ? <p role="status">Loading announcements…</p> : error ? <p role="alert">Announcements are unavailable. Please try again later.</p> : announcements.length ? announcements.map(announcement=><AnnouncementCard key={announcement.id} announcement={announcement}/>) : <p>No announcements yet. Check back for company updates.</p>}
          </div>
          <aside className="ann-roadside">
            <div className="ann-note">
              <span className="ann-note-pin" />
              <span className="eyebrow">A FRIENDLY HEADS-UP</span>
              <h3>
                Good things
                <br />
                are on the way.
              </h3>
              <p>
                Find company announcements and service advisories here.
              </p>
              <div className="ann-note-footer">
                <TrafficCone size={30} />
                <span>
                  Company updates.
                  <br />
                  All in one place.
                </span>
              </div>
            </div>
            <div className="ann-mile-marker">
              <span>ALZHEN TRUCKING</span>
              <Truck size={32} />
              <strong>Stay in the loop.</strong>
              <p>
                Every update has a destination.
                <br />
                This one is yours.
              </p>
              <div className="ann-mini-road" aria-hidden="true" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
