import { MeshStandardMaterial } from "three";

export type ShowcaseMaterial = "copper" | "gold" | "iron";

// Adapted from the original shader studies in public/material. Gold uses its
// default HDR analysis; reflections come from the scene's shared environment.
const surfaces = {
  copper: {
    color: "#7b4818",
    metalness: 0.99,
    roughness: 0.2,
    hash: "vec2(91.7, 441.2)",
    colorShader: `
      vec2 copperUv = vViewPosition.xy * 16.0;
      float warmGrain = surfaceNoise(copperUv);
      float fineGrain = surfaceNoise(copperUv * 6.5);
      float oxidationHint = smoothstep(0.72, 1.0, surfaceNoise(copperUv * 0.6));
      float brushedLines = pow(abs(sin((vViewPosition.x + vViewPosition.y * 0.18) * 82.0)), 20.0);
      float lockedHdrSheen = smoothstep(0.62, 1.0, surfaceNoise(copperUv * 0.35 + vec2(7.0, 3.0)));

      diffuseColor.rgb *= vec3(0.95, 0.42, 0.18);
      diffuseColor.rgb += warmGrain * vec3(0.09, 0.04, 0.018);
      diffuseColor.rgb += fineGrain * vec3(0.04, 0.02, 0.01);
      diffuseColor.rgb += brushedLines * vec3(0.06, 0.03, 0.012);
      diffuseColor.rgb += lockedHdrSheen * vec3(0.045, 0.022, 0.006);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.12, 0.42, 0.34), oxidationHint * 0.12);
    `,
    roughnessShader: `
      float lockedHdrPolish = smoothstep(0.55, 1.0, surfaceNoise(vViewPosition.xy * 18.0 + vec2(2.5, 9.0)));
      roughnessFactor = clamp(
        roughnessFactor + surfaceNoise(vViewPosition.xy * 55.0) * 0.13 - lockedHdrPolish * 0.045,
        0.2, 0.62
      );
    `,
  },
  gold: {
    color: "#d4af37",
    metalness: 1,
    roughness: 0.28,
    hash: "vec2(269.5, 183.3)",
    colorShader: `
      vec2 goldUv = vViewPosition.xy * 14.0;
      float softGrain = surfaceNoise(goldUv);
      float fineGrain = surfaceNoise(goldUv * 5.5);
      float polishedStreaks = pow(abs(sin((vViewPosition.x * 1.2 + vViewPosition.y * 0.35) * 70.0)), 24.0);
      vec3 hdrTint = mix(vec3(1.0), vec3(1.0, 0.96, 0.9), 0.08);

      diffuseColor.rgb *= vec3(1.0, 0.74, 0.22) * hdrTint;
      diffuseColor.rgb += softGrain * vec3(0.1, 0.065, 0.015);
      diffuseColor.rgb += fineGrain * vec3(0.045, 0.03, 0.008);
      diffuseColor.rgb += polishedStreaks * vec3(0.12, 0.09, 0.025);
    `,
    roughnessShader: `
      roughnessFactor = clamp(
        roughnessFactor + surfaceNoise(vViewPosition.xy * 45.0) * 0.09,
        0.18, 0.48
      );
    `,
  },
  iron: {
    color: "#c2c1c1",
    metalness: 1,
    roughness: 0.2,
    hash: "vec2(127.1, 311.7)",
    colorShader: `
      vec2 ironUv = vViewPosition.xy * 18.0;
      float broadGrain = surfaceNoise(ironUv);
      float fineGrain = surfaceNoise(ironUv * 7.0);
      float scratchLines = pow(abs(sin((vViewPosition.x + vViewPosition.y * 0.25) * 95.0)), 18.0);

      diffuseColor.rgb *= vec3(0.72, 0.70, 0.66);
      diffuseColor.rgb += broadGrain * 0.04;
      diffuseColor.rgb += fineGrain * 0.02;
      diffuseColor.rgb += scratchLines * 0.03;
    `,
    roughnessShader: `
      roughnessFactor = clamp(
        roughnessFactor + surfaceNoise(vViewPosition.xy * 65.0) * 0.18,
        0.32, 0.78
      );
    `,
  },
} satisfies Record<
  ShowcaseMaterial,
  {
    color: string;
    metalness: number;
    roughness: number;
    hash: string;
    colorShader: string;
    roughnessShader: string;
  }
>;

export function createShowcaseMaterial(surface: ShowcaseMaterial) {
  const settings = surfaces[surface];
  const material = new MeshStandardMaterial({
    color: settings.color,
    metalness: settings.metalness,
    roughness: settings.roughness,
    envMapIntensity: 1.8,
  });

  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        float surfaceHash(vec2 p) {
          return fract(sin(dot(p, ${settings.hash})) * 43758.5453123);
        }

        float surfaceNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(surfaceHash(i), surfaceHash(i + vec2(1.0, 0.0)), u.x),
            mix(surfaceHash(i + vec2(0.0, 1.0)), surfaceHash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }
      `,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>\n${settings.colorShader}`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>\n${settings.roughnessShader}`,
      );
  };
  material.customProgramCacheKey = () => `showcase-${surface}-v1`;

  return material;
}
