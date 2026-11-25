import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brandLogoUrl } from "../../data/branding";
import StackRoadmap from "./StackRoadmap";
import StackRoadmap2 from "./StackRoadmap2";
import styles from "./StackRoadmapPage.module.css";

export function StackRoadmapPage() {
  const [version, setVersion] = useState<"original" | "redesigned">(
    "redesigned",
  );

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
        <div className={styles.comparison}>
          <div
            className={styles.switcher}
            role="group"
            aria-label="Compare roadmap designs"
          >
            <button
              type="button"
              aria-pressed={version === "original"}
              aria-controls="roadmap-preview"
              onClick={() => setVersion("original")}
            >
              Original · StackRoadmap
            </button>
            <button
              type="button"
              aria-pressed={version === "redesigned"}
              aria-controls="roadmap-preview"
              onClick={() => setVersion("redesigned")}
            >
              New · StackRoadmap2
            </button>
          </div>
          <p className={styles.hint}>
            Same workflow, two visual directions. Switch to compare.
          </p>
        </div>
        <div id="roadmap-preview">
          {version === "original" ? <StackRoadmap /> : <StackRoadmap2 />}
        </div>
      </main>
    </div>
  );
}
