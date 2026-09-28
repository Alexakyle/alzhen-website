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
  const long = announcement.content.length > 280;
  const excerpt = long ? announcement.content.slice(0, 280).replace(/\s+\S*$/, '') + '…' : announcement.content;
  return <article className={`ann-feature ${announcement.imageUrl ? 'has-photo' : 'text-only'}`}>
    {announcement.imageUrl && <div className="ann-feature-art"><img className="announcement-upload" src={announcement.imageUrl} alt={announcement.title} loading="lazy"/></div>}
    <div className="ann-feature-body">
      <div className="ann-meta"><span className="ann-category"><Megaphone size={14}/> COMPANY UPDATE</span></div>
      <h3>{announcement.title}</h3>
      <p id={'announcement-'+announcement.id} style={{whiteSpace:'pre-wrap'}}>{expanded ? announcement.content : excerpt}</p>
      <div className="ann-date"><CalendarDays size={16}/>{announcement.date ? <time dateTime={announcement.date}>{new Intl.DateTimeFormat('en-PH',{dateStyle:'long',timeZone:'UTC'}).format(new Date(announcement.date+'T00:00:00Z'))}</time> : 'Publication date to be confirmed'}</div>
      {long && <button className="ann-read" aria-expanded={expanded} aria-controls={'announcement-'+announcement.id} onClick={()=>setExpanded(!expanded)}>{expanded?'Show less':'Read full update'}{expanded?<ChevronUp size={18}/>:<ArrowUpRight size={18}/>}</button>}
    </div>
  </article>;
}

export default function Announcements() {
  const {items:announcements, loading, error}=useWebsiteContent(getAnnouncements);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(announcements.length / 3));
  const currentPage = Math.min(page, pageCount);
  const visibleAnnouncements = announcements.slice((currentPage - 1) * 3, currentPage * 3);
  function changePage(next) {
    setPage(next);
    document.getElementById('latest-updates')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
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
            {loading ? <p role="status">Loading announcements…</p> : error ? <p role="alert">Announcements are unavailable. Please try again later.</p> : announcements.length ? visibleAnnouncements.map(announcement=><AnnouncementCard key={announcement.id} announcement={announcement}/>) : <p>No announcements yet. Check back for company updates.</p>}
            {!loading && !error && pageCount > 1 && <nav className="ann-pagination" aria-label="Announcement pages">
              <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>← Previous</button>
              <span role="status">Page {currentPage} of {pageCount}</span>
              <button disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>Next →</button>
            </nav>}
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
