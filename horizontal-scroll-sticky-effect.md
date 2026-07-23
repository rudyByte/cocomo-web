# Pinned Horizontal Scroll-Scrub Sticky Effect

This document explains the implementation of the advanced, high-performance horizontal scroll-scrub sticky card effect created for the Cocomo website, followed by a **Master Prompt** you can use in any other coding assistant to replicate this exact effect in other projects.

---

## 1. How the Effect Works

The effect creates a seamless transition where vertical scrolling page movement is temporarily locked, and the scroll input is instead mapped to translate a rail of cards horizontally across the screen. Once all cards have been fully revealed, the lock releases, and normal vertical page scrolling resumes.

### Key Architecture Components:
1. **The Scroll Tracker Height (Parent)**: A tall vertical container (e.g., `280vh` or `300vh` tall) with `position: relative`. This defines the scroll "duration" of the effect.
2. **The Viewport Pin (Sticky Child)**: A child container with `position: sticky; top: var(--nav-height); height: calc(100vh - var(--nav-height));`. This holds the visible elements locked inside the screen.
3. **The Horizontal Rail (Grandchild)**: A flex layout wrapper containing all cards, shifted left by translating `x` via CSS or Framer Motion (`x = progress * -scrollDistance`).
4. **Dynamic Offset Calculations**: A client-side listener reading `getBoundingClientRect()` on scroll to calculate exact scroll progress (`0` to `1`) and client measurements (`railWidth - containerWidth`) to align the final card precisely at the right border of the screen regardless of viewport sizes.
5. **Sticky Context Safety**: All ancestor elements must not contain `overflow: hidden`, `overflow-x: hidden`, `overflow-y: hidden`, `overflow: scroll`, `overflow: clip`, or `overflow: auto` properties, as they break the CSS sticky viewport reference.

---

## 2. Code Reference

### React Component Layout & Hook:
```tsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "./ScrollContainer.module.css";

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (railRef.current) {
        const railWidth = railRef.current.scrollWidth;
        const containerWidth = railRef.current.parentElement?.clientWidth || window.innerWidth;
        // Align final card precisely with the container's right padding bounds
        const dist = Math.max(0, railWidth - containerWidth);
        setScrollDistance(dist);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress: 0 at top entrance, 1 when bottom leaves viewport bottom
        const totalScrollableDistance = elementHeight - viewportHeight;
        const scrolled = -rect.top;
        
        const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
        scrollProgress.set(currentProgress);
      }
    };

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

  const x = useTransform(scrollProgress, [0, 1], [0, -scrollDistance]);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        <div className={styles.contentColumn}>
          {/* Header */}
          <div className={styles.header}>
            <h2>Features & Stacks</h2>
          </div>

          {/* Cards Rail */}
          <motion.div ref={railRef} style={{ x }} className={styles.rail}>
            {/* Card Elements Go Here */}
            <div className={styles.card}>Card 01</div>
            <div className={styles.card}>Card 02</div>
            <div className={styles.card}>Card 03</div>
            <div className={styles.card}>Card 04</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

### CSS Layout (`ScrollContainer.module.css`):
```css
.scrollContainer {
  height: 280vh; /* Scroll Duration */
  position: relative;
}

.stickyWrapper {
  position: sticky;
  top: 72px; /* Offset for custom nav headers */
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  overflow: hidden; /* Clips horizontal overflow of the rail */
}

.contentColumn {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.rail {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  will-change: transform;
}

.card {
  width: 340px;
  height: 380px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  flex-shrink: 0;
}
```

---

## 3. MASTER PROMPT FOR OTHER PROJECTS

Copy and paste the prompt below into any AI tool (Claude, ChatGPT, etc.) to apply this scrolling sticky effect to any list of items, cards, or sections:

```markdown
Act as a senior frontend engineer. I want you to convert a standard vertical layout or static grid of cards into a custom, high-performance horizontal scroll-scrub sticky effect using React, CSS modules, and Framer Motion. 

Follow these strict constraints to ensure pixel-perfect sticking and alignment:

1. STRUCTURE & CSS POSITIONS:
   - Create a tall parent scroll container with "position: relative" and height "280vh" (scroll duration track).
   - Create a sticky child wrapper inside the parent with "position: sticky", a custom top offset (e.g. 72px for navbar), and height adjusted for viewport bounds ("calc(100vh - offset)"). Use "overflow: hidden" on this sticky wrapper to hide horizontal rail overflow.
   - Place a flex layout rail ("display: flex", "width: max-content") as a grandchild containing the actual cards.

2. PREVENT STICKY BREAKS:
   - Ensure that the CSS class wrapping this entire layout and any ancestor containers do NOT have "overflow: hidden", "overflow-x: hidden", "overflow-y: hidden", "overflow: scroll", "overflow: clip", or "overflow: auto" properties, as they break position: sticky reference.

3. ACCURATE SCROLL MEASUREMENTS:
   - Do NOT use standard viewport window width (window.innerWidth) to compute translation distance, as it causes cut-off on wider screens with centered content containers.
   - Dynamically compute translation distance inside an effect: "scrollDistance = railWidth - containerWidth" (where containerWidth is the clientWidth of the rail's parent content container).
   - Use a resize listener to update this dynamically on browser resizing.

4. PROGRESS SYNCHRONIZATION:
   - Do NOT rely solely on Framer Motion's automatic "useScroll" target offsets if the page has dynamic loaders or dynamic heights.
   - Instead, compute scroll progress manually in a window scroll event listener using "getBoundingClientRect()" of the parent scroll container:
     * "const rect = containerRef.current.getBoundingClientRect();"
     * "const totalScrollableDistance = rect.height - window.innerHeight;"
     * "const scrolled = -rect.top;"
     * "const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));"
   - Feed this calculated progress into a Framer Motion "useMotionValue" to maintain smooth, high-performance rendering.
   - Use "useTransform" to map the progress value strictly from [0, 1] to translate the cards rail on the x-axis ("x = progress * -scrollDistance").

Implement this system cleanly, separating layout components and CSS module classes, and ensuring that Card 01 enters at left margin alignment and the last card stops exactly at the right container bounds.
```
