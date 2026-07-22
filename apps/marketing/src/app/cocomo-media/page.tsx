"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./media.module.css";

// Lazy-load the custom Brand-Creator flow Canvas component
const NetworkSphere = dynamic(
  () => import("@/components/media/NetworkSphere").then((m) => m.NetworkSphere),
  {
    ssr: false,
    loading: () => (
      <div className={styles.sphere__fallback} aria-hidden="true">
        <div className={styles.sphere__static} />
      </div>
    ),
  }
);

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    desc: "We decode your audience, sharpen your positioning, and build a story worth telling.",
    icon: "🧠",
    tags: ["Positioning", "Messaging", "Audience Research"],
  },
  {
    num: "02",
    title: "Visual Identity",
    desc: "Logos, color systems, typography — everything that makes you instantly recognizable.",
    icon: "🎨",
    tags: ["Logo", "Brand System", "Guidelines"],
  },
  {
    num: "03",
    title: "Digital Design",
    desc: "Websites, landing pages, and digital assets designed to convert, not just sit pretty.",
    icon: "💻",
    tags: ["Web Design", "UI/UX", "Motion"],
  },
  {
    num: "04",
    title: "Influencer Marketing",
    desc: "500+ creators. Every niche. Every city. Campaigns that reach the right eyeballs.",
    icon: "🌟",
    tags: ["Creator Network", "Campaigns", "ROI Tracking"],
  },
  {
    num: "05",
    title: "Content Production",
    desc: "Reels, shoots, carousels — content that stops the scroll and sparks conversation.",
    icon: "🎬",
    tags: ["Video", "Photography", "Reels"],
  },
  {
    num: "06",
    title: "Social Media Growth",
    desc: "Strategy, scheduling, analytics — turning your social into a revenue channel.",
    icon: "📈",
    tags: ["Strategy", "Analytics", "Community"],
  }
];

const processes = [
  { num: "01", icon: "🎯", title: "Strategy First", desc: "We audit your brand, study your audience, and map a clear path before a single pixel is designed." },
  { num: "02", icon: "✍️", title: "Build the Story", desc: "Visual identity, messaging framework, and content system — all built to work together." },
  { num: "03", icon: "🤝", title: "Deploy Creators", desc: "We activate the right creators at the right tier — nano, micro, macro — in the right cities." },
  { num: "04", icon: "🚀", title: "Scale What Works", desc: "Analytics → insight → double down. We iterate fast and scale the assets that actually convert." }
];

const testimonials = [
  { initial: "R", name: "Rahul Mehta", role: "Co-Founder, Petpooja", quote: "Working with Cocomo felt like having a cheat code. They understood our brand in a week and started executing in two. The campaign results were insane." },
  { initial: "P", name: "Priya Shah", role: "Marketing Head, D2C Brand", quote: "Finally an agency that talks results, not just reach. Our influencer campaign drove a 40% spike in trial signups in the first month." },
  { initial: "A", name: "Arjun Kapoor", role: "Founder, Consumer Brand", quote: "The rebrand they delivered repositioned us entirely. We went from 'another startup' to 'the brand to watch.'" },
  { initial: "S", name: "Sneha Patel", role: "CMO, Lifestyle Company", quote: "Speed, quality, strategy — most agencies give you one. Cocomo gives you all three. I don't know how they do it, but I'm not complaining." }
];

// Departure-board style text scramble element
function ScrambleNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          let iterations = 0;
          const target = value;
          const chars = "0123456789X%M+₹";
          const interval = setInterval(() => {
            setDisplay(
              target
                .split("")
                .map((char, index) => {
                  if (index < iterations) return target[index];
                  if (char === "M" || char === "%" || char === "+" || char === "₹" || char === ".") return char;
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            iterations += 1 / 3;
            if (iterations >= target.length) {
              clearInterval(interval);
              setDisplay(target);
            }
          }, 35);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} style={{ fontFamily: "var(--font-mono), monospace" }}>{display}</span>;
}

// Interactive 3D Card Stack helper component
interface StackingCardProps {
  id: string;
  num: string;
  title: React.ReactNode;
  body: string;
  statVal: string;
  statLabel: string;
  otherStatVal?: string;
  otherStatLabel?: string;
  index: number;
  children: React.ReactNode;
}

function StackingCard({ id, num, title, body, statVal, statLabel, otherStatVal, otherStatLabel, index, children }: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 100px"]
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 1 - index * 0.04]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 1 - index * 0.1]);
  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, index * -2]);

  return (
    <motion.div
      ref={cardRef}
      id={id}
      className={styles.stackCard}
      style={{
        scale,
        opacity,
        rotateX,
        perspective: 1000
      }}
      data-hover-text="VIEW"
    >
      <div>
        <span className={styles.stackCardNum}>{num}</span>
        <h3 className={styles.stackCardTitle}>{title}</h3>
        <p className={styles.stackCardBody}>{body}</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "2rem", fontWeight: 600, color: "#2563EB", fontFamily: "serif" }}>
              <ScrambleNumber value={statVal} />
            </span>
            <div style={{ fontSize: "11px", color: "#5E697F", marginTop: "4px" }}>{statLabel}</div>
          </div>
          {otherStatVal && (
            <div>
              <span style={{ fontSize: "2rem", fontWeight: 600, color: "#2F5FE0", fontFamily: "serif" }}>
                <ScrambleNumber value={otherStatVal} />
              </span>
              <div style={{ fontSize: "11px", color: "#5E697F", marginTop: "4px" }}>{otherStatLabel}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.stackCardVisual}>
        {children}
      </div>
    </motion.div>
  );
}

// Services Pinned Horizontal Scroll Section
function HorizontalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <div ref={containerRef} className={styles.servicesHorizontalContainer} id="services">
      <div className={styles.servicesSticky}>
        <div className={styles.servicesContent}>
          <div className={styles.servicesHeader}>
            <span className={styles.eyebrow}>Capabilities</span>
            <h2 className={styles.section__heading} style={{ color: "#0A162F" }}>Full-Stack Brand Power.</h2>
            <p className={styles.section__sub}>Scroll horizontally to explore our capability stacks.</p>
          </div>
          <motion.div style={{ x }} className={styles.servicesRail}>
            {services.map((svc) => (
              <div key={svc.num} className={styles.servicesRailCard} data-hover-text="DRAG">
                <span className={styles.svc__num}>{svc.num}</span>
                <span className={styles.services__icon} style={{ fontSize: "2rem" }}>{svc.icon}</span>
                <h3 className={styles.services__title} style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBlock: "1rem", color: "#0A162F" }}>{svc.title}</h3>
                <p className={styles.services__desc} style={{ color: "#5E697F", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{svc.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
                  {svc.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "10px", padding: "4px 10px", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.1)", borderRadius: "100px", color: "#2563EB" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CocomoMediaPage() {
  const testiRef = useRef<HTMLDivElement>(null);
  
  // Testimonials Parallax Horizontal Scroll Scrub
  const { scrollYProgress: testiScroll } = useScroll({
    target: testiRef,
    offset: ["start end", "end start"]
  });
  const testiX = useTransform(testiScroll, [0, 1], ["5%", "-32%"]);

  return (
    <div className={styles.page}>
      
      {/* HERO with custom attention-flow interactive network */}
      <section className={styles.hero} aria-labelledby="media-heading">
        <div className={styles.hero__sphere}>
          <Suspense fallback={null}>
            <NetworkSphere />
          </Suspense>
        </div>

        <div className={styles.hero__overlay} aria-hidden="true" />

        <div className={styles.hero__content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.hero__eyebrow}>Attention &amp; Influence Ecosystem</span>
            <h1 id="media-heading" className={styles.hero__heading}>
              We Don&apos;t Just Build Brands.
              <br />
              We Make Them <span className={styles.hero__gradient}>Impossible</span> to Ignore.
            </h1>
            <p className={styles.hero__sub}>
              We deploy strategic creator networks, orchestrate viral content assets, and funnel consumer attention back to your bottom line.
            </p>
            <div className={styles.hero__ctas}>
              <Link href="/cocomo-media/contact" className={styles.hero__primary} id="media-proposal-cta" data-magnetic>
                Get a proposal
              </Link>
              <a href="#work" className={styles.hero__secondary}>
                See our work ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOGOS MARQUEE */}
      <div id="logos" style={{ overflow: "hidden", background: "#0A162F", padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className={styles.logosTrack}>
          <div className="logos-track" style={{ display: "flex", gap: "48px", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
            {["Petpooja", "Urban Company", "Mamaearth", "Wow Skin", "Nykaa", "Licious", "Vedix", "The Man Company", "Mivi", "Slurrp Farm"].map((logo, idx) => (
              <span key={idx} style={{ color: "rgba(246,248,252,0.35)", letterSpacing: "2.5px", textTransform: "uppercase", fontSize: "15px", fontFamily: "serif", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: "#00B4D8", borderRadius: "50%", opacity: 0.6 }} />
                {logo}
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {["Petpooja", "Urban Company", "Mamaearth", "Wow Skin", "Nykaa", "Licious", "Vedix", "The Man Company", "Mivi", "Slurrp Farm"].map((logo, idx) => (
              <span key={`dup-${idx}`} style={{ color: "rgba(246,248,252,0.35)", letterSpacing: "2.5px", textTransform: "uppercase", fontSize: "15px", fontFamily: "serif", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: "#00B4D8", borderRadius: "50%", opacity: 0.6 }} />
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* HORIZONTAL PINNED SERVICES SECTION */}
      <HorizontalServices />

      {/* SCROLL INTERACTIVE STACKING CARDS */}
      <section className={styles.dashboard} id="work">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Case Studies</span>
          <h2 className={styles.section__heading}>The Stacks of Execution.</h2>
          <p className={styles.section__sub}>Scroll down to see our campaigns stack on top of each other in three-dimensional depth.</p>
          
          <div className={styles.stackList}>
            {/* Card 1 */}
            <StackingCard
              id="card1"
              num="01 / FEATURED CAMPAIGN"
              title={<>The <em>Petpooja</em> Symphony:<br/>Scaling B2B Restaurant SaaS</>}
              body="We activated a synchronized multi-city network of 84 food creators. Rather than posting generic advertisements, they integrated Petpooja SaaS naturally into their restaurant-vlog workflows, driving high-intent leads."
              statVal="28M+"
              statLabel="Campaign Reach"
              otherStatVal="3.0"
              otherStatLabel="Lead Pipeline Growth"
              index={0}
            >
              <div className={styles.stackMockDash}>
                <div className={styles.mockHeader} style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                  <div className={styles.mockDot} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}></div>
                  <div className={styles.mockDot} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}></div>
                  <div className={styles.mockDot} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>28M+</div>
                    <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>REACH</div>
                  </div>
                  <div style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>84</div>
                    <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>CREATORS</div>
                  </div>
                  <div style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>12</div>
                    <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>CITIES</div>
                  </div>
                </div>
              </div>
            </StackingCard>

            {/* Card 2 */}
            <StackingCard
              id="card2"
              num="02 / BRAND TRANSFORMATION"
              title={<>Revitalizing <em>Urban Company</em><br/>Local Partner Authority</>}
              body="Building authentic local trust for home services. We localized campaigns with micro-influencers across 8 states, executing custom creator-native visual hooks that translated directly to service bookings."
              statVal="15M+"
              statLabel="Localized Reach"
              otherStatVal="42%"
              otherStatLabel="Increase in App Installs"
              index={1}
            >
              <div className={styles.stackGridBento}>
                <div className={styles.stackBentoItem}>
                  <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>42% Spike</div>
                  <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>APP INSTALLS</div>
                </div>
                <div className={styles.stackBentoItem}>
                  <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>8 States</div>
                  <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>GEO-TARGETED</div>
                </div>
                <div className={styles.stackBentoItem}>
                  <div style={{ color: "#00B4D8", fontWeight: 700, fontSize: "14px" }}>15M+</div>
                  <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>TOTAL VISUAL VIEWS</div>
                </div>
              </div>
            </StackingCard>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.process} id="process" aria-labelledby="process-heading">
        <div className={styles.container}>
          <span className={styles.eyebrow} style={{ color: "#00B4D8" }}>The Blueprint</span>
          <h2 id="process-heading" className={styles.section__heading}>How it works</h2>
          
          <div className={styles.process__steps}>
            {processes.map(({ num, icon, title, desc }) => (
              <div key={num} className={styles.process__step}>
                <span className={styles.process__num}>{num}</span>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }}>{icon}</span>
                <h3 className={styles.process__title}>{title}</h3>
                <p className={styles.process__desc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX-DRIFT TESTIMONIALS (Scroll-scrubbed Horizontal Track) */}
      <section ref={testiRef} style={{ padding: "6rem 0", background: "#FAFBFC", overflow: "hidden" }}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Clients</span>
          <h2 className={styles.section__heading} style={{ marginBottom: "3rem" }}>Don&apos;t Take Our Word.</h2>
        </div>
        
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <motion.div style={{ x: testiX, display: "flex", gap: "32px", width: "max-content" }}>
            {testimonials.map((testi, idx) => (
              <div key={idx} style={{ width: "420px", flexShrink: 0 }} data-hover-text="VIEW">
                <div style={{ background: "#FFFFFF", border: "1px solid rgba(10, 22, 47, 0.06)", padding: "40px 32px", borderRadius: "24px", boxShadow: "0 10px 30px rgba(10,22,47,0.02)" }}>
                  <div style={{ color: "#2563EB", letterSpacing: "2px", marginBottom: "18px" }}>★★★★★</div>
                  <p style={{ fontFamily: "serif", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.6, marginBottom: "24px", color: "#0A162F" }}>
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#E2EBF8", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "serif" }}>
                      {testi.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#0A162F" }}>{testi.name}</div>
                      <div style={{ fontSize: "12px", color: "#5E697F" }}>{testi.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLOSE CTA */}
      <section className={styles.close}>
        <div className={styles.container}>
          <h2 className={styles.close__heading}>
            Ready to build something people can&apos;t ignore?
          </h2>
          <Link href="/cocomo-media/contact" className={styles.close__cta} id="media-close-cta" data-magnetic>
            Get a proposal
          </Link>
        </div>
      </section>
    </div>
  );
}
