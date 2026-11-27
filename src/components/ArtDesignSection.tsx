import { useEffect, useRef, useState } from "react";
import { artCreations, type ArtCreation } from "../data/artCreations";
import { ProjectSummary } from "./ProjectSummary";
import "./ArtDesignSection.css";

export function ArtDesignSection() {
  const [videoCreation, setVideoCreation] = useState<ArtCreation | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!videoCreation) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [videoCreation]);

  return (
    <section
      className="art-design-section"
      id="art-design"
      aria-labelledby="art-design-title"
    >
      <div className="art-design-heading">
        <div>
          <span className="eyebrow">Original creations</span>
          <h2 id="art-design-title">3D art & product design</h2>
        </div>
      </div>

      <div className="art-design-collection">
        {artCreations.map((creation, index) => (
          <article
            className="art-design-card"
            key={creation.id}
            aria-labelledby={`${creation.id}-title`}
          >
            <figure className="art-design-visual">
              <div className="art-design-image-frame">
                <img
                  src={creation.imageUrl}
                  alt={creation.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>
                  {creation.title} / {creation.category}
                </span>
                <span>3D concept</span>
              </figcaption>
            </figure>

            <div className="art-design-copy">
              <div className="art-design-meta">
                <span className="eyebrow">{creation.category}</span>
                <span
                  className="art-design-number"
                  aria-label={`Creation ${index + 1}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 id={`${creation.id}-title`}>{creation.title}</h3>
              {creation.subtitle && (
                <p className="art-design-subtitle">{creation.subtitle}</p>
              )}
              <ProjectSummary collapsible>
                {creation.description}
              </ProjectSummary>
              <ul className="art-design-tags" aria-label="Design themes">
                {creation.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {creation.youtubeId && (
                <button
                  className="button primary art-design-watch"
                  type="button"
                  aria-label={`Watch the ${creation.title} design film`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    dialogRef.current?.showModal();
                    setVideoCreation(creation);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch the design film
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <dialog
        className="video-dialog art-design-dialog"
        ref={dialogRef}
        aria-labelledby="art-design-video-title"
        onClose={() => setVideoCreation(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="video-dialog-content">
          <div className="video-dialog-heading">
            <h2 id="art-design-video-title">
              {videoCreation
                ? `${videoCreation.title} — Design film`
                : "Design film"}
            </h2>
            <button
              className="video-dialog-close"
              type="button"
              aria-label="Close design film"
              onClick={() => dialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {videoCreation?.youtubeId && (
            <>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoCreation.youtubeId}?autoplay=1`}
                  title={`${videoCreation.title} design film`}
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
              <a
                className="art-design-youtube-link"
                href={`https://www.youtube.com/watch?v=${videoCreation.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube <span aria-hidden="true">↗</span>
              </a>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
