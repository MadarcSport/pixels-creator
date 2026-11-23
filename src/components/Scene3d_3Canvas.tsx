import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { createShowcaseMaterial } from "../materials/showcaseMaterials";
import type { ShowcaseMaterial } from "../materials/showcaseMaterials";

function MaterialSphere({ surface }: { surface: ShowcaseMaterial }) {
  const material = useMemo(() => createShowcaseMaterial(surface), [surface]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh material={material}>
      <sphereGeometry args={[1.35, 96, 64]} />
    </mesh>
  );
}

export default function Scene3d_3Canvas({
  surface,
}: {
  surface: ShowcaseMaterial;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      fallback={
        <p className="material-showcase-status">
          WebGL is needed to display the material preview.
        </p>
      }
    >
      <Suspense
        fallback={
          <Html center>
            <p className="material-showcase-status">Loading materials…</p>
          </Html>
        }
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 5, 3]} intensity={20} />
        <MaterialSphere surface={surface} />
        <Environment files="/material/2k.hdr" background={false} />
        <OrbitControls makeDefault enablePan={false} enableZoom={false} />
      </Suspense>
    </Canvas>
  );
}
