import MotionBackground from "../components/MotionBackground";
import React, { useState } from "react";
import { company, reasons } from "../data/company";
import TruckIllustration from "../components/TruckIllustration";
import {
  ArrowUpRight,
  ArrowRight,
  Truck,
  ShieldCheck,
  Package,
  Handshake,
} from "lucide-react";
import { photo } from "../data/site";
import JourneyCard from "../components/JourneyCard";
import Fleet from "../components/Fleet";
import { getAnnouncements } from "../services/websiteContent";
import useWebsiteContent from "../hooks/useWebsiteContent";
export default function Home({ go }) {
  const {items: announcements, loading: newsLoading, error: newsError} = useWebsiteContent(getAnnouncements);
  const latest = announcements[0];
  const [region, setRegion] = useState("Luzon");
  const btn = (label, p, secondary = false) => (
    <button className={secondary ? "button secondary" : "button"} onClick={() => go(p)}>
      {label}
      <ArrowUpRight size={18} />
    </button>
  );
  return (
    <div className="journey-page home-page">
      <section className="hero">
        <img
          className="hero-photo"
          src={photo}
          alt="Alzhen wing van pictured in the company profile"
        />
        <div className="hero-shade" /><MotionBackground/>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="speed-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="hero-content">
          <div className="eyebrow light">
            <span /> YOUR CARGO. OUR COMMITMENT.
          </div>
          <h1>
            <span className="headline-line">Moving your</span>
            <span className="headline-line">business.</span>
            <em>Beyond the next mile.</em>
          </h1>
          <p>
            Your trusted transportation partner since 2009.
            <br />
            Wing van solutions across Luzon, Visayas, and Mindanao.
          </p>
          <div className="buttons">
            {btn("Let’s move your cargo", "contact")}
            {btn("Explore our trucks", "trucks", true)}
          </div>
        </div>
        <JourneyCard go={go}/>
        <div className="hero-foot">
          <span>ALZHEN TRUCKING</span>
          <span>
            Built around your next destination <ArrowRight size={17} />
          </span>
          <small>Alzhen company fleet</small>
        </div>
      </section>
      <section className="service-strip">
        <div>
          <Truck />
          <span>
            10 & 12-wheelers<small>Our primary wing van fleet</small>
          </span>
        </div>
        <div>
          <Package />
          <span>
            Nationwide delivery<small>Luzon, Visayas & Mindanao</small>
          </span>
        </div>
        <div>
          <Handshake />
          <span>
            Since 2009<small>More than a decade on the road</small>
          </span>
        </div>
      </section>
      <section className="section intro"><img className="home-company-panorama" src="/images/company/loading-metal.png" alt="Alzhen personnel loading a wing van" loading="lazy"/>
        <div>
          <div className="eyebrow">THE ROAD AHEAD, TOGETHER</div>
          <h2>
            A partner for
            <br />
            <span className="accent-word">every load.</span>
          </h2>
        </div>
        <div>
          <p className="large-copy">{company.introduction}</p>
          <button className="text-link" onClick={() => go("about")}>
            Get to know Alzhen <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
      <section className="section fleet-section">
        <div className="section-top">
          <div>
            <div className="eyebrow">FIND YOUR FIT</div>
            <h2>
              Built for <span className="accent-word">the journey.</span>
            </h2>
          </div>
          <button className="text-link" onClick={() => go("trucks")}>
            Explore trucks & services <ArrowUpRight size={18} />
          </button>
        </div>
        <Fleet go={go} />
      </section>
      <section className="section coverage-section">
        <div className="coverage-copy">
          <span className="eyebrow">THREE ISLAND GROUPS. ONE COMMITMENT.</span>
          <h2>
            Where business goes,
            <br />
            <span className="accent-word">we move with it.</span>
          </h2>
          <p>
            Delivery solutions throughout Luzon, Visayas, and Mindanao, backed by a strong
            transportation partner network.
          </p>
          <div className="region-buttons" role="group" aria-label="Explore nationwide coverage">
            {["Luzon", "Visayas", "Mindanao"].map((r) => (
              <button
                key={r}
                className={region === r ? "selected" : ""}
                aria-pressed={region === r}
                onClick={() => setRegion(r)}
              >
                {r}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <p className="coverage-response" aria-live="polite">
            Planning a shipment in {region}? Share your pickup and delivery locations so our team
            can confirm the route and arrangements.
          </p>
          <button className="text-link" onClick={() => go("contact")}>
            Let’s plan your route
            <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="coverage-art" aria-hidden="true">
          <span className="coverage-top">ALZHEN / NATIONWIDE</span>
          <div className="coverage-road" />
          {["Luzon", "Visayas", "Mindanao"].map((r, i) => (
            <span key={r} className={"island-stop stop-" + i + (region === r ? " selected" : "")}>
              <span /> {r}
            </span>
          ))}
          <TruckIllustration variant="mint" />
          <small>Coverage illustration · Not a geographic map</small>
        </div>
      </section>
      <section className="section why">
        <div>
          <div className="eyebrow light">WHY CHOOSE ALZHEN</div>
          <h2>
            Your business.
            <br />
            Our driving force.
          </h2>
          <p>
            Dependable, flexible, and customer-focused logistics services that help businesses move
            their products safely, efficiently, and on schedule.
          </p>
        </div>
        <div className="values">
          {reasons.map((reason, i) => (
            <div key={reason}>
              <ShieldCheck />
              <span>
                <h3>{reason}</h3>
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-top">
          <div>
            <div className="eyebrow">FROM ALZHEN</div>
            <h2>
              News from <span className="accent-word">the road.</span>
            </h2>
          </div>
          <button className="text-link" onClick={() => go("announcements")}>
            All announcements <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="announcement-preview">
          {newsLoading ? <p role="status">Loading company updates…</p> : newsError ? <p role="status">Company updates are temporarily unavailable.</p> : latest ? <>
            <span className="tag">LATEST COMPANY UPDATE{latest.date ? ` · ${latest.date}` : ''}</span>
            <h3>{latest.title}</h3>
            <p>{latest.content.length > 220 ? latest.content.slice(0,220).replace(/\s+\S*$/, '') + '…' : latest.content}</p>
            <button className="text-link" onClick={() => go("announcements")}>
              Read update <ArrowRight size={18} />
            </button>
          </> : <p>No announcements yet. Check back for company updates.</p>}
        </div>
      </section>
    </div>
  );
}
