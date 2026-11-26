import { useEffect } from "react";
import { Link } from "react-router-dom";
import { brandLogoUrl } from "../../data/branding";
import StackRoadmap2 from "./StackRoadmap2";

export function StackRoadmapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "My Stack | Pixels-Creator";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="app stack-roadmap-page">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="Portfolio home">
          <img className="brand-logo" src={brandLogoUrl} alt="" />
          Pixels-Creator
        </Link>
        <Link className="button secondary" to="/">
          <span aria-hidden="true">←</span> Back to main page
        </Link>
      </nav>
      <main>
        <h1 className="stack-roadmap-title">My Stack</h1>
        <div id="roadmap-preview">
          <StackRoadmap2 />
        </div>
      </main>
    </div>
  );
}
