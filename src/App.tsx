import "./App.css";
import { lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DeferredScene } from "./components/DeferredScene";
import { EcommerceSection } from "./components/EcommerceSection";
import { ThreeJsSection } from "./components/ThreeJsSection";
import { Scene3d_3 } from "./components/Scene3d_3";
import { Footer } from "./components/Footer";
import { ResumeSection } from "./components/ResumeSection";
import { brandLogoUrl } from "./data/branding";

const HeroThreeCanvas = lazy(() => import("../app/components/HeroThreeCanvas"));

const Scene3D_2 = lazy(() =>
  import("./components/Scene3D_2").then((module) => ({
    default: module.Scene3D_2,
  })),
);

// const featuredWorks = [
//   {
//     title: "3D Art Studies",
//     category: "Gallery",
//     description:
//       "Characters, props, still-life renders, experiments, and finished 3D artworks.",
//   },
//   {
//     title: "Three.js Labs",
//     category: "Interactive",
//     description:
//       "WebGL scenes, realtime interactions, camera motion, particles, and browser demos.",
//   },
//   {
//     title: "Shader Materials",
//     category: "Research",
//     description:
//       "Procedural surfaces, matcaps, gradients, displacement tests, and lighting studies.",
//   },
//   {
//     title: "Ecommerce Design",
//     category: "Product",
//     description:
//       "Item cards, campaign visuals, product configurators, and checkout presentation ideas.",
//   },
// ];

const dailyLifeVideo = {
  title: "Daily life video diary",
  youtubeId: "vPJeupeIjw4",
  description:
    "A personal video moment that can introduce your lifestyle, references, mood, and creative rhythm.",
};

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
          <img className="brand-logo" src={brandLogoUrl} alt="" />
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
          <a href="#my-stack" onClick={() => setIsMobileMenuOpen(false)}>
            My stack
          </a>
          <a href="#ecommerce" onClick={() => setIsMobileMenuOpen(false)}>
            Ecommerce
          </a>
          <a
            href="#featured-project"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Threejs
          </a>
          <a href="#resume" onClick={() => setIsMobileMenuOpen(false)}>
            My resume
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
          <DeferredScene>
            <Scene3D_2 />
          </DeferredScene>
        </div>
      </div>

      <header className="identity-heading">
        {/* <h1>Marc TOUBIA</h1> */}
        <p>Where ideas take shape</p>
        <h2>
          UX/UI design, React development, <br />
          interactive 3D to create websites, <br />& ecommerce visuals.
        </h2>
      </header>

      <div className="video-banner">
        <img
          src="https://res.cloudinary.com/db7i9febj/image/upload/v1795432927/pelicule1Tiny_wfsvwc.png"
          // src="https://res.cloudinary.com/db7i9febj/image/upload/v1795550765/pelicule1BisTiny_znct6j.png"
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

      <section
        className="hero-three-section"
        id="my-stack"
        aria-label="Animated 3D motherboard showcase"
      >
        <DeferredScene>
          <HeroThreeCanvas />
        </DeferredScene>
      </section>

      <div className="stack-preview">
        <Link className="button primary stack-preview-link" to="/my-stack">
          My Stack
        </Link>
        <img
          className="stack-preview-image"
          src="https://res.cloudinary.com/db7i9febj/image/upload/v1795638525/staks-horizontal1Tiny_n72rep.png"
          alt="My creative and development tool stack"
          loading="lazy"
          decoding="async"
        />
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
        <EcommerceSection preview />

        <ThreeJsSection preview />

        <Scene3d_3 />

        <ResumeSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
