import { useState } from "react";
import { Link } from "react-router-dom";
import { ecommerceProducts } from "../data/ecommerceProducts";

interface EcommerceSectionProps {
  preview?: boolean;
}

export function EcommerceSection({ preview = false }: EcommerceSectionProps) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const activeProduct = ecommerceProducts[activeProductIndex];

  const showProduct = (direction: -1 | 1) => {
    setActiveProductIndex(
      (currentIndex) =>
        (currentIndex + direction + ecommerceProducts.length) %
        ecommerceProducts.length,
    );
  };

  return (
    <>
      <div className="section-heading featured-labs-heading" id="ecommerce">
        <div>
          <span className="eyebrow">Product development</span>
          {preview ? (
            <h2 id="ecommerce-title">Ecommerce</h2>
          ) : (
            <h1 id="ecommerce-title">Ecommerce</h1>
          )}
        </div>
      </div>
      <section
        className="featured-project section-block ecommerce-project"
        aria-labelledby="ecommerce-title"
        aria-roledescription={preview ? undefined : "carousel"}
      >
        <div className="featured-project-visual ecommerce-visual">
          {preview ? (
            <img
              className="featured-project-video ecommerce-banner-image"
              src="https://res.cloudinary.com/db7i9febj/image/upload/v1795426477/BannerEcommerce001_1_eoxita.png"
              alt="Ecommerce product design and development showcase"
            />
          ) : (
            <>
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
              <span
                className="visual-index"
                aria-live="polite"
                aria-atomic="true"
              >
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
            </>
          )}
        </div>
        <div className="featured-project-copy">
          <span className="eyebrow">Ecommerce · end-to-end product work</span>
          <h3>Product developer</h3>
          <p className="project-summary">
            Designed products, developed and patented the ideas, found factories
            to manufacture them, and brought them to market—with Amazon FBA and
            A+ Content creation.
          </p>
          <div className="project-tags" aria-label="Product development work">
            <span>Product design</span>
            <span>Patents</span>
            <span>Factory sourcing</span>
            <span>Marketing</span>
            <span>Amazon FBA · A+ Content</span>
          </div>
          <div className="project-actions">
            {preview ? (
              <Link className="button primary" to="/ecommerce">
                See more <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <a
                className="button primary"
                href={activeProduct.url}
                target="_blank"
                rel="noreferrer"
              >
                View product on Amazon <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
