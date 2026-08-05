import { Nav } from "@/components/Nav/Nav";
import { FooterTransition } from "@/components/Footer/FooterTransition";

export default function MGPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ paddingTop: "var(--nav-height)" }}>
        {children}
      </main>
      <FooterTransition />
    </>
  );
}
