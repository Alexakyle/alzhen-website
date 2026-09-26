import React from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { nav, slugs } from "../data/site";
export default function Navbar({ go, page, menu, setMenu, theme, toggleTheme }) {
  return (
    <header>
      <a
        className="brand"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          go("home");
        }}
      >
        <span className="company-logo"><img src="/images/alzhen-logo.png" alt="Alzhen Trucking Services logo" width="64" height="64" /></span>
        <span>
          ALZHEN<small>TRUCKING SERVICES</small>
        </span>
      </a>
      <nav id="main-nav" aria-label="Main navigation" className={menu ? "open" : ""}>
        {nav.map((n, i) => (
          <button
            aria-current={page === slugs[i] ? "page" : undefined}
            key={n}
            className={page === slugs[i] ? "active" : ""}
            onClick={() => go(slugs[i])}
          >
            {n}
          </button>
        ))}
      </nav>
      <button
        className="theme-toggle"
        aria-label={theme === "light" ? "Switch to night mode" : "Switch to light mode"}
        title={theme === "light" ? "Night mode" : "Light mode"}
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <button
        className="mobile-toggle"
        aria-expanded={menu}
        aria-controls="main-nav"
        aria-label="Toggle navigation"
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
    </header>
  );
}
