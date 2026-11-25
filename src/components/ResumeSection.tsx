import "./ResumeSection.css";

const resumeThumbnailUrl =
  "https://res.cloudinary.com/db7i9febj/image/upload/v1795561006/ResumeMarcTOUBIATINY_jmhikw.jpg";

// Add your PDF to public/resume/Marc-Toubia-Resume.pdf.
const resumePdfUrl = `${import.meta.env.BASE_URL}resume/Marc-Toubia-Resume.pdf`;

export function ResumeSection() {
  return (
    <section
      className="resume-section"
      id="resume"
      aria-labelledby="resume-title"
    >
      <figure className="resume-preview">
        <img
          src={resumeThumbnailUrl}
          alt="Preview of Marc Toubia's résumé"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="resume-copy">
        <span className="eyebrow">Experience & skills</span>
        <h2 id="resume-title">My resume.</h2>
        <p>
          Explore my background in Branding development, React development, and
          interactive 3D. Download my resume to learn more about my experience
          and skills.
        </p>
        <a
          className="button primary resume-download"
          href={resumePdfUrl}
          download="Marc-Toubia-Resume.pdf"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
          </svg>
          Download resume
          <span className="resume-download-format">PDF</span>
        </a>
      </div>
    </section>
  );
}
