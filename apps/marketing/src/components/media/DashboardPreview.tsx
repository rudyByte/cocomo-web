"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import { Check, Clock, User } from "lucide-react";

interface CounterProps {
  value: string;
}

function Counter({ value }: CounterProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          const rawStr = value.replace(/,/g, "");
          const match = rawStr.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
          if (match) {
            const prefix = match[1];
            const numVal = parseFloat(match[2]);
            const suffix = match[3];
            const isDecimal = match[2].includes(".");
            const hasComma = value.includes(",");

            animate(0, numVal, {
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              onUpdate: (latest) => {
                let valStr = isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
                if (hasComma) {
                  valStr = parseFloat(valStr).toLocaleString("en-IN");
                }
                setDisplay(prefix + valStr + suffix);
              },
            });
          } else {
            setDisplay(value);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function DashboardPreview() {
  const [status, setStatus] = useState("Ready for Review");
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsApproved(true);
      setStatus("Approved & Scheduled");
    }, 2800);

    const resetTimer = setInterval(() => {
      setIsApproved(false);
      setStatus("Ready for Review");
      setTimeout(() => {
        setIsApproved(true);
        setStatus("Approved & Scheduled");
      }, 2800);
    }, 6500);

    return () => {
      clearTimeout(timer);
      clearInterval(resetTimer);
    };
  }, []);

  return (
    <div
      style={{
        background: "rgba(246, 248, 252, 0.55)",
        border: "1px solid rgba(10, 22, 47, 0.08)",
        borderRadius: "28px",
        padding: "2.5rem",
        marginBottom: "5rem",
        boxShadow: "0 20px 50px rgba(10,22,47,0.03)",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", borderBottom: "1px solid rgba(10,22,47,0.06)", paddingBottom: "1.25rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "#2563EB", fontWeight: 700, letterSpacing: "0.05em" }}>LIVE CAMPAIGN DEMO // MUMBAI FOODIES FEST</span>
        <span style={{ fontSize: "0.75rem", background: "rgba(61,174,128,0.08)", color: "#3DAE80", padding: "0.35rem 0.85rem", borderRadius: "100px", border: "1px solid rgba(61,174,128,0.2)", fontWeight: 600 }}>
          ● Active (12 Creators)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Total Reach", val: "482,500", change: "+18%" },
          { label: "Content Engagement", val: "8.4%", change: "+2.1%" },
          { label: "Redemptions", val: "1,240", change: "+340 this week" },
          { label: "Est. Revenue Lift", val: "₹3,45,000", change: "ROI 4.2x" },
        ].map((m) => (
          <div key={m.label} style={{ background: "#FFFFFF", padding: "1.5rem", borderRadius: "16px", border: "1px solid rgba(10, 22, 47, 0.06)", boxShadow: "0 4px 12px rgba(10,22,47,0.01)" }}>
            <div style={{ fontSize: "0.75rem", color: "#5E697F", marginBottom: "0.5rem", fontWeight: 500 }}>{m.label}</div>
            <div style={{ fontSize: "1.65rem", fontWeight: "700", fontFamily: "var(--font-mono)", color: "#0A162F" }}>
              <Counter value={m.val} />
            </div>
            <div style={{ fontSize: "0.75rem", color: "#3DAE80", marginTop: "0.35rem", fontWeight: 600 }}>{m.change}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(10, 22, 47, 0.06)" }}>
        <h3 style={{ fontSize: "0.875rem", color: "#0A162F", marginBottom: "1.25rem", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.05em" }}>CREATOR CONTENT APPROVAL QUEUE</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "rgba(246,248,252,0.5)", borderRadius: "10px", border: "1px solid rgba(10, 22, 47, 0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
                <User size={14} />
              </div>
              <div>
                <span style={{ fontWeight: "700", color: "#2563EB", marginRight: "1rem" }}>@foodie_mumbai</span>
                <span style={{ color: "#0A162F", fontSize: "0.9375rem", fontWeight: 500 }}>Top 5 Secret Pizza Spots in Bandra</span>
              </div>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#3DAE80", fontFamily: "var(--font-mono)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              <Check size={12} /> Approved &amp; Scheduled
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "rgba(246,248,252,0.5)", borderRadius: "10px", border: "1px solid rgba(10, 22, 47, 0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
                <User size={14} />
              </div>
              <div>
                <span style={{ fontWeight: "700", color: "#2563EB", marginRight: "1rem" }}>@cafeculture.in</span>
                <span style={{ color: "#0A162F", fontSize: "0.9375rem", fontWeight: 500 }}>Weekend Brunch Reel - Special Combo</span>
              </div>
            </div>
            <span 
              style={{ 
                fontSize: "0.75rem", 
                color: isApproved ? "#3DAE80" : "#D97706", 
                fontFamily: "var(--font-mono)", 
                fontWeight: 600, 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                transition: "color 0.4s ease"
              }}
            >
              {isApproved ? <Check size={12} /> : <Clock size={12} />} {status}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
