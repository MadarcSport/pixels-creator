import { useState } from "react";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/featuredProjects";
import { ProjectSummary } from "./ProjectSummary";
import { ArtDesignSection } from "./ArtDesignSection";

interface ThreeJsSectionProps {
  preview?: boolean;
}

export function ThreeJsSection({ preview = false }: ThreeJsSectionProps) {
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
    <>
      <div
        className="section-heading featured-labs-heading"
        id="featured-project"
      >
        <div>
          {/* <span className="eyebrow">Interactive experiments</span> */}
          {preview ? (
            <h2 id="featured-labs-title">3D art - Three.js Labs</h2>
          ) : (
            <h1 id="featured-labs-title">Three.js Labs</h1>
          )}
        </div>
      </div>
      <section
        className="featured-project section-block"
        aria-labelledby="featured-labs-title"
        aria-roledescription={preview ? undefined : "carousel"}
      >
        <div className="featured-project-visual">
          {preview ? (
            <img
              className="featured-project-video threejs-banner-image"
              src="https://res.cloudinary.com/db7i9febj/image/upload/v1795431656/001threejswebPartTINYPNG_armwti.png"
              alt="Three.js interactive web experiments showcase"
              loading="lazy"
            />
          ) : (
            <>
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
              <span
                className="visual-index"
                aria-live="polite"
                aria-atomic="true"
              >
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
            </>
          )}
        </div>
        <div className="featured-project-copy">
          <span className="eyebrow">
            {preview ? "Interactive 3D experiments" : "Featured project"}
          </span>
          <h3 id="featured-project-title" aria-live="polite">
            {preview
              ? "Exploring the possibilities of 3D on the web"
              : activeProject.title}
          </h3>
          <ProjectSummary collapsible>
            {preview
              ? "Discover a collection of Three.js projects exploring interactive scenes, creative visuals, and real-time experiences. Each experiment brings together design and code to make 3D part of the web."
              : activeProject.summary}
          </ProjectSummary>
          <div
            className="project-tags"
            aria-label={preview ? "Collection themes" : "Project features"}
          >
            {(preview
              ? ["Three.js", "Interactive 3D", "Web experiments"]
              : activeProject.tags
            ).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-actions">
            {preview ? (
              <Link className="button primary" to="/threejs">
                Explore the labs <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <a
                className="button primary"
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
              >
                Explore the experience <span aria-hidden="true">↗</span>
              </a>
            )}
            {!preview && activeProject.githubUrl && (
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
          {!preview && (
            <p className="project-note">
              Use the arrows to browse featured projects. Open the live project
              in a new tab for the full experience.
            </p>
          )}
        </div>
      </section>
      {!preview && (
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
      )}
      {!preview && <ArtDesignSection />}
    </>
  );
}
