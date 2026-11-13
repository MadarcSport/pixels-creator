import "./App.css";
import { useState } from "react";
import { Scene3D_2 } from "./components/Scene3D_2";

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

const featuredProjects = [
  {
    title: "Quantum Pulse",
    category: "Featured project · Interactive experience",
    summary:
      "A browser-based experience bringing an interactive 3D canvas together with supporting web pages. Explore the live project, then return here for a concise overview.",
    tags: ["Interactive 3D", "Web experience", "Live demo"],
    url: "https://quantum-pulse-tau.vercel.app/",
    previewType: "video",
    previewUrl:
      // "https://drive.google.com/file/d/1Kby5JCbTTE1J0am1NqEoDneBea8TGEsm/preview",
      "https://res.cloudinary.com/db7i9febj/video/upload/v1794300774/quantumPukse_zfvkqc.webm",
    previewTitle: "Quantum Pulse project preview video",
    githubUrl: "https://github.com/MadarcSport/quantum-pulse",
    detailsTitle: "More than a 3D scene.",
    details:
      "Quantum Pulse pairs a hands-on 3D canvas with a set of web pages, giving visitors both an immersive moment and a place to explore the rest of the experience. Use this space to add your process, role, and the design or technical decisions behind the finished project.",
  },
  {
    title: "Street Wall",
    category: "Featured project · Web experience",
    summary:
      "Explore Street Wall, another live web project. Open the full experience to see it in its intended layout and interact with the complete site.",
    tags: ["Web experience", "Interactive", "Live demo"],
    url: "https://street-wall-1.vercel.app/",
    previewType: "iframe",
    previewUrl: "https://street-wall-1.vercel.app/",
    previewTitle: "Street Wall live project preview",
    detailsTitle: "Explore Street Wall.",
    details:
      "Street Wall is presented here as a second featured web project. Visit the live site to explore the complete experience. Add a short case-study description here with your role, process, and the key details you want visitors to know.",
  },
  {
    title: "Broken Computer",
    category: "Featured project · Material study",
    summary:
      "An interactive material showcase exploring surface detail through albedo, normal, and roughness maps, alongside a collection of shader-driven visual effects.",
    tags: ["Material maps", "Shader art", "Interactive 3D"],
    url: "https://broken-computer.vercel.app/",
    previewType: "iframe",
    previewUrl: "https://broken-computer.vercel.app/",
    previewTitle: "Broken Computer material and shader showcase",
    detailsTitle: "Surface detail meets shader play.",
    details:
      "Broken Computer presents a display surface using maps such as albedo, normal, and roughness to shape its appearance, with shader art effects adding another layer of visual experimentation. Open the live project to explore the materials and effects firsthand.",
  },
];

function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = featuredProjects[activeProjectIndex];

  const showProject = (direction: -1 | 1) => {
    setActiveProjectIndex(
      (currentIndex) =>
        (currentIndex + direction + featuredProjects.length) %
        featuredProjects.length,
    );
  };

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
        <div className="nav-links">
          <a href="#featured-project">Featured</a>
          <a href="#work">Work</a>
          <a href="#journal">Journal</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main id="top">
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

        <section
          className="featured-project section-block"
          id="featured-project"
          aria-labelledby="featured-project-title"
          aria-roledescription="carousel"
        >
          <div className="featured-project-visual">
            {activeProject.previewType === "video" ? (
              <video
                className="featured-project-video"
                key={activeProject.title}
                autoPlay
                muted
                loop
                playsInline
                aria-label={activeProject.previewTitle}
              >
                <source src={activeProject.previewUrl} type="video/webm" />
              </video>
            ) : (
              <iframe
                className="featured-project-video"
                key={activeProject.title}
                src={activeProject.previewUrl}
                title={activeProject.previewTitle}
                allow="autoplay; fullscreen; clipboard-write"
                allowFullScreen
              />
            )}
            <span className="visual-label">
              {activeProject.title === "Quantum Pulse"
                ? "INTERACTIVE / 3D"
                : "LIVE PROJECT PREVIEW"}
            </span>
            <span className="visual-index">
              {String(activeProjectIndex + 1).padStart(2, "0")} — FEATURED
            </span>
            <button
              className="carousel-arrow carousel-arrow-previous"
              type="button"
              onClick={() => showProject(-1)}
              aria-label="Show previous featured project"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="carousel-arrow carousel-arrow-next"
              type="button"
              onClick={() => showProject(1)}
              aria-label="Show next featured project"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="featured-project-copy">
            <span className="eyebrow">{activeProject.category}</span>
            <h2 id="featured-project-title" aria-live="polite">
              {activeProject.title}
            </h2>
            <p className="project-summary">{activeProject.summary}</p>
            <div className="project-tags" aria-label="Project features">
              {activeProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <a
                className="button primary"
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
              >
                Explore the experience <span aria-hidden="true">↗</span>
              </a>
              {activeProject.githubUrl && (
                <a
                  className="button secondary github-button"
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${activeProject.title} on GitHub`}
                  title="View on GitHub"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      fill="currentColor"
                      d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.11 5.53.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
                    />
                  </svg>
                </a>
              )}
              <a className="project-story-link" href="#project-details">
                About this project <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="project-note">
              Use the arrows to browse featured projects. Open the live project
              in a new tab for the full experience.
            </p>
          </div>
        </section>

        <section
          className="project-details"
          id="project-details"
          aria-label={`${activeProject.title} project overview`}
        >
          <div>
            <span className="eyebrow">Project overview</span>
            <h2>{activeProject.detailsTitle}</h2>
          </div>
          <p>{activeProject.details}</p>
        </section>

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
