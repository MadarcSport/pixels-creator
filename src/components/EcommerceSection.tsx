import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ecommerceProducts } from "../data/ecommerceProducts";
import { ProjectSummary } from "./ProjectSummary";

interface EcommerceSectionProps {
  preview?: boolean;
}

export function EcommerceSection({ preview = false }: EcommerceSectionProps) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isEcommerceVideoOpen, setIsEcommerceVideoOpen] = useState(false);
  const ecommerceVideoDialogRef = useRef<HTMLDialogElement>(null);
  const activeProduct = ecommerceProducts[activeProductIndex];
  const ecommerceProcessVideo = {
    title: "Ecommerce process video",
    youtubeId: "Z3oNoVuX0EQ",
    bannerUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795738143/ECOMMSpelicule1_1_twk8ea.png",
  };

  useEffect(() => {
    if (!isEcommerceVideoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isEcommerceVideoOpen]);

  const showProduct = (direction: -1 | 1) => {
    setActiveProductIndex(
      (currentIndex) =>
        (currentIndex + direction + ecommerceProducts.length) %
        ecommerceProducts.length,
    );
  };

  const renderEcommerceProcessBanner = () => (
    <div className="video-banner ecommerce-process-banner">
      <img
        src={ecommerceProcessVideo.bannerUrl}
        alt="Ecommerce process filmstrip preview"
        loading="lazy"
      />
      <button
        className="video-banner-play"
        type="button"
        aria-label={`Watch ${ecommerceProcessVideo.title}`}
        aria-haspopup="dialog"
        onClick={() => {
          ecommerceVideoDialogRef.current?.showModal();
          setIsEcommerceVideoOpen(true);
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <div className="section-heading featured-labs-heading" id="ecommerce">
        <div>
          {/* <span className="eyebrow">Product development</span> */}
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
        <div
          className={`featured-project-visual ecommerce-visual${
            preview ? " ecommerce-visual-preview" : ""
          }`}
        >
          {preview ? (
            <img
              className="featured-project-video ecommerce-banner-image"
              src="https://res.cloudinary.com/db7i9febj/image/upload/v1795426477/BannerEcommerce001_1_eoxita.png"
              alt="Ecommerce product design and development showcase"
              loading="lazy"
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
          <ProjectSummary collapsible={preview}>
            Designed products, developed and patented the ideas, found factories
            to manufacture them, and brought them to market—with Amazon FBA and
            A+ Content creation.
          </ProjectSummary>
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
      {!preview && renderEcommerceProcessBanner()}
      {!preview && (
        <dialog
          className="video-dialog"
          ref={ecommerceVideoDialogRef}
          aria-labelledby="ecommerce-process-dialog-title"
          onClose={() => setIsEcommerceVideoOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              ecommerceVideoDialogRef.current?.close();
            }
          }}
        >
          <div className="video-dialog-content">
            <div className="video-dialog-heading">
              <h2 id="ecommerce-process-dialog-title">
                {ecommerceProcessVideo.title}
              </h2>
              <button
                className="video-dialog-close"
                type="button"
                aria-label="Close video"
                onClick={() => ecommerceVideoDialogRef.current?.close()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {isEcommerceVideoOpen && (
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ecommerceProcessVideo.youtubeId}?autoplay=1`}
                  title={ecommerceProcessVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
