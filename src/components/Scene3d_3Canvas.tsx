import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import type { Vector4 } from "three";
import {
  createShowcaseMaterial,
  getSurfaceWeights,
} from "../materials/showcaseMaterials";
import type { ShowcaseMaterial } from "../materials/showcaseMaterials";

const MATERIAL_TRANSITION_MS = 800;

function MaterialSphere({ surface }: { surface: ShowcaseMaterial }) {
  const [material] = useState(() => createShowcaseMaterial(surface));
  const invalidate = useThree((state) => state.invalidate);
  const transition = useRef<{
    from: Vector4;
    to: Vector4;
    startedAt: number;
  } | null>(null);

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const target = getSurfaceWeights(surface);

    const finishImmediately = () => {
      transition.current = null;
      material.surfaceWeights.copy(target);
      invalidate();
    };
    const onMotionChange = () => {
      if (motionPreference.matches) finishImmediately();
    };

    if (motionPreference.matches || material.surfaceWeights.equals(target)) {
      finishImmediately();
    } else {
      // Capture the current blend so another click never causes a visual jump.
      transition.current = {
        from: material.surfaceWeights.clone(),
        to: target,
        startedAt: performance.now(),
      };
      invalidate();
    }

    motionPreference.addEventListener("change", onMotionChange);
    return () => motionPreference.removeEventListener("change", onMotionChange);
  }, [surface, material, invalidate]);

  useFrame(() => {
    const active = transition.current;
    if (!active) return;

    const progress = Math.min(
      (performance.now() - active.startedAt) / MATERIAL_TRANSITION_MS,
      1,
    );
    const eased = progress * progress * (3 - 2 * progress);
    material.surfaceWeights.lerpVectors(active.from, active.to, eased);

    if (progress < 1) {
      // Continue the animation even though the canvas uses frameloop="demand".
      invalidate();
    } else {
      transition.current = null;
    }
  });

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
