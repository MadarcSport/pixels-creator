import { Color, MeshStandardMaterial, Vector4 } from "three";

export type ShowcaseMaterial = "copper" | "gold" | "iron" | "ironBlack";

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
  ironBlack: {
    color: "#525252",
    metalness: 1,
    roughness: 0.2,
    hash: "vec2(127.1, 311.7)",
    colorShader: `
      vec2 ironUv = vViewPosition.xy * 18.0;
      float broadGrain = surfaceNoise(ironUv);
      float fineGrain = surfaceNoise(ironUv * 7.0);
      float scratchLines = pow(abs(sin((vViewPosition.x + vViewPosition.y * 0.25) * 95.0)), 18.0);

      diffuseColor.rgb *= vec3(0.72, 0.70, 0.66);
      diffuseColor.rgb += broadGrain * 0.01;
      diffuseColor.rgb += fineGrain * 0.04;
      diffuseColor.rgb += scratchLines * 0.06;
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

export function getSurfaceWeights(surface: ShowcaseMaterial) {
  return new Vector4(
    surface === "copper" ? 1 : 0,
    surface === "gold" ? 1 : 0,
    surface === "iron" ? 1 : 0,
    surface === "ironBlack" ? 1 : 0,
  );
}

export function createShowcaseMaterial(surface: ShowcaseMaterial) {
  // Keep one compiled material; animate these weights instead of replacing it.
  const material = Object.assign(
    new MeshStandardMaterial({
      color: "#ffffff",
      metalness: 1,
      roughness: 1,
      envMapIntensity: 1.8,
    }),
    { surfaceWeights: getSurfaceWeights(surface) },
  );

  const surfaceFunctions = Object.entries(surfaces)
    .map(
      ([name, settings]) => `
        uniform vec3 u${name}Color;

        float ${name}Hash(vec2 p) {
          return fract(sin(dot(p, ${settings.hash})) * 43758.5453123);
        }

        float ${name}Noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(${name}Hash(i), ${name}Hash(i + vec2(1.0, 0.0)), u.x),
            mix(${name}Hash(i + vec2(0.0, 1.0)), ${name}Hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        vec4 evaluate${name}Surface() {
          vec4 diffuseColor = vec4(u${name}Color, 1.0);
          float roughnessFactor = ${settings.roughness};
          ${settings.colorShader.replaceAll("surfaceNoise", `${name}Noise`)}
          ${settings.roughnessShader.replaceAll("surfaceNoise", `${name}Noise`)}
          return vec4(diffuseColor.rgb, roughnessFactor);
        }
  `,
    )
    .join("\n");

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uSurfaceWeights = { value: material.surfaceWeights };
    for (const [name, settings] of Object.entries(surfaces)) {
      shader.uniforms[`u${name}Color`] = { value: new Color(settings.color) };
    }

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform vec4 uSurfaceWeights;
        ${surfaceFunctions}`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        vec4 blendedSurface = evaluatecopperSurface() * uSurfaceWeights.x
          + evaluategoldSurface() * uSurfaceWeights.y
          + evaluateironSurface() * uSurfaceWeights.z
          + evaluateironBlackSurface() * uSurfaceWeights.w;
        diffuseColor.rgb = blendedSurface.rgb;`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        roughnessFactor = blendedSurface.a;`,
      )
      .replace(
        "#include <metalnessmap_fragment>",
        `#include <metalnessmap_fragment>
        metalnessFactor = dot(uSurfaceWeights, vec4(${surfaces.copper.metalness}, ${surfaces.gold.metalness.toFixed(1)}, ${surfaces.iron.metalness.toFixed(1)}, ${surfaces.ironBlack.metalness.toFixed(1)}));`,
      );
  };
  material.customProgramCacheKey = () => "showcase-blended-surfaces-v2";

  return material;
}
