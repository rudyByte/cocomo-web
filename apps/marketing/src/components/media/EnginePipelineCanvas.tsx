"use client";

import React, { useEffect, useRef } from "react";

class PipelineNode {
  name: string;
  label: string;
  icon: string;
  xPct: number;
  yPct: number;
  x: number = 0;
  y: number = 0;
  baseSize: number;
  size: number;
  color: string;
  pulse: number = 0;
  hover: boolean = false;
  isCore: boolean;

  constructor(name: string, label: string, icon: string, xPct: number, yPct: number, size: number, color: string, isCore = false) {
    this.name = name;
    this.label = label;
    this.icon = icon;
    this.xPct = xPct;
    this.yPct = yPct;
    this.baseSize = size;
    this.size = size;
    this.color = color;
    this.isCore = isCore;
  }

  update(width: number, height: number, mouse: { x: number | null; y: number | null }) {
    this.x = width * this.xPct;
    this.y = height * this.yPct;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      const hoverRadius = this.isCore ? 100 : 70;
      if (dist < hoverRadius) {
        this.hover = true;
        this.size += (this.baseSize * 1.35 - this.size) * 0.15;
      } else {
        this.hover = false;
        this.size += (this.baseSize - this.size) * 0.15;
      }
    } else {
      this.hover = false;
      this.size += (this.baseSize - this.size) * 0.15;
    }

    this.pulse += 0.04;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    // Core node styling (luxurious double ring & scanning lines)
    if (this.isCore) {
      // Rotating outer dash ring
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 24;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size + 12 + Math.sin(this.pulse) * 3, this.pulse * 0.5, this.pulse * 0.5 + Math.PI * 1.5);
      ctx.stroke();

      // Outer solid ring
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(37,99,235,0.15)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size + 24, 0, Math.PI * 2);
      ctx.stroke();

      // Core fill
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(1, "#F6F8FC");
      ctx.fillStyle = grad;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(37,99,235,0.3)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Core border
      ctx.shadowBlur = 0;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text Inside Core
      ctx.fillStyle = "#0A162F";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(this.name, this.x, this.y - 7);
      
      // Version label
      ctx.font = "500 8px monospace";
      ctx.fillStyle = "#2563EB";
      ctx.fillText(this.label, this.x, this.y + 11);

      // Icon above
      ctx.font = "14px sans-serif";
      ctx.fillText(this.icon, this.x, this.y - 25);
    } else {
      // Regular Node
      // Outer glow
      ctx.shadowBlur = this.hover ? 16 : 8;
      ctx.shadowColor = this.color;
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = this.hover ? this.color : "rgba(10, 22, 47, 0.08)";
      ctx.lineWidth = this.hover ? 2 : 1;

      // Rounded rect pill
      const rx = this.x - this.size * 2;
      const ry = this.y - 18;
      const rw = this.size * 4;
      const rh = 36;
      const radius = 10;

      ctx.beginPath();
      ctx.moveTo(rx + radius, ry);
      ctx.lineTo(rx + rw - radius, ry);
      ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
      ctx.lineTo(rx + rw, ry + rh - radius);
      ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
      ctx.lineTo(rx + radius, ry + rh);
      ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
      ctx.lineTo(rx, ry + radius);
      ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
      ctx.closePath();
      
      ctx.fill();
      ctx.stroke();

      // Draw Icon
      ctx.shadowBlur = 0;
      ctx.fillStyle = this.color;
      ctx.font = "13px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(this.icon, rx + 12, this.y);

      // Draw Label Text
      ctx.fillStyle = "#0A162F";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(this.name, rx + 30, this.y - 5);

      ctx.fillStyle = "#5E697F";
      ctx.font = "500 8px sans-serif";
      ctx.fillText(this.label, rx + 30, this.y + 7);
    }

    ctx.restore();
  }
}

class TelemetryPacket {
  startNode: PipelineNode;
  endNode: PipelineNode;
  t: number = 0;
  speed: number;
  delay: number;
  offsetY: number;
  color: string;

  constructor(startNode: PipelineNode, endNode: PipelineNode, delay = 0, color = "#2563EB") {
    this.startNode = startNode;
    this.endNode = endNode;
    this.speed = 0.005 + Math.random() * 0.004;
    this.delay = delay;
    this.offsetY = (Math.random() - 0.5) * 10;
    this.color = color;
  }

  drawCurvePoint(p0: PipelineNode, p1: PipelineNode, t: number) {
    const cx1 = p0.x + (p1.x - p0.x) * 0.5;
    const cy1 = p0.y + this.offsetY;
    const cx2 = p0.x + (p1.x - p0.x) * 0.5;
    const cy2 = p1.y - this.offsetY;

    const x = (1 - t) * (1 - t) * (1 - t) * p0.x + 3 * (1 - t) * (1 - t) * t * cx1 + 3 * (1 - t) * t * t * cx2 + t * t * t * p1.x;
    const y = (1 - t) * (1 - t) * (1 - t) * p0.y + 3 * (1 - t) * (1 - t) * t * cy1 + 3 * (1 - t) * t * t * cy2 + t * t * t * p1.y;
    return { x, y };
  }

  update() {
    if (this.delay > 0) {
      this.delay--;
      return;
    }
    
    let currentSpeed = this.speed;
    if (this.startNode.hover || this.endNode.hover) {
      currentSpeed *= 2.0;
    }
    
    this.t += currentSpeed;
    if (this.t >= 1) {
      this.t = 0;
      this.delay = Math.random() * 60;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.delay > 0) return;

    const pt = this.drawCurvePoint(this.startNode, this.endNode, this.t);

    ctx.save();
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function EnginePipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: null as number | null, y: null as number | null };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let nodes: PipelineNode[] = [];
    let packets: TelemetryPacket[] = [];

    const initEcosystem = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      const isMobile = width < 600;

      // Define nodes layout
      const leftColX = isMobile ? 0.22 : 0.18;
      const rightColX = isMobile ? 0.78 : 0.82;

      nodes = [
        // Left Column (Sources)
        new PipelineNode("POS Telemetry", "Petpooja integration", "📊", leftColX, 0.22, 44, "#2563EB"),
        new PipelineNode("Covers & Traffic", "Foot-traffic telemetry", "👣", leftColX, 0.50, 44, "#00B4D8"),
        new PipelineNode("Competitors", "Live pricing radar", "👁️", leftColX, 0.78, 44, "#2563EB"),

        // Center (Core)
        new PipelineNode("COCOMO ENGINE", "v2.4 Core", "⚙️", 0.50, 0.50, 48, "#2563EB", true),

        // Right Column (Execution Targets)
        new PipelineNode("Media Creators", "500+ Local Creators", "🎬", rightColX, 0.22, 44, "#00B4D8"),
        new PipelineNode("Meta Ads", "Hyper-local Ad Sets", "🚀", rightColX, 0.50, 44, "#2563EB"),
        new PipelineNode("Loyalty Loops", "WhatsApp Loyalty", "💬", rightColX, 0.78, 44, "#00B4D8")
      ];

      packets = [];
      // Connect Left Column Sources -> Center Core
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 6; j++) {
          packets.push(new TelemetryPacket(nodes[i], nodes[3], j * 35, nodes[i].color));
        }
      }

      // Connect Center Core -> Right Column Targets
      for (let i = 4; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
          packets.push(new TelemetryPacket(nodes[3], nodes[i], j * 35, nodes[i].color));
        }
      }
    };

    initEcosystem();
    window.addEventListener("resize", initEcosystem);

    const drawGridLines = () => {
      ctx.save();
      ctx.lineWidth = 1;
      
      // Draw bezier link paths behind nodes
      for (let i = 0; i < 3; i++) {
        const p0 = nodes[i];
        const p1 = nodes[3];
        const cx1 = p0.x + (p1.x - p0.x) * 0.5;
        const cy1 = p0.y;
        const cx2 = p0.x + (p1.x - p0.x) * 0.5;
        const cy2 = p1.y;

        const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grad.addColorStop(0, p0.color);
        grad.addColorStop(1, p1.color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = p0.hover || p1.hover ? 0.35 : 0.12;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, p1.x, p1.y);
        ctx.stroke();
      }

      for (let i = 4; i < 7; i++) {
        const p0 = nodes[3];
        const p1 = nodes[i];
        const cx1 = p0.x + (p1.x - p0.x) * 0.5;
        const cy1 = p0.y;
        const cx2 = p0.x + (p1.x - p0.x) * 0.5;
        const cy2 = p1.y;

        const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grad.addColorStop(0, p0.color);
        grad.addColorStop(1, p1.color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = p0.hover || p1.hover ? 0.35 : 0.12;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, p1.x, p1.y);
        ctx.stroke();
      }

      ctx.restore();
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawGridLines();

      nodes.forEach((n) => {
        n.update(width, height, mouse);
        n.draw(ctx);
      });

      packets.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", initEcosystem);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}
