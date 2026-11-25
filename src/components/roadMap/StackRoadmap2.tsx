import styles from "./StackRoadmap2.module.css";

// Small, local SVG illustrations keep the roadmap independent of icon services.
const iconPaths = {
  cube: "M12 3 3 8v8l9 5 9-5V8l-9-5ZM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5",
  texture: "M4 4h16v16H4V4Zm0 8h16M12 4v16M4 4l8 8M12 12l8 8",
  export: "M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16",
  orbit:
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM3 12a9 4 0 1 0 18 0 9 4 0 1 0-18 0ZM12 3a4 9 0 1 0 0 18 4 9 0 1 0 0-18Z",
  sparkle:
    "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM19 3v4m-2-2h4",
  check: "M9 3h6l1 3h4v15H4V6h4l1-3Zm0 3h6M8 13l3 3 5-6",
  branch:
    "M6 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM18 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 7v10M18 7v2a5 5 0 0 1-5 5H6",
  launch: "m12 4 9 16H3L12 4Zm0 5v6m0 3h.01",
} as const;

type IconName = keyof typeof iconPaths;
type RoadmapStage = {
  title: string;
  tools: readonly string[];
  detail: string;
  icon: IconName;
  optional?: boolean;
};

const phases: {
  name: string;
  caption: string;
  tone: string;
  stages: RoadmapStage[];
}[] = [
  {
    name: "Create",
    caption: "From an idea to a web-ready asset",
    tone: "warm",
    stages: [
      {
        title: "3D modeling & optimization",
        tools: ["Cinema 4D"],
        detail:
          "Model the asset, clean up the topology, reduce the polygon count, and unwrap the UVs.",
        icon: "cube",
      },
      {
        title: "PBR texturing",
        tools: [
          "Substance 3D Painter",
          "Materialize + Photoshop / Illustrator",
        ],
        detail:
          "Choose a toolset and create base color, normal, roughness, metallic, and ambient occlusion maps as needed.",
        icon: "texture",
      },
      {
        title: "Web asset export",
        tools: ["Optimized GLB", "PBR textures"],
        detail:
          "Export the mesh and verify the materials in a glTF viewer. Embed textures or load them separately.",
        icon: "export",
      },
    ],
  },
  {
    name: "Build",
    caption: "Where design becomes interactive",
    tone: "violet",
    stages: [
      {
        title: "Portfolio page",
        tools: ["Next.js", "React", "TypeScript", "CSS"],
        detail:
          "Build the page and make room for the 3D canvas in the responsive layout.",
        icon: "code",
      },
      {
        title: "Interactive 3D scene",
        tools: ["Three.js", "React Three Fiber"],
        detail:
          "Load the GLB into the canvas and set up the camera, lighting, and interactions.",
        icon: "orbit",
      },
      {
        title: "Optional shader materials",
        tools: ["GLSL"],
        detail:
          "Write a custom shader when the scene needs a surface effect such as procedural rust.",
        icon: "sparkle",
        optional: true,
      },
    ],
  },
  {
    name: "Ship",
    caption: "Polished, tested, and out in the world",
    tone: "mint",
    stages: [
      {
        title: "Integrate & test",
        tools: ["React Three Fiber Canvas", "Next.js"],
        detail:
          "Mount the scene on the page and check loading, interaction, and performance on desktop and mobile.",
        icon: "check",
      },
      {
        title: "Push to GitHub",
        tools: ["Git", "GitHub"],
        detail: "Commit the project and push it to the repository.",
        icon: "branch",
      },
      {
        title: "Deploy on Vercel",
        tools: ["Vercel"],
        detail: "Connect the repository, verify the preview, and publish.",
        icon: "launch",
      },
    ],
  },
];

function StageIcon({ name }: { name: IconName }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function StackRoadmap2() {
  return (
    <section
      className={styles.roadmap}
      aria-label="Interactive 3D web roadmap, redesigned"
    >
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Pixels-Creator / Creative workflow</p>
          <h2>
            From pixels to
            <br />
            <span>possibilities.</span>
          </h2>
          <p className={styles.intro}>
            My interactive 3D web roadmap — the tools and steps that turn a
            creative idea into a live experience.
          </p>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.orbitRing} />
          <div className={styles.artCore}>
            <StageIcon name="cube" />
          </div>
          <span className={styles.artLabel}>DESIGN · CODE · DEPLOY</span>
        </div>
      </header>

      <div className={styles.overview} aria-label="Workflow overview">
        <span>
          <i aria-hidden="true" /> One creative pipeline
        </span>
        <p>
          3 phases <span aria-hidden="true">/</span> 8 core steps{" "}
          <span aria-hidden="true">/</span> 1 optional shader step
        </p>
      </div>

      <ol className={styles.phases}>
        {phases.map((phase, phaseIndex) => (
          <li className={styles.phase} data-tone={phase.tone} key={phase.name}>
            <header className={styles.phaseHeading}>
              <span className={styles.phaseNumber} aria-hidden="true">
                0{phaseIndex + 1}
              </span>
              <div>
                <h3>{phase.name}</h3>
                <p>{phase.caption}</p>
              </div>
              <span className={styles.phaseArrow} aria-hidden="true">
                ↗
              </span>
            </header>
            <ol className={styles.cards} start={phaseIndex * 3 + 1}>
              {phase.stages.map((stage, stageIndex) => (
                <li
                  className={styles.card}
                  data-optional={stage.optional || undefined}
                  key={stage.title}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.icon}>
                      <StageIcon name={stage.icon} />
                    </span>
                    <span className={styles.step}>
                      {stage.optional ? "Optional / " : "Step / "}0
                      {phaseIndex * 3 + stageIndex + 1}
                    </span>
                  </div>
                  <h4>{stage.title}</h4>
                  <p className={styles.detail}>{stage.detail}</p>
                  <ul className={styles.tools} aria-label="Tools and formats">
                    {stage.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <footer className={styles.footer}>
        <span className={styles.footerIcon}>
          <StageIcon name="sparkle" />
        </span>
        <p>
          Built with intention.{" "}
          <span>From the first polygon to the final pixel.</span>
        </p>
        <span className={styles.liveBadge}>
          Ready for the web <span aria-hidden="true">↗</span>
        </span>
      </footer>
    </section>
  );
}
