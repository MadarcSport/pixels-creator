import "./App.css";
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

function App() {
  return (
    <div className="app">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Portfolio home">
          Artfolio
        </a>
        <div className="nav-links">
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

        <section className="intro-grid" aria-label="Portfolio content pillars">
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
        </section>

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
