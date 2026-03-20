import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

function BEKLogo() {
  return (
    <div className="flex items-center gap-0 select-none">
      <span
        className="font-black text-[2rem] leading-none tracking-tight"
        style={{ color: "#F47920", fontFamily: "Impact, Arial Black, sans-serif" }}
      >
        BEK
      </span>
      <div className="mx-2 flex flex-col items-center">
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.3)" }} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-sm tracking-wide text-white" style={{ fontFamily: "Arial, sans-serif" }}>
          Electric
        </span>
        <span className="font-bold text-sm tracking-wide text-white" style={{ fontFamily: "Arial, sans-serif" }}>
          Systems
        </span>
        <div className="h-[2px] mt-0.5" style={{ background: "#F47920" }} />
      </div>
    </div>
  );
}

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1620674984694-a5a52d1cd4d5?w=1800&q=85",
    tag: "QUADRI ELETTRICI",
    headline: "Potenza\ne controllo.",
    sub: "Quadri di distribuzione MT/BT progettati su misura per ogni esigenza industriale e commerciale.",
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&q=85",
    tag: "ENERGIE RINNOVABILI",
    headline: "L'energia\ndel futuro.",
    sub: "Impianti fotovoltaici e sistemi di accumulo per massimizzare l'efficienza energetica.",
  },
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85",
    tag: "AUTOMAZIONE",
    headline: "Sistemi\nintelligenti.",
    sub: "Automazione industriale con PLC, SCADA e soluzioni di controllo per ogni processo produttivo.",
  },
];

const SERVICES = [
  {
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    title: "Quadri Elettrici",
    sub: "MT/BT su misura",
    desc: "Progettazione e realizzazione di quadri di distribuzione, protezione e controllo per impianti civili e industriali.",
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    title: "Fotovoltaico",
    sub: "Energia rinnovabile",
    desc: "Impianti fotovoltaici residenziali e industriali con sistemi di accumulo e monitoraggio remoto.",
  },
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    title: "Automazione PLC",
    sub: "Controllo industriale",
    desc: "Sistemi di automazione con Siemens, Schneider e Rockwell. Sviluppo software PLC e SCADA.",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Smart Home",
    sub: "Domotica KNX",
    desc: "Integrazione di sistemi KNX per il controllo intelligente di illuminazione, clima e sicurezza.",
  },
  {
    img: "https://images.unsplash.com/photo-1545259742-89e1e8e4aaf4?w=800&q=80",
    title: "Sicurezza",
    sub: "Protezione totale",
    desc: "Sistemi antincendio, videosorveglianza IP, controllo accessi e protezione da sovratensioni.",
  },
  {
    img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    title: "Manutenzione",
    sub: "Assistenza 24/7",
    desc: "Contratti di manutenzione programmata, interventi rapidi e reperibilità continua.",
  },
];

const PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1620674984694-a5a52d1cd4d5?w=900&q=80",
    tag: "INDUSTRIALE",
    title: "Stabilimento produttivo 3MW",
    loc: "Bari, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
    tag: "RESIDENZIALE",
    title: "Villa KNX + Fotovoltaico 15kW",
    loc: "Taranto, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1545259742-89e1e8e4aaf4?w=900&q=80",
    tag: "COMMERCIALE",
    title: "Centro commerciale LED 8.000m²",
    loc: "Lecce, 2022",
  },
  {
    img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=900&q=80",
    tag: "INDUSTRIALE",
    title: "Automazione PLC linea produzione",
    loc: "Foggia, 2022",
  },
];

const STATS = [
  { value: "20+", label: "Anni di esperienza" },
  { value: "1.500+", label: "Impianti realizzati" },
  { value: "500+", label: "Clienti soddisfatti" },
  { value: "24/7", label: "Assistenza attiva" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  function goTo(idx: number) {
    if (idx === current) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ y }}
        >
          <img src={slide.img} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase">{slide.tag}</span>
            </div>

            <h1
              className="text-white font-black leading-none mb-6"
              style={{
                fontSize: "clamp(3rem, 6vw, 6rem)",
                fontFamily: "Arial Black, Impact, sans-serif",
                whiteSpace: "pre-line",
              }}
            >
              {slide.headline}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">{slide.sub}</p>

            <div className="flex gap-4 flex-wrap">
              <button className="px-7 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-sm transition-all duration-300 text-sm tracking-wide shadow-xl shadow-orange-500/30">
                SCOPRI DI PIÙ
              </button>
              <button className="px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-bold rounded-sm transition-all duration-300 text-sm tracking-wide hover:bg-white/5">
                PREVENTIVO GRATUITO
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-10 left-8 md:left-16 flex items-center gap-4">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="group flex items-center gap-2">
            <div
              className={`h-px transition-all duration-500 ${
                i === current ? "w-10 bg-orange-500" : "w-5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
            <span className={`text-xs font-mono transition-colors ${i === current ? "text-orange-400" : "text-white/30"}`}>
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-2"
      >
        <span
          className="text-white/40 text-[10px] tracking-widest uppercase font-mono"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/40" />
      </motion.div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,12,14,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-18 flex items-center justify-between py-4">
        <BEKLogo />

        <nav className="hidden lg:flex items-center gap-8">
          {["Azienda", "Soluzioni", "Prodotti", "Progetti", "Contatti"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+39" className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-orange-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +39 XXX XXX XXXX
          </a>
          <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm tracking-wide rounded-sm transition-all duration-300 shadow-lg shadow-orange-500/20">
            CONTATTACI
          </button>
        </div>

        <button className="lg:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 px-6 pb-6"
            style={{ background: "rgba(10,12,14,0.98)" }}
          >
            {["Azienda", "Soluzioni", "Prodotti", "Progetti", "Contatti"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-white/70 hover:text-white border-b border-white/5 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="mt-5 w-full py-3 bg-orange-500 text-white font-bold text-sm rounded-sm tracking-wide">
              CONTATTACI
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function StatsBanner() {
  return (
    <div id="azienda" style={{ background: "#0f1113", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div className="text-center">
              <div
                className="font-black text-4xl md:text-5xl mb-1 text-orange-500"
                style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
              >
                {value}
              </div>
              <div className="text-gray-500 text-sm tracking-wide">{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  }

  return (
    <section id="soluzioni" className="py-24 overflow-hidden" style={{ background: "#0a0c0e" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-orange-500" />
                <span className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase">Le nostre soluzioni</span>
              </div>
              <h2
                className="text-white font-black text-4xl md:text-5xl leading-none"
                style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
              >
                Cosa<br />
                <span className="text-orange-500">facciamo.</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:border-orange-500/50 hover:text-orange-400 disabled:opacity-20 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:border-orange-500/50 hover:text-orange-400 disabled:opacity-20 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-5 overflow-x-auto pl-6 md:pl-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingRight: "2rem" }}
      >
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="group relative shrink-0 w-72 rounded-sm overflow-hidden cursor-pointer"
            style={{ height: "420px" }}
          >
            <img
              src={svc.img}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5 group-hover:from-black/90 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="text-orange-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-2">{svc.sub}</div>
              <h3 className="text-white font-black text-xl mb-3 leading-tight" style={{ fontFamily: "Arial Black, sans-serif" }}>
                {svc.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {svc.desc}
              </p>
              <div className="flex items-center gap-2 mt-4 text-orange-400 text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                SCOPRI DI PIÙ
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="azienda-about" className="relative overflow-hidden flex items-center" style={{ height: "80vh" }}>
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85"
          alt=""
          className="w-full object-cover"
          style={{ height: "110%", marginTop: "-5%" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase">Chi siamo</span>
          </div>
          <h2
            className="text-white font-black leading-none mb-6 max-w-xl"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", fontFamily: "Arial Black, Impact, sans-serif" }}
          >
            Vent'anni di<br />
            <span className="text-orange-500">eccellenza</span><br />
            elettrica.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
            BEK Electric Systems nasce nel 2004 con un'unica missione: offrire soluzioni
            elettriche di alta qualità per l'industria e il residenziale in Puglia e in
            tutto il Sud Italia. Ogni progetto è seguito dal nostro team di ingegneri e
            tecnici certificati, dalla progettazione alla messa in opera.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-7 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm tracking-wide rounded-sm transition-all">
              LA NOSTRA STORIA
            </button>
            <button className="px-7 py-3.5 border border-white/25 hover:border-white/50 text-white font-bold text-sm tracking-wide rounded-sm transition-all">
              IL TEAM
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="progetti" className="py-24" style={{ background: "#0a0c0e" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-orange-500" />
                <span className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase">Portfolio</span>
              </div>
              <h2
                className="text-white font-black text-4xl md:text-5xl leading-none"
                style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
              >
                I nostri<br />
                <span className="text-orange-500">lavori.</span>
              </h2>
            </div>
            <a href="#" className="text-orange-400 hover:text-orange-300 text-sm font-bold tracking-wide flex items-center gap-2 transition-colors">
              TUTTI I PROGETTI
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" style={{ height: "auto", minHeight: "400px" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 relative rounded-sm overflow-hidden group cursor-pointer"
            style={{ height: "400px" }}
          >
            <img src={PROJECTS[0].img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">{PROJECTS[0].tag}</span>
              <h3 className="text-white font-black text-2xl mt-1 leading-tight" style={{ fontFamily: "Arial Black, sans-serif" }}>
                {PROJECTS[0].title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{PROJECTS[0].loc}</p>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-orange-500/0 group-hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-4">
            {PROJECTS.slice(1).map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative rounded-sm overflow-hidden group cursor-pointer"
                style={{ height: "124px" }}
              >
                <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <span className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">{p.tag}</span>
                    <h3 className="text-white font-bold text-base leading-tight mt-0.5">{p.title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{p.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1620674984694-a5a52d1cd4d5?w=1800&q=80"
          alt=""
          className="w-full object-cover"
          style={{ height: "120%", marginTop: "-10%" }}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "rgba(220,88,10,0.85)", mixBlendMode: "multiply" }} />
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-8">
        <Reveal>
          <h2
            className="text-white font-black leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", fontFamily: "Arial Black, Impact, sans-serif" }}
          >
            Pronti a realizzare<br />il tuo progetto?
          </h2>
          <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Contattaci oggi per un sopralluogo e un preventivo gratuito. Il nostro team
            ti risponderà entro 24 ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-9 py-4 bg-white text-orange-600 font-black tracking-wide text-sm rounded-sm hover:bg-orange-50 transition-all shadow-2xl">
              RICHIEDI PREVENTIVO
            </button>
            <button className="px-9 py-4 border-2 border-white/50 text-white font-black tracking-wide text-sm rounded-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              CHIAMACI ORA
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#070809", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <BEKLogo />
          <p className="text-gray-600 text-sm mt-4 leading-relaxed">
            Quadri elettrici, automazione e soluzioni energetiche per l'industria e il residenziale dal 2004.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { label: "in", href: "#" },
              { label: "fb", href: "#" },
              { label: "ig", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-xs text-gray-600 hover:border-orange-500/40 hover:text-orange-400 transition-all uppercase font-bold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Soluzioni",
            links: ["Quadri Elettrici", "Fotovoltaico", "Automazione PLC", "Smart Home", "Sicurezza", "Manutenzione"],
          },
          {
            title: "Azienda",
            links: ["Chi siamo", "Il team", "Certificazioni", "Lavora con noi", "News"],
          },
          {
            title: "Contatti",
            links: ["Via Esempio 1, Bari", "info@bekelectric.com", "+39 XXX XXX XXXX", "Lun–Sab 8:00–18:00", "Emergenze 24/7"],
          },
        ].map(({ title, links }) => (
          <div key={title} id={title.toLowerCase()}>
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">{title}</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-600 hover:text-orange-400 text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="px-6 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-700">
          <span>© 2024 BEK Electric Systems Srl · P.IVA XXXXXXXXXXX</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#0a0c0e", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <Header />
      <Hero />
      <StatsBanner />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
