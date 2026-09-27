import { contact } from "../data/profile";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, MapPin, CheckCircle2, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import "../styles/contact.css";
const truckTypes = ["10-Wheeler Wing Van", "12-Wheeler Wing Van", "6-Wheeler Closed Van", "L300 Van", "Others"];
export default function Contact() {
  const [inquiry, setInquiry] = useState("Client");
  const [units, setUnits] = useState({});
  const [sent, setSent] = useState(false);
  const confirmation = useRef(null);
  useEffect(() => {
    if (sent) confirmation.current?.showModal();
  }, [sent]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const total = Object.values(units).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
  async function submitInquiry(event) {
    event.preventDefault();
    if (sending || sent) return;
    if (!Object.keys(units).length) {
      setError("Please select at least one truck type and enter its quantity.");
      return;
    }
    const form = event.currentTarget;
    const payload = {...Object.fromEntries(new FormData(form)), inquiry, units};
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "Online inquiries are temporarily unavailable. Please contact us by phone or email.");
      form.reset();
      setUnits({});
      setSent(true);
    } catch (err) {
      setError(err.message || "Unable to connect. Please try again later or contact us directly.");
    } finally { setSending(false); }
  }
  return <div className="journey-page contact-page compact-contact">
    <section className="contact-workspace" aria-label="Contact Alzhen">
      <aside className="contact-workspace-info">
        <span className="eyebrow">LET’S CONNECT</span><h1>Your next move<br/><em>starts here.</em></h1>
        <p className="contact-workspace-lead">Talk to our team about your cargo or your fleet.</p>
        <div className="contact-compact-details">
          <div><MapPin size={18}/><span><strong>Visit us</strong>{contact.address}</span></div>
          <div><Phone size={18}/><span><strong>Call / WhatsApp</strong><a href="tel:+639777383546">{contact.phone}</a> · <a href="tel:+639280245963">{contact.phone2}</a><a className="contact-whatsapp" href="https://wa.me/639777383546" target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></span></div>
          <div><Mail size={18}/><span><strong>Email us</strong><a href={'mailto:'+contact.email}>{contact.email}</a><br/><a href={'mailto:'+contact.email2}>{contact.email2}</a></span></div>
          <div><Clock size={18}/><span><strong>Office: {contact.officeHours}</strong>{contact.monitoring}</span></div>
          <div><MessageCircle size={18}/><span><a href={contact.facebook} target="_blank" rel="noreferrer">Alzhen Trucking on Facebook ↗</a></span></div>
        </div>
        <div className="contact-embedded-map"><iframe title="Google Maps address search for Alzhen Trucking" src={'https://www.google.com/maps?q='+encodeURIComponent(contact.address)+'&output=embed'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(contact.address)} target="_blank" rel="noreferrer">Open address in Google Maps ↗</a></div>
      </aside>
      <div className="form-card">
        <div className="tabs" aria-label="Inquiry type">{["Client", "Partner"].map(t => <button key={t} disabled={sending} aria-pressed={inquiry === t} className={inquiry === t ? "selected" : ""} onClick={() => { setInquiry(t); setUnits({}); setSent(false); setError(""); }}>{t} Inquiry</button>)}</div>
        <h2>{inquiry === "Client" ? "Let’s plan your delivery." : "Let’s work together."}</h2>
        <p className="contact-form-hint">Just a few details to get started. <span>* Required</span></p>
        <form key={inquiry} onChange={() => { setSent(false); setError(""); }} onSubmit={submitInquiry} aria-busy={sending}>
          <fieldset disabled={sending} className="inquiry-fields">
          <div className="two-col">
            <label>Full name *<input name="fullName" required autoComplete="name" maxLength={120} placeholder="Your full name" /></label>
            <label>Company name <small>(optional)</small><input name="company" autoComplete="organization" maxLength={160} placeholder="Company / business" /></label>
            <label>Email address *<input name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@company.com" /></label>
            <label>Contact number *<input name="phone" type="tel" required autoComplete="tel" maxLength={30} placeholder="09XX XXX XXXX" /></label>
          </div>
          {inquiry === "Partner" && <label>Garage location (City) *<input name="garageCity" required maxLength={120} placeholder="e.g. Calamba City" /></label>}
            <fieldset className="truck-selection"><legend>{inquiry === "Client" ? "Trucks needed & quantity *" : "Truck type & quantity *"}</legend><p>Select one or more truck types, then enter the quantity for each.</p>
              {truckTypes.map(type => <div className="truck-choice" key={type}><label><input type="checkbox" checked={type in units} onChange={e => setUnits(prev => { const next = {...prev}; if(e.target.checked) next[type] = 1; else delete next[type]; return next; })} />{type}</label>{type in units && <input aria-label={`${type} quantity`} name={`quantity-${type}`} type="number" inputMode="numeric" min="1" max="9999" step="1" required value={units[type]} onChange={e => setUnits(prev => ({...prev, [type]:e.target.value}))} />}</div>)}
              {"Others" in units && <label className="other-truck">Specify other truck type *<input name="otherTruck" required maxLength={120} placeholder="e.g. 4-Wheeler Closed Van" /></label>}
              <div className="unit-total"><span>Number of units <small>· calculated automatically</small></span><output aria-live="polite">{total}</output><input type="hidden" name="numberOfUnits" value={total}/></div>
            </fieldset>
          {inquiry === "Client" && <label>Message / additional details <small>(optional)</small><textarea name="message" rows={2} maxLength={3000} placeholder="Tell us a little about your delivery." /></label>}
          </fieldset>
          {error && <p className="contact-error" role="alert">{error}</p>}
          <button className="button" type="submit" disabled={sending || sent}>{sending ? "Sending…" : "Submit inquiry"} <ArrowUpRight size={17}/></button>
          <p className="contact-demo-note">Your details will be emailed to our inquiry team so they can respond to your request.</p>

        </form>
      </div>
    </section>
    <dialog ref={confirmation} className="inquiry-confirmation" aria-labelledby="inquiry-success-title" onClose={() => setSent(false)}>
      <CheckCircle2 size={40} aria-hidden="true"/>
      <h2 id="inquiry-success-title">Inquiry submitted!</h2>
      <p>Thank you for contacting Alzhen. Your inquiry has been accepted for email delivery to our team.</p>
      <p className="confirmation-note">Your form is cleared and ready for a new inquiry.</p>
      <button className="button" autoFocus onClick={() => confirmation.current.close()}>Got it</button>
    </dialog>
  </div>;
}
