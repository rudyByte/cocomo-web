"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function InteractivePoints() {
  const pointsRef = useRef<any>(null);
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const startPositions = useRef<Float32Array | null>(null);
  const targetPositions = useRef<Float32Array | null>(null);
  const count = 1800;

  useEffect(() => {
    const start = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Start position: randomized noise cloud (a sphere of wide radius)
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      start[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      start[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      start[i * 3 + 2] = r * Math.cos(phi);

      // Target position: converging double-helix spiral ("ordered signal")
      const thetaT = i * 0.07 + (i % 2 === 0 ? 0 : Math.PI);
      const radT = 0.8 + Math.sin(i * 0.015) * 0.35;
      const yT = (i / count) * 3.2 - 1.6;

      target[i * 3] = Math.cos(thetaT) * radT;
      target[i * 3 + 1] = yT;
      target[i * 3 + 2] = Math.sin(thetaT) * radT;
    }

    startPositions.current = start;
    targetPositions.current = target;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !startPositions.current || !targetPositions.current) return;

    const time = state.clock.getElapsedTime();
    // Animates toward organized structure over the first 2.8 seconds
    const t = Math.min(time / 2.8, 1.0);

    const posAttr = pointsRef.current.geometry?.attributes?.position;
    if (!posAttr || !posAttr.array) return;
    const positions = posAttr.array;
    
    // Smoothly interpolate pointer position to create a fluid lag/inertia effect
    const pointer = state.pointer;
    smoothPointer.current.x += (pointer.x - smoothPointer.current.x) * 0.075;
    smoothPointer.current.y += (pointer.y - smoothPointer.current.y) * 0.075;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Base lerp position
      const bx = startPositions.current[idx] + (targetPositions.current[idx] - startPositions.current[idx]) * t;
      const by = startPositions.current[idx + 1] + (targetPositions.current[idx + 1] - startPositions.current[idx + 1]) * t;
      const bz = startPositions.current[idx + 2] + (targetPositions.current[idx + 2] - startPositions.current[idx + 2]) * t;

      // Radius-based pointer displacement (mouse push) using smoothed coordinates
      const dx = bx - smoothPointer.current.x * 2.2;
      const dy = by - smoothPointer.current.y * 2.2;
      const dist = Math.hypot(dx, dy);

      let pushX = 0;
      let pushY = 0;
      let pushZ = 0;

      // Smooth step radius boundary for an organic bubble/ripple effect
      const radius = 1.15;
      if (dist < radius) {
        const norm = dist / radius;
        // Quadratic easing out makes the boundary transition completely seamless
        const forceFactor = (1 - norm) * (1 - norm);
        const force = forceFactor * 0.48;
        
        pushX = (dx / dist) * force;
        pushY = (dy / dist) * force;
        // Push slightly forward on the Z axis to create a 3D bubble/dome dome-effect
        pushZ = forceFactor * 0.35;
      }

      positions[idx] = bx + pushX;
      positions[idx + 1] = by + pushY;
      positions[idx + 2] = bz + pushZ;
    }

    posAttr.needsUpdate = true;

    // Continuous slow rotations
    pointsRef.current.rotation.y = time * 0.08;
    pointsRef.current.rotation.x = Math.sin(time * 0.04) * 0.08;
  });

  return (
    <Points ref={pointsRef} positions={new Float32Array(count * 3)} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2F5FE0"
        size={0.042}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function NetworkSphere() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 60 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ambientLight intensity={0.5} />
        <InteractivePoints />
      </Canvas>
    </div>
  );
}
