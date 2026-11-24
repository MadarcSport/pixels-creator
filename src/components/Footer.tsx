import { brandLogoUrl } from "../data/branding";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Contact information">
      <div className="footer-inner">
        <a
          className="brand footer-brand"
          href="#top"
          aria-label="Portfolio home"
        >
          <img
            className="footer-logo"
            src={brandLogoUrl}
            alt=""
            loading="lazy"
          />
          Pixels-Creator
        </a>

        <address className="footer-contact">
          <a
            className="footer-contact-item"
            href="mailto:marctoubia2@gmail.com"
          >
            <span className="footer-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </span>
            <span>
              <span className="footer-contact-label">Email</span>
              marctoubia2@gmail.com
            </span>
          </a>
          <a className="footer-contact-item" href="tel:+33605813103">
            <span className="footer-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="2" width="12" height="20" rx="2" />
                <path d="M10 5h4M11 19h2" />
              </svg>
            </span>
            <span>
              <span className="footer-contact-label">Phone</span>
              06.05.81.31.03
            </span>
          </a>
          <div className="footer-contact-item">
            <span className="footer-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span>
              <span className="footer-contact-label">Location</span>France
            </span>
          </div>
        </address>
      </div>
    </footer>
  );
}
