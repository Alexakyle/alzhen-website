import React, { useState, useEffect } from "react";
import HighwayBackdrop from "./components/HighwayBackdrop";
import usePageMotion from "./hooks/usePageMotion";
import { slugs } from "./data/site";
import Home from "./pages/Home";
import About from "./pages/About";
import Trucks from "./pages/Trucks";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQChatbot from "./components/FAQChatbot";
export default function App() {
  const [page, setPage] = useState("home"),
    [menu, setMenu] = useState(false),
    [motion, setMotion] = useState(true),
    [theme, setTheme] = useState("light");
  useEffect(() => {
    const sync = () => {
      const value = window.location.hash.slice(1);
      if (slugs.includes(value)) setPage(value);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motion]);
  usePageMotion(page, motion);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "dark" || current === "light") setTheme(current);
  }, []);
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("alzhen-theme", next);
    } catch {}
  }
  function go(p) {
    if (!slugs.includes(p)) return;
    setPage(p);
    setMenu(false);
    window.history.replaceState(null, "", "#" + p);
    window.scrollTo({top:0,behavior:"instant"});
    requestAnimationFrame(()=>document.getElementById("main-content")?.focus({preventScroll:true}));
  }
  const pages = {
    home: Home,
    about: About,
    trucks: Trucks,
    announcements: Announcements,
    careers: Careers,
    contact: Contact,
  };
  const CurrentPage = pages[page] || Home;
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar {...{ go, page, menu, setMenu, theme, toggleTheme }} />
      <main key={page} data-page={page} id="main-content" tabIndex={-1}>
        <CurrentPage go={go} />
        <HighwayBackdrop page={page} />
      </main>
      <Footer go={go} compact={page === "contact"} />
      <FAQChatbot />
    </>
  );
}
