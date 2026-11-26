import type { KeyboardEvent } from "react";
import { useState } from "react";
import "./PbrMatCarousel.css";

type CarouselImage = {
  src: string;
  title: string;
  caption: string;
};

const pbrImages: CarouselImage[] = [
  {
    src: "/pictures_carousel/albedoMapCarrousel.png",
    title: "Albedo Map",
    caption:
      "Base color data that defines the surface without light or shading.",
  },
  {
    src: "/pictures_carousel/normalMapCarrousel.png",
    title: "Normal Map",
    caption: "Per-pixel surface direction details for richer micro-geometry.",
  },
  {
    src: "/pictures_carousel/roughnessMapCarrousel.png",
    title: "Roughness Map",
    caption: "Controls glossy versus matte reflections across the material.",
  },
  {
    src: "/pictures_carousel/metalnessMapCarrousel.png",
    title: "Metalness Map",
    caption: "Defines conductive areas to produce metallic light behavior.",
  },
];

export function PbrMatCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = pbrImages[activeIndex];

  const getRelativeOffset = (targetIndex: number) => {
    const total = pbrImages.length;
    const half = Math.floor(total / 2);
    let offset = targetIndex - activeIndex;

    if (offset > half) {
      offset -= total;
    }

    if (offset < -half) {
      offset += total;
    }

    return offset;
  };

  const goPrevious = () => {
    setActiveIndex((previous) =>
      previous === 0 ? pbrImages.length - 1 : previous - 1,
    );
  };

  const goNext = () => {
    setActiveIndex((previous) =>
      previous === pbrImages.length - 1 ? 0 : previous + 1,
    );
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section className="pbr-carousel" aria-label="PBR texture maps showcase">
      <div
        className="pbr-carousel-stage"
        tabIndex={0}
        onKeyDown={onStageKeyDown}
        aria-label="Texture map carousel. Use left and right arrow keys to navigate."
      >
        {pbrImages.map((image, index) => {
          const offset = getRelativeOffset(index);
          const absoluteOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isSide = absoluteOffset === 1;
          const isFar = absoluteOffset > 1;
          const slideClassName = [
            "pbr-carousel-slide",
            isActive ? "is-active" : "",
            isSide ? "is-side" : "",
            isFar ? "is-far" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={image.src}
              type="button"
              className={slideClassName}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 56}%) scale(${isActive ? 1 : isSide ? 0.72 : 0.56})`,
                opacity: isActive ? 1 : isSide ? 0.58 : 0,
                filter: `blur(${isActive ? 0 : isSide ? 0.4 : 1.8}px)`,
                zIndex: isActive ? 30 : isSide ? 20 : 10,
                pointerEvents: isFar ? "none" : "auto",
              }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${image.title}`}
              aria-hidden={isFar}
            >
              <img src={image.src} alt={image.title} loading="lazy" />
            </button>
          );
        })}

        <button
          type="button"
          className="pbr-carousel-arrow pbr-carousel-arrow--left"
          onClick={goPrevious}
          aria-label="Show previous map"
        >
          {"<"}
        </button>
        <button
          type="button"
          className="pbr-carousel-arrow pbr-carousel-arrow--right"
          onClick={goNext}
          aria-label="Show next map"
        >
          {">"}
        </button>
      </div>

      <div className="pbr-carousel-meta" aria-live="polite" aria-atomic="true">
        <p className="pbr-carousel-title">{activeImage.title}</p>
        <p className="pbr-carousel-caption">{activeImage.caption}</p>
      </div>

      <div
        className="pbr-carousel-dots"
        role="tablist"
        aria-label="Choose texture map"
      >
        {pbrImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`Show ${image.title}`}
            className="pbr-carousel-dot"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
