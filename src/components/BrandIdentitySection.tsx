import type { CSSProperties } from "react";
import { brandIdentities } from "../data/branding";
import "./BrandIdentitySection.css";

export function BrandIdentitySection() {
  return (
    <section
      className="brand-identity-section"
      id="brand-identity"
      aria-labelledby="brand-identity-title"
    >
      <header className="brand-identity-heading">
        <div>
          <span className="eyebrow">Creative direction · Brand systems</span>
          <h2 id="brand-identity-title">Brand identity &amp; trending</h2>
        </div>
      </header>

      <div className="brand-identity-grid">
        {brandIdentities.map((brand, index) => (
          <article
            className="brand-identity-card"
            key={brand.id}
            aria-labelledby={`${brand.id}-title`}
            style={{ "--brand-accent": brand.accent } as CSSProperties}
          >
            <div className="brand-identity-card-top">
              <div className="brand-identity-logo-frame">
                <img
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span
                className="brand-identity-number"
                aria-label={`Brand ${index + 1}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="brand-identity-products">
              {brand.productUrls.map((productUrl, productIndex) => (
                <div className="brand-identity-product" key={productUrl}>
                  <img
                    src={productUrl}
                    alt={`${brand.name} product ${productIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            <div className="brand-identity-copy">
              <h3 id={`${brand.id}-title`}>{brand.name}</h3>
              <p>{brand.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
