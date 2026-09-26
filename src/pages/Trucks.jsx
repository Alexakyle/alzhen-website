import React from "react";
import {
  ArrowUpRight,
  Package,
  Route,
  Warehouse,
  MapPin,
  Truck,
  Settings2,
  ChevronDown,
} from "lucide-react";
import RoadBanner from "../components/RoadBanner";
import Fleet from "../components/Fleet";
import ServiceJourney from "../components/ServiceJourney";
import { services } from "../data/company";
export default function Trucks({ go }) {
  return (
    <div className="journey-page trucks-page">
      <RoadBanner
        eyebrow="OUR FLEET & SERVICES"
        title="Big loads."
        accent="Bigger possibilities."
        description="L300, 6-wheeler closed vans, and 10- and 12-wheeler wing vans. Find a vehicle suited to your cargo and route."
        sign="LET’S HAUL"
        variant="mint"
      >
        <button className="button" onClick={() => go("contact")}>
          Plan your next shipment
          <ArrowUpRight size={18} />
        </button>
      </RoadBanner>
      <div className="route-ribbon">
        <Truck size={21} />
        <span>L300 · 6-WHEELER CLOSED VANS</span>
        <span>✦</span>
        <span>12-WHEELER WING VANS</span>
        <span>✦</span>
        <span>NATIONWIDE TRANSPORT</span>
      </div>
      <section className="section">
        <div className="section-top">
          <div>
            <span className="eyebrow">MEET YOUR NEXT MOVE</span>
            <h2>A fleet that fits.</h2>
          </div>

        </div>
        <div aria-live="polite">
          <Fleet go={go} />
        </div>
        <p className="fleet-footnote">
          Share your cargo and route so the team can confirm the listed specifications, loading suitability, and vehicle availability.
        </p>
      </section>
      <section className="section transportation-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">MORE THAN A TRUCK</span>
            <h2>Six ways to move forward.</h2><p>Trucking &amp; transportation, delivery &amp; distribution, dedicated trucking, and nationwide coverage—supported by the service options below.</p>
          </div>
          <span className="small-note">Open a service to find out more</span>
        </div>
        <div className="service-accordions">
          {services.map(([name, description], i) => {
            const Icon = [Package, Route, Warehouse, MapPin, Truck, Settings2][i];
            return (
              <details key={name}>
                <summary>
                  <span className="service-icon">
                    <Icon size={24} />
                  </span>
                  <span>
                    <small>0{i + 1} / TRANSPORTATION</small>
                    <strong>{name}</strong>
                  </span>
                  <ChevronDown size={20} />
                </summary>
                <div className="service-detail">
                  <p>{description}</p>
                  <span className="service-fit"><Route size={16}/> {['One truck. One dedicated load.', 'Connecting destinations nationwide.', 'From one warehouse to the next.', 'Support for the final stretch.', 'Capacity planned around your project.', 'Transport shaped around your needs.'][i]}</span>
                </div>
              </details>
            );
          })}
        </div>
      </section>
      <ServiceJourney />

    </div>
  );
}
