import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";

export default function MGPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ paddingTop: "var(--nav-height)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
