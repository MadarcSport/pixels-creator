import { Material, MeshStandardMaterial } from "three";

// Keep model materials in source code: Vite serves public assets unchanged.
function createProceduralIronMaterial(baseMaterial: MeshStandardMaterial) {
  const material = baseMaterial.clone();
  material.color.set("#72c0ff");
  material.metalness = 1;
  material.roughness = 0.01;

  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        float ironHash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float ironNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(ironHash(i), ironHash(i + vec2(1.0, 0.0)), u.x),
            mix(ironHash(i + vec2(0.0, 1.0)), ironHash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        vec2 ironUv = vViewPosition.xy * 78.0;
        float broadGrain = ironNoise(ironUv);
        float fineGrain = ironNoise(ironUv * 70.0);
        float scratchLines = pow(abs(sin((vViewPosition.x + vViewPosition.y * 0.25) * 95.0)), 18.0);
        diffuseColor.rgb *= vec3(0.008, 0.369, 0.612);
        diffuseColor.rgb += broadGrain * 0.05;
        diffuseColor.rgb += fineGrain * 0.091;
        diffuseColor.rgb += scratchLines * 0.09;`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor + ironNoise(vViewPosition.xy * 85.0) * 0.949, 0.620, 0.086);`,
      );
  };
  material.customProgramCacheKey = () => "procedural-iron-material";

  return material;
}

function createProceduralIronBlackMaterial(baseMaterial: MeshStandardMaterial) {
  const material = baseMaterial.clone();
  material.color.set("#000000");
  material.metalness = 1;
  material.roughness = 0;

  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        float ironHash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float ironNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(ironHash(i), ironHash(i + vec2(1.0, 0.0)), u.x),
            mix(ironHash(i + vec2(0.0, 1.0)), ironHash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        vec2 ironUv = vViewPosition.xy * 18.0;
        float broadGrain = ironNoise(ironUv);
        float fineGrain = ironNoise(ironUv * 7.0);
        float scratchLines = pow(abs(sin((vViewPosition.x + vViewPosition.y * 0.25) * 95.0)), 18.0);
        diffuseColor.rgb *= vec3(0.129, 0.129, 0.129);
        diffuseColor.rgb += broadGrain * 0.045;
        diffuseColor.rgb += fineGrain * 0.03;
        diffuseColor.rgb += scratchLines * 0.01;`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor + ironNoise(vViewPosition.xy * 85.0) * 0.949, 0.620, 0.086);`,
      );
  };
  material.customProgramCacheKey = () => "procedural-iron-black-material";

  return material;
}

export function createIronMaterial(baseMaterial: MeshStandardMaterial) {
  return createProceduralIronMaterial(baseMaterial);
}

export function createIronBlackMaterial(baseMaterial: MeshStandardMaterial) {
  return createProceduralIronBlackMaterial(baseMaterial);
}

export function createBlackPlasticMaterial(baseMaterial?: Material) {
  const material = new MeshStandardMaterial({
    color: "#161616",
    metalness: 0,
    roughness: 0.6,
  });

  if (baseMaterial) {
    // Keep draw behavior compatible with optional mesh-specific setup.
    material.side = baseMaterial.side;
  }
  if (baseMaterial instanceof MeshStandardMaterial) {
    material.flatShading = baseMaterial.flatShading;
  }

  // Avoid inherited emissive/alpha settings that can make black plastic appear white.
  material.emissive.set("#000000");
  material.emissiveIntensity = 0;
  material.transparent = false;
  material.opacity = 1;

  return material;
}
