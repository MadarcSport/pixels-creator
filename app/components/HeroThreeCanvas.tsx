"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import BoardControlModel from "./BoardControlModel";
import type { BoardControlHandle } from "./BoardControlModel";
import LogoMotherboard2Model from "./LogoMotherboard2Model";
import "./HeroThreeCanvas.css";

const CAMERA_TARGET: [number, number, number] = [-55, 65, -9];
const BASE_CAMERA_POSITION: [number, number, number] = [-55, 80, 300];
const ENVIRONMENT_INTENSITY = 1.2;

function isEnvMapIntensityMaterial(
  material: THREE.Material,
): material is THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial {
  return "envMapIntensity" in material;
}

function ApplyEnvironmentIntensity({ intensity }: { intensity: number }) {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (!material || !isEnvMapIntensityMaterial(material)) {
          return;
        }

        material.envMapIntensity = intensity;
        material.needsUpdate = true;
      });
    });
  }, [scene, intensity]);

  return null;
}

export default function HeroThreeCanvas() {
  const boardControlRef = useRef<BoardControlHandle>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const cameraConfig = useMemo(
    () => ({
      fov: isMobile ? 30 : 30,
      position: isMobile
        ? ([BASE_CAMERA_POSITION[0], BASE_CAMERA_POSITION[1] + 12, 370] as [
            number,
            number,
            number,
          ])
        : BASE_CAMERA_POSITION,
    }),
    [isMobile],
  );

  return (
    <div className="hero-three-showcase">
      <div className="hero-three-canvas-control">
        <button
          type="button"
          className="hero-three-turn-on"
          onClick={() => boardControlRef.current?.turnOn()}
        >
          Turn On
        </button>
      </div>
      <div className="hero-three-canvas" aria-label="Three.js animated canvas">
        <Canvas
          camera={cameraConfig}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.83,
          }}
          onCreated={({ camera }) => {
            camera.lookAt(...CAMERA_TARGET);
          }}
        >
          {/* Transparent background: keep this line removed */}
          {/* <color attach="background" args={["#0f172a"]} /> */}

          <ambientLight intensity={10.0} />
          <hemisphereLight
            args={["#b1e1ff", "#3b3024", 0.6]}
            position={[-30, -10, 30]}
            intensity={100.8}
          />
          {/* <directionalLight position={[50, 200, 180]} intensity={0.2} /> */}
          <directionalLight
            position={[-250, -200, 200]}
            intensity={200.6}
            color="#ffeebe"
          />

          <Suspense fallback={null}>
            {/* <Environment files="/moonrise.hdr" background={false} /> */}
            <Environment
              // files="/material/sundowner.hdr"
              files="/moonrise.hdr"
              background={false}
              environmentIntensity={ENVIRONMENT_INTENSITY}
            />

            <ApplyEnvironmentIntensity intensity={ENVIRONMENT_INTENSITY} />

            <group scale={0.2} position={[-55, 65, 0]}>
              <BoardControlModel controlRef={boardControlRef} />
            </group>

            <group scale={0.2} position={[-55, 55, 0]} rotation={[0, 0, 0]}>
              <LogoMotherboard2Model />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
