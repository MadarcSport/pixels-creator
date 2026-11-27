import { useEffect } from "react";
import { BrandIdentitySection2 } from "./BrandIdentitySection2";
import { EcommerceSection } from "./EcommerceSection";
import { ProjectSummary } from "./ProjectSummary";

export function EcommercePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Ecommerce | Pixels-Creator";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="app ecommerce-page">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Portfolio home">
          <img
            className="brand-logo"
            src="https://res.cloudinary.com/db7i9febj/image/upload/v1794301527/TR_Glossy_Blue_Paintbrush_with_Flying_Pixels_1_faqgsh.png"
            alt=""
          />
          Pixels-Creator
        </a>
        <a className="button secondary" href="/#ecommerce">
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
      </nav>
      <main>
        <section
          className="ecommerce-story section-block"
          aria-label="Product development and creative direction"
        >
          <div className="ecommerce-story-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/g6cuu6isGGc"
              title="Product development and creative direction in China"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="ecommerce-story-copy">
            <h2>Product development journey</h2>
            <ProjectSummary collapsible>
              Since moving to China in 2015, I have focused on designing and
              developing standout products for e-commerce. Beyond the physical
              items, I work closely with companies to shape their branding and
              set new market trends. Today, I combine this deep manufacturing
              insight with creative direction to help brands scale and connect
              with global audiences.
            </ProjectSummary>
          </div>
        </section>
        <EcommerceSection />
        <BrandIdentitySection2 />
      </main>
    </div>
  );
}
