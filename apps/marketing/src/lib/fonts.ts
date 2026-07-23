import localFont from "next/font/local";

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

export const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
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
