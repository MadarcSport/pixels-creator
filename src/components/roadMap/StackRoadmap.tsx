import styles from "./StackRoadmap.module.css";

const stages = {
  modeling: {
    title: "3D modeling & optimization",
    tools: ["Cinema 4D"],
    detail:
      "Model the asset, clean up the topology, reduce the polygon count, and unwrap the UVs.",
    tone: "blue",
  },
  materials: {
    title: "PBR texturing",
    tools: ["Substance 3D Painter", "Materialize + Photoshop / Illustrator"],
    detail:
      "Choose a toolset and create base color, normal, roughness, metallic, and ambient occlusion maps as needed.",
    tone: "green",
  },
  assets: {
    title: "Web asset export",
    tools: ["Optimized GLB", "PBR textures"],
    detail:
      "Export the mesh and verify the materials in a glTF viewer. Embed textures or load them separately.",
    tone: "amber",
  },
  page: {
    title: "Portfolio page",
    tools: ["Next.js", "React", "TypeScript", "CSS"],
    detail:
      "Build the page and make room for the 3D canvas in the responsive layout.",
    tone: "violet",
  },
  scene: {
    title: "Interactive 3D scene",
    tools: ["Three.js", "React Three Fiber"],
    detail:
      "Load the GLB into the canvas and set up the camera, lighting, and interactions.",
    tone: "blue",
  },
  shaders: {
    title: "Optional shader materials",
    tools: ["GLSL"],
    detail:
      "Write a custom shader when the scene needs a surface effect such as procedural rust.",
    tone: "rose",
  },
  integration: {
    title: "Integrate & test",
    tools: ["React Three Fiber Canvas", "Next.js"],
    detail:
      "Mount the scene on the page and check loading, interaction, and performance on desktop and mobile.",
    tone: "green",
  },
  github: {
    title: "Push to GitHub",
    tools: ["Git", "GitHub"],
    detail: "Commit the project and push it to the repository.",
    tone: "violet",
  },
  vercel: {
    title: "Deploy on Vercel",
    tools: ["Vercel"],
    detail: "Connect the repository, verify the preview, and publish.",
    tone: "blue",
  },
} as const;

function Stage({ name }: { name: keyof typeof stages }) {
  const { title, tools, detail, tone } = stages[name];

  return (
    <article className={styles.card} data-tone={tone}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardBody}>
        <ul className={styles.tools}>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <p>{detail}</p>
      </div>
    </article>
  );
}

export default function StackRoadmap() {
  return (
    <section className={styles.roadmap} aria-label="Interactive 3D web roadmap">
      <header className={styles.banner}>
        {/* <p>Pixel Creator Lab</p> */}
        <h2>
          Interactive 3D Web <span>Roadmap</span>
        </h2>
      </header>

      <div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={styles.narrow}>
          <Stage name="modeling" />
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={styles.narrow}>
          <Stage name="materials" />
        </div>
        <div className={styles.assetConnector} aria-hidden="true">
          <span />
        </div>
        <div className={styles.columns}>
          <Stage name="assets" />
          <Stage name="page" />
          <div className={styles.arrow} aria-hidden="true" />
          <div className={styles.pageConnector} aria-hidden="true" />
          <div className={styles.scene}>
            <Stage name="scene" />
          </div>
          <div className={styles.shaders}>
            <Stage name="shaders" />
          </div>
        </div>
        <div className={styles.merge} aria-hidden="true">
          <span />
        </div>
        <div className={styles.narrow}>
          <Stage name="integration" />
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={styles.narrow}>
          <Stage name="github" />
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={styles.narrow}>
          <Stage name="vercel" />
        </div>
      </div>
    </section>
  );
}
