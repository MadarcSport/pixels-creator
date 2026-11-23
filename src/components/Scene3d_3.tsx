import { lazy, useState } from "react";
import { DeferredScene } from "./DeferredScene";
import type { ShowcaseMaterial } from "../materials/showcaseMaterials";
import "./Scene3d_3.css";

const Scene3d_3Canvas = lazy(() => import("./Scene3d_3Canvas"));

const materialOptions: {
  id: ShowcaseMaterial;
  label: string;
  description: string;
}[] = [
  {
    id: "copper",
    label: "Copper",
    description: "Warm brushed copper with fine grain and subtle oxidation.",
  },
  {
    id: "gold",
    label: "Gold",
    description:
      "Polished gold with delicate streaks and a warm metallic sheen.",
  },
  {
    id: "iron",
    label: "Iron",
    description:
      "Cool iron with layered grain, scratches, and varied roughness.",
  },
];

export function Scene3d_3() {
  const [surface, setSurface] = useState<ShowcaseMaterial>("copper");
  const selectedMaterial = materialOptions.find(
    (option) => option.id === surface,
  )!;

  return (
    <section
      className="material-showcase"
      aria-labelledby="material-showcase-title"
    >
      <div className="section-heading">
        <span className="eyebrow">Shader & surface studies</span>
        <h2 id="material-showcase-title">One sphere. Three surfaces.</h2>
        <p>
          Exploring procedural grain, metallic reflections, and the details that
          bring a surface to life.
        </p>
      </div>

      <div
        className="material-showcase-canvas"
        role="img"
        aria-label={`${selectedMaterial.label} shader on an interactive 3D sphere. Drag to orbit; use the buttons below to change material.`}
      >
        <DeferredScene>
          <Scene3d_3Canvas surface={surface} />
        </DeferredScene>
      </div>

      <div
        className="material-showcase-controls"
        role="group"
        aria-label="Choose a surface material"
      >
        {materialOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className="material-showcase-button"
            aria-pressed={surface === option.id}
            onClick={() => setSurface(option.id)}
          >
            <span
              className={`material-showcase-swatch material-showcase-swatch--${option.id}`}
              aria-hidden="true"
            />
            {option.label}
          </button>
        ))}
      </div>
      <p
        className="material-showcase-description"
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedMaterial.description}
      </p>
      <p className="material-showcase-hint">
        Drag to explore the reflections · Select a surface to compare
      </p>
    </section>
  );
}
