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
    // category: "Featured project · Interactive experience",
    summary:
      "A browser-based experience bringing an interactive 3D canvas together with supporting web pages. Explore the live project, then return here for a concise overview.",
    tags: ["Interactive 3D", "Web experience", "Live demo"],
    url: "https://quantum-pulse-tau.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=640&q=80",
    previewType: "video",
    previewUrl:
      // "https://drive.google.com/file/d/1Kby5JCbTTE1J0am1NqEoDneBea8TGEsm/preview",
      "https://res.cloudinary.com/db7i9febj/video/upload/v1794300774/quantumPukse_zfvkqc.webm",
    previewTitle: "Quantum Pulse project preview video",
    githubUrl: "https://github.com/MadarcSport/quantum-pulse",
  },
  {
    title: "Street Wall",
    // category: "Featured project · Web experience",
    summary:
      "Explore Street Wall, another live web project. Open the full experience to see it in its intended layout and interact with the complete site.",
    tags: ["Web experience", "Interactive", "Live demo"],
    url: "https://street-wall-1.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=640&q=80",
    previewType: "iframe",
    previewUrl: "https://street-wall-1.vercel.app/",
    previewTitle: "Street Wall live project preview",
  },
  {
    title: "Broken Computer",
    // category: "Featured project · Material study",
    summary:
      "An interactive material showcase exploring surface detail through albedo, normal, and roughness maps, alongside a collection of shader-driven visual effects.",
    tags: ["Material maps", "Shader art", "Interactive 3D"],
    url: "https://broken-computer.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80",
    previewType: "iframe",
    previewUrl: "https://broken-computer.vercel.app/",
    previewTitle: "Broken Computer material and shader showcase",
  },
];

const ecommerceProducts = [
  {
    asin: "B09Q69PL8C",
    title: "Featured product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/718i8jzVeNL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B09Q69PL8C?ref=myi_title_dp",
  },
  {
    asin: "B0CDVDPFF6",
    title: "Football-themed product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71mWRpiZ1VL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/MADARC-SPORT-Football-Drinking-relief/dp/B0CDVDPFF6/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0CHM79MSM",
    title: "Baseball-themed product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71fkwPBiZ6L._AC_SL1500_.jpg",
    url: "https://www.amazon.com/MADARC-SPORT-Baseball-Drinking-relief/dp/B0CHM79MSM/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0G6B4CN36",
    title: "Motorcycle handlebar toilet paper holder",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71+JBJDOpUL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/Standing-Toilet-Holder-Motorcycle-Handlebars/dp/B0G6B4CN36/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0B762CJJW",
    title: "Baseball design disposable product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/818Egg1KnpL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/50-Baseball-Design-Disposable-Definition/dp/B0B762CJJW/",
  },
];

function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeProject = featuredProjects[activeProjectIndex];
  const activeProduct = ecommerceProducts[activeProductIndex];

  const showProject = (direction: -1 | 1) => {
    setActiveProjectIndex(
      (currentIndex) =>
        (currentIndex + direction + featuredProjects.length) %
        featuredProjects.length,
    );
  };

  const showProduct = (direction: -1 | 1) => {
    setActiveProductIndex(
      (currentIndex) =>
        (currentIndex + direction + ecommerceProducts.length) %
        ecommerceProducts.length,
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
      </div>

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

        <div className="section-heading featured-labs-heading ecommerce-heading">
          <div>
            <span className="eyebrow">Product development</span>
            <h2 id="ecommerce-title">Ecommerce</h2>
          </div>
        </div>
        <section
          className="featured-project section-block ecommerce-project"
          aria-labelledby="ecommerce-title"
          aria-roledescription="carousel"
        >
          <div className="featured-project-visual ecommerce-visual">
            <div className="ecommerce-image-fallback" aria-hidden="true">
              <span>
                PRODUCT {String(activeProductIndex + 1).padStart(2, "0")}
              </span>
              <strong>{activeProduct.asin}</strong>
            </div>
            <img
              className="featured-project-video ecommerce-product-image"
              key={activeProduct.asin}
              src={
                activeProduct.imageUrl ??
                `https://images-na.ssl-images-amazon.com/images/P/${activeProduct.asin}.01._SCLZZZZZZZ_.jpg`
              }
              alt={activeProduct.title}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span className="visual-label">PRODUCT DEVELOPMENT</span>
            <span className="visual-index">
              {String(activeProductIndex + 1).padStart(2, "0")} — PRODUCT
            </span>
            <button
              className="carousel-arrow carousel-arrow-previous"
              type="button"
              onClick={() => showProduct(-1)}
              aria-label="Show previous ecommerce product"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="carousel-arrow carousel-arrow-next"
              type="button"
              onClick={() => showProduct(1)}
              aria-label="Show next ecommerce product"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="featured-project-copy">
            <span className="eyebrow">Ecommerce · end-to-end product work</span>
            <h3>Product developer</h3>
            <p className="project-summary">
              Designed products, developed and patented the ideas, found
              factories to manufacture them, and brought them to market—with
              Amazon FBA and A+ Content creation.
            </p>
            <div className="project-tags" aria-label="Product development work">
              <span>Product design</span>
              <span>Patents</span>
              <span>Factory sourcing</span>
              <span>Marketing</span>
              <span>Amazon FBA · A+ Content</span>
            </div>
            <div className="project-actions">
              <a
                className="button primary"
                href={activeProduct.url}
                target="_blank"
                rel="noreferrer"
              >
                View product on Amazon <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <div className="section-heading featured-labs-heading">
          <div>
            <span className="eyebrow">Interactive experiments</span>
            <h2 id="featured-labs-title">Three.js Labs</h2>
          </div>
        </div>
        <section
          className="featured-project section-block"
          id="featured-project"
          aria-labelledby="featured-labs-title"
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
            <span className="eyebrow">Featured project</span>
            <h3 id="featured-project-title" aria-live="polite">
              {activeProject.title}
            </h3>
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
            </div>
            <p className="project-note">
              Use the arrows to browse featured projects. Open the live project
              in a new tab for the full experience.
            </p>
          </div>
        </section>

        <div className="project-thumbnails" aria-label="Choose a project">
          {featuredProjects.map((project, index) => (
            <button
              className={`project-thumbnail${index === activeProjectIndex ? " is-active" : ""}`}
              key={project.title}
              type="button"
              onClick={() => setActiveProjectIndex(index)}
              aria-label={`Show ${project.title}`}
              aria-current={index === activeProjectIndex ? "true" : undefined}
            >
              <img src={project.thumbnailUrl} alt="" />
              <span>{project.title}</span>
            </button>
          ))}
        </div>

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
