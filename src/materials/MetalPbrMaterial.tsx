import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import {
  NoColorSpace,
  RepeatWrapping,
  ShaderChunk,
  SRGBColorSpace,
} from "three";
import type { MeshStandardMaterial } from "three";

const texturePaths = {
  map: "/material/metal_pbr/metall_diffuse.png",
  metalnessMap: "/material/metal_pbr/metall_metallic.png",
  normalMap: "/material/metal_pbr/metall_normal.png",
  aoMap: "/material/metal_pbr/metall_ao.png",
  roughnessMap: "/material/metal_pbr/metall_smoothness.png",
};

const convertSmoothness: MeshStandardMaterial["onBeforeCompile"] = (shader) => {
  // These assets supply smoothness; Three.js needs 1 - smoothness.
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <roughnessmap_fragment>",
    ShaderChunk.roughnessmap_fragment.replace(
      "roughnessFactor *= texelRoughness.g;",
      "roughnessFactor *= (1.0 - texelRoughness.g);",
    ),
  );
};

const programCacheKey = () => "metal-pbr-smoothness-v1";

type MetalPbrMaterialProps = {
  repeat?: [number, number];
};

export default function MetalPbrMaterial({
  repeat: [repeatX, repeatY] = [1, 1],
}: MetalPbrMaterialProps) {
  const loaded = useTexture(texturePaths);
  const { map, metalnessMap, normalMap, aoMap, roughnessMap } = loaded;
  const textures = useMemo(() => {
    const cloned = {
      map: map.clone(),
      metalnessMap: metalnessMap.clone(),
      normalMap: normalMap.clone(),
      aoMap: aoMap.clone(),
      roughnessMap: roughnessMap.clone(),
    };

    for (const [name, texture] of Object.entries(cloned)) {
      // Match glTF UV orientation without mutating useTexture's shared cache.
      texture.flipY = false;
      texture.colorSpace = name === "map" ? SRGBColorSpace : NoColorSpace;
      texture.channel = 0;
      if (repeatX !== 1 || repeatY !== 1) {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
      }
      texture.repeat.set(repeatX, repeatY);
      texture.needsUpdate = true;
    }
    return cloned;
  }, [map, metalnessMap, normalMap, aoMap, roughnessMap, repeatX, repeatY]);

  useEffect(
    () => () => {
      Object.values(textures).forEach((texture) => texture.dispose());
    },
    [textures],
  );

  return (
    <meshStandardMaterial
      {...textures}
      metalness={1}
      roughness={1}
      onBeforeCompile={convertSmoothness}
      customProgramCacheKey={programCacheKey}
    />
  );
}
