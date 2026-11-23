import { Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** Load once near the viewport, then keep the scene mounted while scrolling. */
export function DeferredScene({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      // Older browsers should still be able to display the scene.
      const frame = requestAnimationFrame(() => setIsNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {isNearViewport && (
        <Suspense fallback={<p role="status">Loading 3D preview…</p>}>
          {children}
        </Suspense>
      )}
    </div>
  );
}
