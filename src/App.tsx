import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Scene3D_2 } from "./components/Scene3D_2";
import { EcommerceSection } from "./components/EcommerceSection";
import { ThreeJsSection } from "./components/ThreeJsSection";

const featuredWorks = [
  {
    title: "3D Art Studies",
    category: "Gallery",
    description:
      "Characters, props, still-life renders, experiments, and finished 3D artworks.",
  },
  {
    title: "Three.js Labs",
    category: "Interactive",
    description:
      "WebGL scenes, realtime interactions, camera motion, particles, and browser demos.",
  },
  {
    title: "Shader Materials",
    category: "Research",
    description:
      "Procedural surfaces, matcaps, gradients, displacement tests, and lighting studies.",
  },
  {
    title: "Ecommerce Design",
    category: "Product",
    description:
      "Item cards, campaign visuals, product configurators, and checkout presentation ideas.",
  },
];

const journalItems = [
  "Daily life photos",
  "Behind the scenes",
  "Short process videos",
];

const dailyLifeVideo = {
  title: "Daily life video diary",
  youtubeId: "vPJeupeIjw4",
  description:
    "A personal video moment that can introduce your lifestyle, references, mood, and creative rhythm.",
};

const siteRoadmap = [
  "Replace placeholder cards with your own pictures, videos, 3D embeds, and project links.",
  "Add a case-study page for each important artwork or Three.js project.",
  "Keep one experimental section for shader tests, prototypes, and work-in-progress clips.",
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVideoOpen]);

  return (
    <div className="app">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Portfolio home">
          <img
            className="brand-logo"
            src="https://res.cloudinary.com/db7i9febj/image/upload/v1794301527/TR_Glossy_Blue_Paintbrush_with_Flying_Pixels_1_faqgsh.png"
            alt=""
          />
          Pixels-Creator
        </a>
        <button
          className={`menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation-links"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          className={`nav-links${isMobileMenuOpen ? " is-open" : ""}`}
          id="main-navigation-links"
        >
          <a
            href="#featured-project"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Featured
          </a>
          <a href="#work" onClick={() => setIsMobileMenuOpen(false)}>
            Work
          </a>
          <a href="#journal" onClick={() => setIsMobileMenuOpen(false)}>
            Journal
          </a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </a>
        </div>
      </nav>

      <div className="top-banner">
        <img
          // src="https://res.cloudinary.com/db7i9febj/image/upload/v1794571600/pixels_creator_lab_2_eb4d1p.png"
          src="https://res.cloudinary.com/db7i9febj/image/upload/v1794604753/pixels_creator_lab_3_quajng.png"
          alt="Pixels Creator Lab banner"
        />
        <div
          className="banner-scene"
          aria-label="Interactive 3D material preview"
        >
          <Scene3D_2 />
        </div>
      </div>

      <header className="identity-heading">
        <h1>Marc TOUBIA</h1>
        <p>Where ideas take shape</p>
      </header>

      <div className="video-banner">
        <img
          src="https://res.cloudinary.com/db7i9febj/image/upload/v1795432927/pelicule1Tiny_wfsvwc.png"
          alt="Filmstrip banner"
        />
        <button
          className="video-banner-play"
          type="button"
          aria-label={`Watch ${dailyLifeVideo.title}`}
          aria-haspopup="dialog"
          onClick={() => {
            videoDialogRef.current?.showModal();
            setIsVideoOpen(true);
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <dialog
        className="video-dialog"
        ref={videoDialogRef}
        aria-labelledby="video-dialog-title"
        onClose={() => setIsVideoOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            videoDialogRef.current?.close();
          }
        }}
      >
        <div className="video-dialog-content">
          <div className="video-dialog-heading">
            <h2 id="video-dialog-title">{dailyLifeVideo.title}</h2>
            <button
              className="video-dialog-close"
              type="button"
              aria-label="Close video"
              onClick={() => videoDialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {isVideoOpen && (
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${dailyLifeVideo.youtubeId}?autoplay=1`}
                title={dailyLifeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </dialog>

      <main id="top">
        {/* start of Featured top section */}

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              3D artist · creative developer · visual storyteller
            </span>
            <h1 id="hero-title">
              A portfolio for art, WebGL experiments, videos, and product
              design.
            </h1>
            <p>
              Use this structure as your personal showroom: large featured work,
              quick project filters, process notes, daily-life media, and a
              strong contact section for commissions or jobs.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore structure
              </a>
              <a className="button secondary" href="#about">
                Planning notes
              </a>
            </div>
          </div>

          <div
            className="hero-stage"
            aria-label="Interactive 3D material preview"
          >
            <Scene3D_2 />
            <div className="stage-caption">
              <strong>Live 3D preview</strong>
              <span>
                Later: load your best scene, shader, or product object here.
              </span>
            </div>
          </div>
        </section>

        {/* end of Featured top section */}

        <EcommerceSection preview />

        <ThreeJsSection preview />

        {/* <section className="intro-grid" aria-label="Portfolio content pillars">
          <article>
            <span>01</span>
            <h2>Featured first</h2>
            <p>
              Open with 3 to 6 excellent pieces instead of showing everything at
              once.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>Process matters</h2>
            <p>
              Show sketches, shader tests, breakdown videos, and final renders
              together.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>Easy updates</h2>
            <p>
              Keep media placeholders modular so you can replace them with real
              assets later.
            </p>
          </article>
        </section> */}

        <section
          className="section-block"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <span className="eyebrow">Portfolio sections</span>
            <h2 id="work-title">Suggested work structure</h2>
            <p>
              These cards map the main categories of your website. Each one can
              become a gallery, case-study page, or interactive demo route
              later.
            </p>
          </div>

          <div className="work-grid">
            {featuredWorks.map((work, index) => (
              <article className="work-card" key={work.title}>
                <div className="media-placeholder">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="card-content">
                  <p>{work.category}</p>
                  <h3>{work.title}</h3>
                  <span>{work.description}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="journal-section"
          id="journal"
          aria-labelledby="journal-title"
        >
          <div>
            <span className="eyebrow">Photo and video diary</span>
            <h2 id="journal-title">
              Make space for your life, not only final projects.
            </h2>
            <p className="journal-intro">
              This is the best place for the YouTube video: it supports the
              personal side of your portfolio without distracting from the main
              project gallery.
            </p>
          </div>
          <div className="journal-content">
            <article className="featured-video-card">
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${dailyLifeVideo.youtubeId}`}
                  title={dailyLifeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="featured-video-copy">
                <div className="video-chip">Featured daily life</div>
                <h3>{dailyLifeVideo.title}</h3>
                <p>{dailyLifeVideo.description}</p>
              </div>
            </article>

            <div className="journal-list">
              {journalItems.map((item) => (
                <article key={item}>
                  <div className="video-chip">Video / Photo</div>
                  <h3>{item}</h3>
                  <p>
                    Add short clips, vertical videos, studio photos, travel
                    references, or making-of moments.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-card">
            <span className="eyebrow">Next steps</span>
            <h2 id="about-title">Build it like a living archive.</h2>
            <p>
              Start with placeholders, then replace them gradually. Your best
              work should stay polished, while your journal and lab sections can
              feel more experimental and personal.
            </p>
          </div>
          <ol className="roadmap-list">
            {siteRoadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

export default App;
