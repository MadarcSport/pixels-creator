export function createRustedIronMaterial(baseMaterial) {
  const material = baseMaterial.clone();

  material.color.set("#ffffff");
  material.metalness = 0.1;
  material.roughness = 0.9;

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
      varying vec3 vIronWorldPos;`,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <project_vertex>",
      `#include <project_vertex>

      // Use the final vertex position, including skinning and morph targets.
      vec4 ironWorldPosition = vec4(transformed, 1.0);

      #ifdef USE_BATCHING
        ironWorldPosition = batchingMatrix * ironWorldPosition;
      #endif

      #ifdef USE_INSTANCING
        ironWorldPosition = instanceMatrix * ironWorldPosition;
      #endif

      vIronWorldPos = (modelMatrix * ironWorldPosition).xyz;`,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
      varying vec3 vIronWorldPos;

      float rustHash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float rustNoise(vec2 p) {
        vec2 cell = floor(p);
        vec2 offset = fract(p);
        vec2 blend = offset * offset * (3.0 - 2.0 * offset);

        float bottom = mix(
          rustHash(cell),
          rustHash(cell + vec2(1.0, 0.0)),
          blend.x
        );
        float top = mix(
          rustHash(cell + vec2(0.0, 1.0)),
          rustHash(cell + vec2(1.0, 1.0)),
          blend.x
        );

        return mix(bottom, top, blend.y);
      }

      float rustFbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.55;
        mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);

        for (int i = 0; i < 4; i++) {
          value += amplitude * rustNoise(p);
          p = rotation * p * 2.05 + vec2(11.3, 27.9);
          amplitude *= 0.45;
        }

        return value;
      }

      float stripeRust2D(vec2 p) {
        float wave = rustFbm(p * 0.85) * 2.0;
        float streaks = rustFbm(
          vec2(p.x * 4.2 + wave, p.y * 1.15 + wave * 0.3)
        );
        float patches = rustFbm(p * 1.45 + vec2(5.2, 1.7));

        return smoothstep(0.32, 0.64, mix(patches, streaks, 0.58));
      }

      float computeWorldRustMask(vec3 worldPos, vec3 worldNormal) {
        vec3 weights = pow(abs(worldNormal), vec3(4.0));
        weights /= max(weights.x + weights.y + weights.z, 0.0001);

        float scale = 1.6;
        float xProjection = stripeRust2D(worldPos.zy * scale);
        float yProjection = stripeRust2D(worldPos.xz * scale);
        float zProjection = stripeRust2D(worldPos.xy * scale);

        return dot(vec3(xProjection, yProjection, zProjection), weights);
      }`,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_begin>",
      `#include <normal_fragment_begin>

      // Convert the view-space normal to world space for triplanar blending.
      vec3 ironWorldNormal = normalize(transpose(mat3(viewMatrix)) * normal);
      float rustMask = computeWorldRustMask(vIronWorldPos, ironWorldNormal);

      vec3 ironColor = vec3(0.28, 0.29, 0.31);
      vec3 darkRust = vec3(0.22, 0.05, 0.015);
      vec3 brightRust = vec3(0.68, 0.22, 0.04);

      vec2 tonePosition = vIronWorldPos.xy * 2.4
        + vec2(vIronWorldPos.z * 1.7)
        + vec2(3.1, 8.4);
      float tone = rustFbm(tonePosition);
      vec3 rustColor = mix(darkRust, brightRust, smoothstep(0.25, 0.75, tone));

      vec2 grainPosition = vIronWorldPos.xy * 18.0
        + vec2(vIronWorldPos.z * 14.0);
      float grain = rustNoise(grainPosition);
      float ironRoughness = mix(0.28, 0.48, grain);
      float rustRoughness = mix(0.78, 0.96, grain);

      diffuseColor.rgb = mix(ironColor, rustColor, rustMask);
      roughnessFactor = mix(ironRoughness, rustRoughness, rustMask);
      metalnessFactor = mix(0.88, 0.02, rustMask);`,
    );
  };

  material.customProgramCacheKey = () => "procedural-rusted-iron-world-v2";

  return material;
}
