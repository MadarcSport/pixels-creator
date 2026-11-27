import { useRef, useState, type CSSProperties } from "react";
import { brandIdentities } from "../data/branding";
import "./BrandIdentitySection2.css";

export function BrandIdentitySection2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const showBrand = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const nextIndex =
        (current + direction + brandIdentities.length) % brandIdentities.length;

      window.requestAnimationFrame(() => {
        const carousel = carouselRef.current;
        const nextSlide = carousel?.querySelector<HTMLElement>(
          `.brand-identity-slide2:nth-child(${nextIndex + 1})`,
        );
        if (carousel && nextSlide) {
          carousel.scrollTo({
            left: nextSlide.offsetLeft,
            behavior: "smooth",
          });
        }
      });

      return nextIndex;
    });
  };

  return (
    <section
      className="brand-identity-section2"
      id="brand-identity"
      aria-labelledby="brand-identity-title-2"
      aria-roledescription="carousel"
    >
      <header className="brand-identity-heading2">
        <div>
          <h2 id="brand-identity-title-2">Brand identity &amp; trending</h2>
        </div>
        <div className="brand-identity-counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")}
          <span />
          {String(brandIdentities.length).padStart(2, "0")}
        </div>
      </header>

      <div className="brand-identity-carousel-shell">
        <div className="brand-identity-carousel" ref={carouselRef}>
          <div className="brand-identity-track">
            {brandIdentities.map((brand, index) => (
              <article
                className={`brand-identity-slide2${index === activeIndex ? " is-active" : ""}`}
                key={brand.id}
                aria-labelledby={`${brand.id}-title-2`}
                aria-hidden={index === activeIndex ? undefined : true}
                style={{ "--brand-accent": brand.accent } as CSSProperties}
              >
                <div className="brand-identity-slide-top">
                  <div className="brand-identity-logo-frame2">
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.name} logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="brand-identity-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="brand-identity-product-stage">
                  {brand.productUrls.map((productUrl, productIndex) => (
                    <img
                      className={`brand-identity-product2 brand-identity-product2-${productIndex + 1}`}
                      key={productUrl}
                      src={productUrl}
                      alt={`${brand.name} product ${productIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>

                <div className="brand-identity-copy2">
                  <h3 id={`${brand.id}-title-2`}>{brand.name}</h3>
                  <p>{brand.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className="brand-identity-arrow brand-identity-arrow-previous"
          type="button"
          onClick={() => showBrand(-1)}
          aria-label="Show previous brand"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="brand-identity-arrow brand-identity-arrow-next"
          type="button"
          onClick={() => showBrand(1)}
          aria-label="Show next brand"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
