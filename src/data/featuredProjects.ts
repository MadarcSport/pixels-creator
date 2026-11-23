export interface FeaturedProject {
  title: string;
  summary: string;
  tags: string[];
  url: string;
  thumbnailUrl: string;
  previewType: "video" | "iframe";
  previewUrl: string;
  previewTitle: string;
  githubUrl?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Quantum Pulse",
    summary:
      "A browser-based experience bringing an interactive 3D canvas together with supporting web pages. Explore the live project, then return here for a concise overview.",
    tags: ["Interactive 3D", "Web experience", "Live demo"],
    url: "https://quantum-pulse-tau.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=640&q=80",
    previewType: "video",
    previewUrl:
      "https://res.cloudinary.com/db7i9febj/video/upload/v1794300774/quantumPukse_zfvkqc.webm",
    previewTitle: "Quantum Pulse project preview video",
    githubUrl: "https://github.com/MadarcSport/quantum-pulse",
  },
  {
    title: "Street Wall",
    summary:
      "Explore Street Wall, another live web project. Open the full experience to see it in its intended layout and interact with the complete site.",
    tags: ["Web experience", "Interactive", "Live demo"],
    url: "https://street-wall-1.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=640&q=80",
    previewType: "video",
    previewUrl:
      "https://res.cloudinary.com/db7i9febj/video/upload/v1794948903/wallDownn11_o0tluq.webm",
    previewTitle: "Street Wall project preview video",
  },
  {
    title: "Broken Computer",
    summary:
      "An interactive material showcase exploring surface detail through albedo, normal, and roughness maps, alongside a collection of shader-driven visual effects.",
    tags: ["Material maps", "Shader art", "Interactive 3D"],
    url: "https://broken-computer.vercel.app/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80",
    previewType: "video",
    previewUrl:
      "https://res.cloudinary.com/db7i9febj/video/upload/v1794905595/cubeDemo01_1_1_x1od7w.webm",
    previewTitle: "Broken Computer cube preview video",
  },
];
