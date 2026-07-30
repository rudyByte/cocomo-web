"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Brain, Palette, Monitor, Star, Video, TrendingUp, Target, PenTool, Users, Rocket, ArrowRight, Zap, Globe, Award, BarChart3 } from "lucide-react";
import styles from "./media.module.css";

/* ── Data ─────────────────────────────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "Brand Strategy",
    desc: "We decode your audience, sharpen your positioning, and build a story worth telling.",
    icon: Brain,
    emoji: "🧠",
    tags: ["Positioning", "Messaging", "Research"],
    detail: "Full brand audit · Competitive mapping · Tone of voice · Narrative framework"
  },
  {
    num: "02",
    title: "Visual Identity",
    desc: "Logos, color systems, typography — everything that makes you instantly recognizable.",
    icon: Palette,
    emoji: "🎨",
    tags: ["Logo", "Brand System", "Guidelines"],
    detail: "Logo design · Color palette · Typography · Brand guidelines doc"
  },
  {
    num: "03",
    title: "Digital Design",
    desc: "Websites, landing pages, and digital assets designed to convert, not just sit pretty.",
    icon: Monitor,
    emoji: "🖥️",
    tags: ["Web Design", "UI/UX", "Motion"],
    detail: "Website design · Landing pages · Digital ads · Motion assets"
  },
  {
    num: "04",
    title: "Influencer Marketing",
    desc: "500+ creators. Every niche. Every city. Campaigns that reach the right eyeballs.",
    icon: Star,
    emoji: "⭐",
    tags: ["Creators", "Campaigns", "ROI Tracking"],
    detail: "Creator sourcing · Brief writing · Campaign execution · Results reporting"
  },
  {
    num: "05",
    title: "Content Production",
    desc: "Reels, shoots, carousels — content that stops the scroll and sparks conversation.",
    icon: Video,
    emoji: "🎬",
    tags: ["Video", "Photography", "Reels"],
    detail: "Video production · Photography · Reel editing · Content calendar"
  },
  {
    num: "06",
    title: "Social Growth",
    desc: "Strategy, scheduling, analytics — turning your social into a revenue channel.",
    icon: TrendingUp,
    emoji: "📈",
    tags: ["Strategy", "Analytics", "Community"],
    detail: "Platform strategy · Content scheduling · Community management · Analytics"
  }
];

const growthSteps = [
  {
    num: "01",
    tag: "AUDIT & MAPPING",
    icon: "🔍",
    title: "Strategy First",
    desc: "We audit your brand, study your audience, and map a clear path before a single pixel is designed."
  },
  {
    num: "02",
    tag: "DESIGN & SYSTEM",
    icon: "✏️",
    title: "Build the Story",
    desc: "Visual identity, messaging framework, and content system — all built to work seamlessly together."
  },
  {
    num: "03",
    tag: "CREATOR ACTIVATION",
    icon: "🚀",
    title: "Deploy Creators",
    desc: "We activate the right creators at the right tier — nano, micro, macro — in targeted cities."
  },
  {
    num: "04",
    tag: "ATTRIBUTION & SCALE",
    icon: "📊",
    title: "Scale What Works",
    desc: "Analytics → insight → double down. We iterate fast and scale the assets that demonstrably convert."
  }
];

const counters = [
  { icon: "🏆", val: 500, suffix: "+", label: "Creators in network", valColor: true },
  { icon: "📍", val: 12, suffix: "", label: "Cities activated", valColor: false },
  { icon: "📈", val: 300, suffix: "M+", label: "Total campaign reach", valColor: true },
  { icon: "⚡", val: 42, suffix: "%", label: "Avg. conversion uplift", valColor: true },
];

const reels = [
  { grad: "pb1", handle: "@petpooja", caption: "B2B SaaS through food creator network" },
  { grad: "pb2", handle: "@mamaearth", caption: "Skincare launch — 2M reach in week 1" },
  { grad: "pb3", handle: "@urbancompany", caption: "Local trust amplified via micro influencers" },
  { grad: "pb4", handle: "@mivi_audio", caption: "Product reveal that broke category records" },
  { grad: "pb5", handle: "@nykaa", caption: "Beauty haul series — 4x ROAS achieved" },
  { grad: "pb6", handle: "@licious_in", caption: "Freshness story — authentic creator UGC" },
  { grad: "pb7", handle: "@theman_co", caption: "Men's grooming rebranding — viral series" },
];

const whyItems = [
  { num: "01", title: "Strategy before execution", body: "Every client engagement starts with a deep-dive audit. We never deploy until the strategy is bulletproof." },
  { num: "02", title: "Speed that doesn't cut corners", body: "Our production systems are built for rapid turnaround. Brief to delivery in days, not weeks." },
  { num: "03", title: "Creators you can't access alone", body: "10+ years building relationships with India's top creators means you skip the cold-pitch queue entirely." },
  { num: "04", title: "Attribution that actually makes sense", body: "Every rupee tracked. Every metric that matters, reported in a language your CFO will appreciate." },
];

const testimonials = [
  { initial: "R", name: "Rahul Mehta", role: "Co-Founder, Petpooja", quote: "Working with Cocomo felt like having a cheat code. They understood our brand in a week and started executing in two. The campaign results were insane." },
  { initial: "P", name: "Priya Shah", role: "Marketing Head, D2C Brand", quote: "Finally an agency that talks results, not just reach. Our influencer campaign drove a 40% spike in trial signups in the first month." },
  { initial: "A", name: "Arjun Kapoor", role: "Founder, Consumer Brand", quote: "The rebrand they delivered repositioned us entirely. We went from 'another startup' to 'the brand to watch.'" },
  { initial: "S", name: "Sneha Patel", role: "CMO, Lifestyle Company", quote: "Speed, quality, strategy — most agencies give you one. Cocomo gives you all three. I don't know how they do it, but I'm not complaining." }
];

const brandLogos = ["Petpooja", "Urban Company", "Mamaearth", "Wow Skin", "Nykaa", "Licious", "Vedix", "The Man Company", "Mivi", "Slurrp Farm"];

/* ── Animated Counter ─────────────────────────────────────────────────────── */
function AnimatedCounter({ val, suffix, color }: { val: number; suffix: string; color?: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const controls = animate(0, val, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [val]);

  return (
    <span ref={ref} className={styles.counterVal}>
      {color ? <span>{display}{suffix}</span> : <>{display}{suffix}</>}
    </span>
  );
}

/* ── Testimonial Slider ───────────────────────────────────────────────────── */
function TestiSlider() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, i));
    setIdx(clamped);
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector(`.${styles.testiCard}`) as HTMLElement | null;
      if (cardWidth) {
        const offset = clamped * (cardWidth.offsetWidth + 20);
        trackRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, []);

  return (
    <div className={styles.testiSection}>
      <div className={styles.testiHeader}>
        <span className={styles.eyebrow}>Clients</span>
        <h2 className={styles.section__heading}>Don&apos;t Take Our Word.</h2>
      </div>
      <div className={styles.testiSlider}>
        <div ref={trackRef} className={styles.testiTrack}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testiCard}>
              <div className={styles.testiStars}>★★★★★</div>
              <p className={styles.testiQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.testiAuthor}>
                <div className={styles.testiAvatar}>{t.initial}</div>
                <div>
                  <div className={styles.testiName}>{t.name}</div>
                  <div className={styles.testiRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.testiControls}>
        <button className={styles.testiBtn} onClick={() => goTo(idx - 1)} aria-label="Previous">←</button>
        <button className={styles.testiBtn} onClick={() => goTo(idx + 1)} aria-label="Next">→</button>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function CocomoMediaPage() {
  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero} aria-labelledby="media-heading">
        {/* Background elements */}
        <div className={styles.hero__mesh} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orb3}`} aria-hidden="true" />
        <div className={`${styles.floatShape} ${styles.fs1}`} aria-hidden="true" />
        <div className={`${styles.floatShape} ${styles.fs2}`} aria-hidden="true" />
        <div className={`${styles.floatShape} ${styles.fs3}`} aria-hidden="true" />
        <div className={`${styles.floatShape} ${styles.fs4}`} aria-hidden="true" />
        <div className={`${styles.floatShape} ${styles.fs5}`} aria-hidden="true" />

        <motion.div
          className={styles.hero__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.hero__eyebrow}>Branding · Influencer Marketing · Content</span>
          <h1 id="media-heading" className={styles.hero__heading}>
            We Don&apos;t Just Build Brands.
            <br />
            We Make Them <span className={styles.hero__accent}>Impossible</span>
            <br />
            to Ignore.
          </h1>
          <p className={styles.hero__sub}>
            From strategy to content to creators — we help brands grow where attention lives.
          </p>
          <div className={styles.hero__ctas}>
            <Link href="/cocomo-media/contact" className={styles.hero__primary} id="media-proposal-cta">
              Book a Call →
            </Link>
            <a href="#proof" className={styles.hero__secondary}>
              See Our Work
              <span className={styles.hero__secondaryArrow}>↓</span>
            </a>
          </div>
        </motion.div>

        <div className={styles.hero__scrollHint} aria-hidden="true">
          <div className={styles.scrollLine} />
          Scroll
        </div>
      </section>

      {/* ── LOGOS MARQUEE — dark background ── */}
      <div id="logos" className={styles.logosContainer}>
        <div className={styles.logosTrack}>
          {[...brandLogos, ...brandLogos].map((logo, idx) => (
            <span key={idx} className={styles.logoItem}>
              <span className={styles.logoDot} />
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Capabilities</span>
          <h2 className={styles.section__heading}>Full-Stack Brand Power.</h2>
          <p className={styles.section__sub}>
            Every discipline, every channel — working as one seamless system.
          </p>

          <div className={styles.servicesGrid}>
            {services.map(({ num, title, desc, emoji, tags }, i) => (
              <motion.div
                key={num}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.svc__num}>{num}</span>
                <div className={styles.svc__iconWrap}>{emoji}</div>
                <h3 className={styles.services__title}>{title}</h3>
                <p className={styles.services__desc}>{desc}</p>
                <div className={styles.svc__tags}>
                  {tags.map((tag) => (
                    <span key={tag} className={styles.svc__tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROWTH JOURNEY — dark ── */}
      <section className={styles.growthSection} id="process">
        <div className={styles.container}>
          <div className={styles.growthHeader}>
            <span className={styles.eyebrow}>The Blueprint</span>
            <h2 className={styles.growthHeading}>How it works.</h2>
            <p className={styles.growthSub}>
              A disciplined, four-phase method for turning audience attention into business growth.
            </p>
          </div>

          <div className={styles.growthSteps}>
            <div className={styles.growthConnector} aria-hidden="true" />
            {growthSteps.map(({ num, icon, title, desc }, i) => (
              <motion.div
                key={num}
                className={styles.growthStep}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.growthNum}>{num}</div>
                <div className={styles.growthIcon}>{icon}</div>
                <h3 className={styles.growthTitle}>{title}</h3>
                <p className={styles.growthBody}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE STUDY — cinematic ── */}
      <section className={styles.proofSection} id="proof">
        <div className={styles.container} style={{ paddingInline: "var(--container-pad)" }}>
          <span className={styles.eyebrow}>Featured Work</span>
          <h2 className={styles.section__heading}>The Proof.</h2>
        </div>

        <motion.div
          className={styles.proofCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.proofWatermark} aria-hidden="true">PETPOOJA</span>

          <div className={styles.proofSplit}>
            {/* Visual Panel */}
            <div className={styles.proofVisualPanel}>
              {/* Logo Badge */}
              <div className={styles.proofLogoBadge}>
                <div className={styles.proofLogoDot} />
                <div>
                  <span className={styles.proofLogoText}>Petpooja</span>
                  <span className={styles.proofLogoSub}>Restaurant SaaS</span>
                </div>
              </div>

              {/* Hook Metric */}
              <div className={styles.proofHook}>
                <span className={styles.proofHookNumber}>
                  28<em>M+</em>
                </span>
                <span className={styles.proofHookLabel}>Campaign Reach</span>
              </div>
            </div>

            {/* Text Panel */}
            <div className={styles.proofTextPanel}>
              <span className={styles.proofBadge}>
                <span>●</span> Featured Campaign
              </span>

              <h3 className={styles.proofTitle}>
                The <em>Petpooja</em> Symphony:<br />
                Scaling B2B Restaurant SaaS
              </h3>

              <div className={styles.proofNarrative}>
                <div className={styles.proofNarrativeBlock}>
                  <span className={styles.proofNarrativeLabel}>The Challenge</span>
                  <p className={styles.proofNarrativeText}>
                    Petpooja needed to reach restaurant owners through content — not ads. Traditional B2B playbooks were ignored by their audience.
                  </p>
                </div>
                <div className={styles.proofNarrativeBlock}>
                  <span className={styles.proofNarrativeLabel}>The Solution</span>
                  <p className={styles.proofNarrativeText}>
                    We activated 84 food creators who integrated Petpooja organically into restaurant-vlog workflows, driving high-intent leads.
                  </p>
                </div>
              </div>

              <div className={styles.proofStats}>
                <div>
                  <span className={styles.proofStatVal}>28M+</span>
                  <span className={styles.proofStatLabel}>Total campaign reach</span>
                </div>
                <div>
                  <span className={styles.proofStatVal}>3.0x</span>
                  <span className={styles.proofStatLabel}>Lead pipeline growth</span>
                </div>
              </div>

              <div className={styles.proofBento}>
                <div className={styles.proofBentoCard}>
                  <span className={styles.proofBentoIcon}>🎥</span>
                  <div className={styles.proofBentoTitle}>84 creators deployed</div>
                  <div className={styles.proofBentoSub}>Nano, micro & macro across 12 cities</div>
                </div>
                <div className={styles.proofBentoCard}>
                  <span className={styles.proofBentoIcon}>📍</span>
                  <div className={styles.proofBentoTitle}>12 cities targeted</div>
                  <div className={styles.proofBentoSub}>Geo-specific campaign activation</div>
                </div>
                <div className={styles.proofBentoCard}>
                  <span className={styles.proofBentoIcon}>⚡</span>
                  <div className={styles.proofBentoTitle}>High-intent B2B leads</div>
                  <div className={styles.proofBentoSub}>Via organic creator integration</div>
                </div>
              </div>

              <Link href="/cocomo-media/contact" className={styles.btnCaseStudy}>
                Start your campaign
                <span className={styles.btnCaseStudyArrow}>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── COUNTERS ── */}
      <section className={styles.countersSection} id="numbers">
        <div className={styles.container}>
          <div className={styles.countersHeader}>
            <span className={styles.eyebrow}>By the numbers</span>
            <h2 className={styles.section__heading}>Numbers that matter.</h2>
            <p className={styles.section__sub}>
              Real results from real campaigns. No vanity metrics — just bottom-line impact.
            </p>
          </div>

          <div className={styles.countersGrid}>
            {counters.map(({ icon, val, suffix, label, valColor }) => (
              <div key={label} className={styles.counterItem}>
                <span className={styles.counterIcon}>{icon}</span>
                <AnimatedCounter val={val} suffix={suffix} color={valColor} />
                <span className={styles.counterLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.liveFeed}>
            {["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune"].map((city) => (
              <span key={city} className={styles.feedPill}>
                <span className={styles.feedDot} />
                Active in {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHONE REELS ── */}
      <section className={styles.reelsSection} id="content">
        <div className={styles.reelsHeader}>
          <span className={styles.eyebrow}>Content at Scale</span>
          <h2 className={styles.section__heading}>Content that stops the scroll.</h2>
          <p className={styles.section__sub}>
            Every reel engineered for engagement. Every creator brief for conversion.
          </p>
        </div>

        <div className={styles.reelsTrack}>
          {[...reels, ...reels].map(({ grad, handle, caption }, i) => (
            <div key={i} className={styles.phoneFrame}>
              <div className={styles.phoneShell}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <div className={`${styles.phoneScreenBg} ${styles[grad as keyof typeof styles]}`} />
                  <div className={styles.phoneGrad} />
                  <div className={styles.phoneContent}>
                    <span className={styles.phoneHandle}>{handle}</span>
                    <span className={styles.phoneCaption}>{caption}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY COCOMO ── */}
      <section className={styles.whySection} id="why">
        <div className={styles.whyCard}>
          <span className={styles.eyebrow}>Why us</span>
          <h2 className={styles.section__heading}>Most agencies talk big.</h2>
          <p className={styles.section__sub}>
            We've been in the trenches. Here's what makes the difference.
          </p>

          <div className={styles.whyGrid}>
            <ul className={styles.whyList}>
              {whyItems.map(({ num, title, body }) => (
                <li key={num} className={styles.whyItem}>
                  <span className={styles.whyNum}>{num}</span>
                  <div>
                    <div className={styles.whyTitle}>{title}</div>
                    <div className={styles.whyBody}>{body}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.whyRight}>
              <div className={styles.whyFeature}>
                <span className={styles.whyFeatureIcon}>🎯</span>
                <h3 className={styles.whyFeatureTitle}>India&apos;s most connected creator ecosystem</h3>
                <p className={styles.whyFeatureBody}>
                  500+ vetted creators across beauty, food, lifestyle, tech, finance — every city, every niche, every tier.
                </p>
                <div className={styles.whyTags}>
                  {["Nano", "Micro", "Macro", "Celebrity"].map((t) => (
                    <span key={t} className={styles.whyTag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestiSlider />

      {/* ── CLOSE CTA ── */}
      <section className={styles.close} id="contact">
        <div className={styles.closeInner}>
          <div className={styles.closeContent}>
            <span className={styles.close__eyebrow}>Ready to grow?</span>
            <h2 className={styles.close__heading}>
              Ready to build something <em>people can&apos;t ignore?</em>
            </h2>
            <p className={styles.close__sub}>
              Strategy call → creative brief → launch — in under two weeks.
            </p>
            <Link href="/cocomo-media/contact" className={styles.close__cta} id="media-close-cta">
              Book a Free Strategy Call →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
