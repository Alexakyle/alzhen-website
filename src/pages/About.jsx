import React, { useState } from "react";
import {
  ArrowUpRight,
  Flag,
  Compass,
  ShieldCheck,
  Handshake,
  Truck,
  MapPin,
} from "lucide-react";
import { company, values } from "../data/company";
import TruckGallery from "../components/TruckGallery";
import OperationsShowcase from "../components/OperationsShowcase";
import RoadBanner from "../components/RoadBanner";
const timeline = [
  [
    "2009",
    "Where it all began",
    "Founded in 2009 as JGAB Hauling Services, the company began its journey protecting clients’ assets through reliable logistics services.",
  ],
  [
    "GROWING FORWARD",
    "A bigger road ahead",
    "As client requirements evolved, Alzhen shifted its primary focus to 10-wheeler and 12-wheeler wing van trucks.",
  ],
  [
    "TODAY",
    "Connected, nationwide",
    "Delivery solutions throughout Luzon, Visayas, and Mindanao, supported by experience and a strong transportation partner network.",
  ],
];
export default function About({ go }) {
  const [chapter, setChapter] = useState(0);
  return (
    <div className="journey-page about-page">
      <RoadBanner
        eyebrow="THE PEOPLE BEHIND THE JOURNEY"
        title="Good people."
        accent="A shared direction."
        description="More than a service provider. Your trusted business partner since 2009."
        artwork={<div id="about-gallery"><TruckGallery hero/></div>}
        sign="OUR STORY"
        variant="butter"
      />
      <nav className="about-chapters" aria-label="About page sections">{[["Our story","about-story"],["Our journey","about-journey"],["Mission & vision","about-purpose"],["Our values","about-values"],["Gallery","about-gallery"]].map(([label,id],i)=><button key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><small>0{i+1}</small>{label}<ArrowUpRight size={14}/></button>)}</nav>
      <section className="section story-section" id="about-story">
        <div className="section-top">
          <div>
            <span className="eyebrow">WHO WE ARE</span>
            <h2>
              Built on trust.
              <br />
              <span className="accent-word">Moving with purpose.</span>
            </h2>
          </div>
          <div className="est-stamp">
            <span>ON THE ROAD SINCE</span>
            <strong>2009</strong>
            <Truck size={26} />
          </div>
        </div>
        <p className="story-lead">{company.introduction}</p>
        <div className="story-highlights"><article><Truck/><strong>10 & 12-wheelers</strong><span>Our primary wing van fleet</span></article><article><MapPin/><strong>Nationwide</strong><span>Luzon · Visayas · Mindanao</span></article><article><Handshake/><strong>Business partners</strong><span>Flexible solutions, shared goals</span></article></div>
        <div className="company-background"><h3>Our company background</h3><div className="story-columns">{company.overview.map(p=><p key={p}>{p}</p>)}</div></div>
      </section>
      <OperationsShowcase/>
      <section className="section history-section" id="about-journey">
        <div className="section-top">
          <div>
            <span className="eyebrow">OUR JOURNEY SO FAR</span>
            <h2>Every mile has a story.</h2>
          </div>
          <span className="small-note">Choose a milestone to explore</span>
        </div>
        <div className="history-stops" role="group" aria-label="Company milestones">
          {timeline.map(([year], i) => (
            <button
              key={year}
              className={chapter === i ? "chosen" : ""}
              aria-pressed={chapter === i}
              onClick={() => setChapter(i)}
            >
              <span className="stop-circle">{chapter === i ? <Truck size={21} /> : i + 1}</span>
              {year}
            </button>
          ))}
        </div>
        <article key={chapter} className="history-card" aria-live="polite">
          <div className="history-landscape" aria-hidden="true"><span className="history-sun"/><span className="history-cloud"/><div className="history-hills"/><div className="history-road"><Truck size={45}/></div><span className="history-scene-label">{["THE FIRST MILE", "ROOM TO GROW", "ACROSS THE PHILIPPINES"][chapter]}</span></div>
          <span className="history-number" aria-hidden="true">
            0{chapter + 1}
          </span>
          <div>
            <span className="eyebrow">{timeline[chapter][0]}</span>
            <h3>{timeline[chapter][1]}</h3>
            <p>{timeline[chapter][2]}</p>
          </div>
          <Flag size={65} aria-hidden="true" />
        </article>
      </section>
      <section className="section purpose-section" id="about-purpose">
        <article className="purpose-card mission">
          <Flag size={34} />
          <span className="eyebrow">OUR MISSION</span>
          <h2>What drives us.</h2>
          <p>{company.mission}</p>
        </article>
        <article className="purpose-card vision">
          <Compass size={34} />
          <span className="eyebrow">OUR VISION</span>
          <h2>Where we’re headed.</h2>
          <p>{company.vision}</p>
        </article>
      </section>
      <section className="section values-section" id="about-values">
        <span className="eyebrow">VALUES WE CARRY</span>
        <h2>The heart of every journey.</h2>
        <div className="core-values">
          {values.map(([title, text], i) => {
            const Icon = [Truck, Handshake, ShieldCheck][i];
            return (
              <article key={title}>
                <span className="value-icon">
                  <Icon size={25} />
                </span>
                <span className="value-index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>


    </div>
  );
}
