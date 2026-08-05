import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

export const fraunces = localFont({
  src: [
    { path: "../../public/fonts/Fraunces-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Fraunces-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Fraunces-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Fraunces-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-media",
  display: "swap",
  weight: ["500", "600", "700"],
  fallback: ["sans-serif"],
  adjustFontFallback: false,
});

export const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Consolas", "monospace"],
});
