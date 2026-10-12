import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { Mesh } from "three";

interface RotatingCubeProps {
  position?: [number, number, number];
}

function RotatingCube({ position = [0, 0, 0] }: RotatingCubeProps) {
  const meshRef = useRef<Mesh>(null);
  const textures = useTexture({
    color: "/material/color3.png",
    ao: "/material/ao.png",
    normal: "/material/normal2.png",
    roughness: "/material/roughness2.png",
    height: "/material/height3.png",
  });

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    const geometry = meshRef.current.geometry;
    if (geometry.attributes.uv && !geometry.attributes.uv2) {
      geometry.setAttribute("uv2", geometry.attributes.uv);
    }
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0; //here stop the rotation on the x-axis
      meshRef.current.rotation.y += 0.0005; // here stop the rotation on the y-axis
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={1.5}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial
        envMapIntensity={3}
        map={textures.color}
        aoMap={textures.ao}
        aoMapIntensity={1}
        normalMap={textures.normal}
        roughnessMap={textures.roughness}
        displacementMap={textures.height}
        displacementScale={-0.1}
        roughness={1}
        metalness={0.9}
      />
    </mesh>
  );
}

export function Scene3D_2() {
  return (
    <Canvas camera={{ position: [3, 1, 1] }}>
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={10} />
      <RotatingCube position={[0, 0, 0]} />
      <Environment files="/material/rosendal.hdr" background={false} />
    </Canvas>
  );
}
