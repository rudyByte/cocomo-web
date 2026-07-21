import type { Metadata } from "next";
import { Hero } from "./sections/Hero";
import { Gap } from "./sections/Gap";
import { Loop } from "./sections/Loop";
import { ExecutionNetwork } from "./sections/ExecutionNetwork";
import { Proof } from "./sections/Proof";
import { Alignment, ForWhom, Close } from "./sections/Alignment";

export const metadata: Metadata = {
  title: "Cocomo — Growth Operating System for Merchants",
  description:
    "Know what to grow. Then watch it get done. Cocomo continuously finds the revenue opportunity, recommends the action, and executes it. Free to start.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Gap />
      <Loop />
      <ExecutionNetwork />
      <Proof />
      <Alignment />
      <ForWhom />
      <Close />
    </>
  );
}
