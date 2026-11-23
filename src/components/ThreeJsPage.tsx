import { useEffect } from "react";
import { ThreeJsSection } from "./ThreeJsSection";

export function ThreeJsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Three.js Labs | Pixels-Creator";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="app threejs-page">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Portfolio home">
          <img
            className="brand-logo"
            src="https://res.cloudinary.com/db7i9febj/image/upload/v1794301527/TR_Glossy_Blue_Paintbrush_with_Flying_Pixels_1_faqgsh.png"
            alt=""
          />
          Pixels-Creator
        </a>
        <a className="button secondary" href="/#featured-project">
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
      </nav>
      <main>
        <ThreeJsSection />
      </main>
    </div>
  );
}
