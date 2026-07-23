"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Brain, Palette, Monitor, Star, Video, TrendingUp, Target, PenTool, Users, Rocket, ArrowRight } from "lucide-react";
import styles from "./media.module.css";

// Lazy-load NetworkSphere Canvas
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
    icon: Brain,
    tags: ["Positioning", "Messaging", "Audience Research"],
  },
  {
    num: "02",
    title: "Visual Identity",
    desc: "Logos, color systems, typography — everything that makes you instantly recognizable.",
    icon: Palette,
    tags: ["Logo", "Brand System", "Guidelines"],
  },
  {
    num: "03",
    title: "Digital Design",
    desc: "Websites, landing pages, and digital assets designed to convert, not just sit pretty.",
    icon: Monitor,
    tags: ["Web Design", "UI/UX", "Motion"],
  },
  {
    num: "04",
    title: "Influencer Marketing",
    desc: "500+ creators. Every niche. Every city. Campaigns that reach the right eyeballs.",
    icon: Star,
    tags: ["Creator Network", "Campaigns", "ROI Tracking"],
  },
  {
    num: "05",
    title: "Content Production",
    desc: "Reels, shoots, carousels — content that stops the scroll and sparks conversation.",
    icon: Video,
    tags: ["Video", "Photography", "Reels"],
  },
  {
    num: "06",
    title: "Social Growth",
    desc: "Strategy, scheduling, analytics — turning your social into a revenue channel.",
    icon: TrendingUp,
    tags: ["Strategy", "Analytics", "Community"],
  }
];

const processes = [
  {
    num: "01",
    tag: "AUDIT & MAPPING",
    icon: Target,
    title: "Strategy First",
    desc: "We audit your brand, study your audience, and map a clear path before a single pixel is designed.",
  },
  {
    num: "02",
    tag: "DESIGN & SYSTEM",
    icon: PenTool,
    title: "Build the Story",
    desc: "Visual identity, messaging framework, and content system — all built to work seamlessly together.",
  },
  {
    num: "03",
    tag: "CREATOR ACTIVATION",
    icon: Users,
    title: "Deploy Creators",
    desc: "We activate the right creators at the right tier — nano, micro, macro — in targeted cities.",
  },
  {
    num: "04",
    tag: "ATTRIBUTION & SCALE",
    icon: Rocket,
    title: "Scale What Works",
    desc: "Analytics → insight → double down. We iterate fast and scale the assets that demonstrably convert.",
  }
];

const testimonials = [
  { initial: "R", name: "Rahul Mehta", role: "Co-Founder, Petpooja", quote: "Working with Cocomo felt like having a cheat code. They understood our brand in a week and started executing in two. The campaign results were insane." },
  { initial: "P", name: "Priya Shah", role: "Marketing Head, D2C Brand", quote: "Finally an agency that talks results, not just reach. Our influencer campaign drove a 40% spike in trial signups in the first month." },
  { initial: "A", name: "Arjun Kapoor", role: "Founder, Consumer Brand", quote: "The rebrand they delivered repositioned us entirely. We went from 'another startup' to 'the brand to watch.'" },
  { initial: "S", name: "Sneha Patel", role: "CMO, Lifestyle Company", quote: "Speed, quality, strategy — most agencies give you one. Cocomo gives you all three. I don't know how they do it, but I'm not complaining." }
];

const brandLogos = [
  "Petpooja", "Urban Company", "Mamaearth", "Wow Skin", "Nykaa", 
  "Licious", "Vedix", "The Man Company", "Mivi", "Slurrp Farm"
];

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

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 1 - index * 0.035]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 1 - index * 0.08]);

  return (
    <motion.div
      ref={cardRef}
      id={id}
      className={styles.stackCard}
      style={{ scale, opacity }}
    >
      <div>
        <span className={styles.stackCardNum}>{num}</span>
        <h3 className={styles.stackCardTitle}>{title}</h3>
        <p className={styles.stackCardBody}>{body}</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--clay)", fontFamily: "var(--font-serif)" }}>
              <ScrambleNumber value={statVal} />
            </span>
            <div style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>{statLabel}</div>
          </div>
          {otherStatVal && (
            <div>
              <span style={{ fontSize: "2rem", fontWeight: 900, color: "#0EA5E9", fontFamily: "var(--font-serif)" }}>
                <ScrambleNumber value={otherStatVal} />
              </span>
              <div style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>{otherStatLabel}</div>
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

// ── Horizontal Pinned Scroll Component ─────────────────────────────────────────
// Full-size tall cards, dynamically measured scroll distance, zero cutoff, pinned until 100% complete
function HorizontalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (railRef.current) {
        const railWidth = railRef.current.scrollWidth;
        const containerWidth = railRef.current.parentElement?.clientWidth || window.innerWidth;
        // Shift precisely by the difference to align the right edge of Card 06 with the container edge
        const dist = Math.max(0, railWidth - containerWidth);
        setScrollDistance(dist);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress: 0 when top enters viewport top, 1 when bottom leaves viewport bottom
        const totalScrollableDistance = elementHeight - viewportHeight;
        const scrolled = -rect.top;
        
        const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
        scrollProgress.set(currentProgress);
      }
    };

    // Delay calculation slightly to ensure CSS and DOM are fully rendered
    const timer = setTimeout(() => {
      calculateDistance();
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateDistance);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateDistance);
    };
  }, [scrollProgress]);

  // Map vertical scroll progress strictly from 0 to 1 over the entire sticky container range
  const x = useTransform(scrollProgress, [0, 1], [0, -scrollDistance]);
  const progressWidth = useTransform(scrollProgress, [0, 1], ["10%", "100%"]);

  return (
    <div ref={containerRef} className={styles.servicesHorizontalContainer} id="services">
      <div className={styles.servicesSticky}>
        <div className={styles.servicesContent}>
          <div className={styles.servicesHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className={styles.eyebrow}>Capabilities</span>
                <h2 className={styles.section__heading} style={{ marginBottom: 0 }}>Full-Stack Brand Power.</h2>
              </div>
              <div className={styles.servicesProgressBar}>
                <motion.div className={styles.servicesProgressFill} style={{ width: progressWidth }} />
              </div>
            </div>
          </div>

          <motion.div ref={railRef} style={{ x }} className={styles.servicesRail}>
            {services.map(({ num, title, desc, icon: Icon, tags }) => (
              <div key={num} className={styles.servicesRailCard}>
                <div className={styles.svc__top}>
                  <span className={styles.svc__num}>{num} / CAPABILITY</span>
                  <div className={styles.svc__iconWrap}>
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className={styles.services__title}>{title}</h3>
                <p className={styles.services__desc}>{desc}</p>
                <div className={styles.svc__tags}>
                  {tags.map((tag) => (
                    <span key={tag} className={styles.svc__tag}>
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
  
  const { scrollYProgress: testiScroll } = useScroll({
    target: testiRef,
    offset: ["start end", "end start"]
  });
  const testiX = useTransform(testiScroll, [0, 1], ["5%", "-32%"]);

  return (
    <div className={styles.page}>
      
      {/* HERO */}
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
              <Link href="/cocomo-media/contact" className={styles.hero__primary} id="media-proposal-cta">
                Get a proposal
                <ArrowRight size={16} />
              </Link>
              <a href="#work" className={styles.hero__secondary}>
                See our work ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFINITE SMOOTH LOGOS MARQUEE */}
      <div id="logos" className={styles.logosContainer}>
        <div className={styles.logosTrack}>
          {brandLogos.map((logo, idx) => (
            <span key={idx} className={styles.logoItem}>
              <span className={styles.logoDot} />
              {logo}
            </span>
          ))}
          {/* Duplicated set for seamless loop */}
          {brandLogos.map((logo, idx) => (
            <span key={`dup-${idx}`} className={styles.logoItem}>
              <span className={styles.logoDot} />
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* HORIZONTAL PINNED SERVICES SECTION */}
      <HorizontalServices />

      {/* CASE STUDIES STACKING CARDS */}
      <section className={styles.dashboard} id="work">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Case Studies</span>
          <h2 className={styles.section__heading}>The Stacks of Execution.</h2>
          <p className={styles.section__sub}>Scroll down to see our campaigns stack in depth.</p>
          
          <div className={styles.stackList}>
            {/* Card 1 */}
            <StackingCard
              id="card1"
              num="01 / FEATURED CAMPAIGN"
              title={<>The <em>Petpooja</em> Symphony:<br/>Scaling B2B Restaurant SaaS</>}
              body="We activated a synchronized multi-city network of 84 food creators. Rather than posting generic advertisements, they integrated Petpooja SaaS naturally into their restaurant-vlog workflows, driving high-intent leads."
              statVal="28M+"
              statLabel="Campaign Reach"
              otherStatVal="3.0x"
              otherStatLabel="Lead Pipeline Growth"
              index={0}
            >
              <div className={styles.stackMockDash}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--clay)" }}></div>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0EA5E9" }}></div>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--good)" }}></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  <div style={{ background: "var(--clay-tint)", border: "1px solid var(--clay-border)", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "var(--clay)", fontWeight: 800, fontSize: "14px" }}>28M+</div>
                    <div style={{ fontSize: "8px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>REACH</div>
                  </div>
                  <div style={{ background: "var(--clay-tint)", border: "1px solid var(--clay-border)", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "var(--clay)", fontWeight: 800, fontSize: "14px" }}>84</div>
                    <div style={{ fontSize: "8px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>CREATORS</div>
                  </div>
                  <div style={{ background: "var(--clay-tint)", border: "1px solid var(--clay-border)", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: "var(--clay)", fontWeight: 800, fontSize: "14px" }}>12</div>
                    <div style={{ fontSize: "8px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>CITIES</div>
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
                  <div style={{ color: "var(--clay)", fontWeight: 800, fontSize: "14px" }}>42% Spike</div>
                  <div style={{ fontSize: "8px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>APP INSTALLS</div>
                </div>
                <div className={styles.stackBentoItem}>
                  <div style={{ color: "#0EA5E9", fontWeight: 800, fontSize: "14px" }}>8 States</div>
                  <div style={{ fontSize: "8px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>GEO-TARGETED</div>
                </div>
              </div>
            </StackingCard>
          </div>
        </div>
      </section>

      {/* PROCESS / THE BLUEPRINT */}
      <section className={styles.process} id="process" aria-labelledby="process-heading">
        <div className={styles.container}>
          <span className={styles.eyebrow}>The Blueprint</span>
          <h2 id="process-heading" className={styles.section__heading}>How it works.</h2>
          <p className={styles.section__sub}>
            A disciplined, four-phase method for turning audience attention into business growth.
          </p>
          
          <div className={styles.process__steps}>
            {processes.map(({ num, tag, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                className={styles.process__step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.process__stepHeader}>
                  <span className={styles.process__num}>{num} // {tag}</span>
                  <div className={styles.process__iconBox}>
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className={styles.process__title}>{title}</h3>
                <p className={styles.process__desc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testiRef} style={{ padding: "var(--section-gap) 0", background: "var(--paper-2)", overflow: "hidden", borderTop: "1px solid var(--hairline-warm)" }}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Clients</span>
          <h2 className={styles.section__heading} style={{ marginBottom: "var(--space-8)" }}>Don&apos;t Take Our Word.</h2>
        </div>
        
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <motion.div style={{ x: testiX, display: "flex", gap: "var(--space-6)", width: "max-content" }}>
            {testimonials.map((testi, idx) => (
              <div key={idx} style={{ width: "420px", flexShrink: 0 }}>
                <div style={{
                  background: "var(--white)",
                  border: "1px solid var(--hairline)",
                  padding: "var(--space-8)",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-rest)"
                }}>
                  <div style={{ color: "var(--clay)", letterSpacing: "2px", marginBottom: "var(--space-4)" }}>★★★★★</div>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-base)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "var(--space-6)", color: "var(--ink)" }}>
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: "var(--clay-tint)", color: "var(--clay)",
                      border: "1px solid var(--clay-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontFamily: "var(--font-serif)"
                    }}>
                      {testi.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--ink)" }}>{testi.name}</div>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--ink-muted)" }}>{testi.role}</div>
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
          <Link href="/cocomo-media/contact" className={styles.close__cta} id="media-close-cta">
            Get a proposal
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
