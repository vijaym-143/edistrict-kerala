import { useEffect, useState } from "react";
import Lenis from "lenis";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import IncomeForm from "./components/IncomeForm";
import TrackStatus from "./components/TrackStatus";

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [lastAck, setLastAck] = useState("");

  useEffect(() => {
    // Lenis smooth scroll — kept very subtle to preserve old govt feel (pixel-perfect mode)
    try {
      const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
      let raf;
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      return () => { cancelAnimationFrame(raf); lenis.destroy(); };
    } catch { return undefined; }
  }, []);

  const go = (v) => { setView(v); window.scrollTo(0, 0); };

  return (
    <div className={lang === "ml" ? "font-mal" : ""}>
      <TopBar lang={lang} setLang={setLang} go={go} />
      <main className="min-h-[60vh] pb-4">
        {view === "home" && <Home lang={lang} go={go} />}
        {view === "form" && <IncomeForm lang={lang} go={go} setLastAck={setLastAck} />}
        {view === "track" && <TrackStatus lang={lang} go={go} lastAck={lastAck} />}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
