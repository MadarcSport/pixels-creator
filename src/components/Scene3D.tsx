import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface RotatingCubeProps {
  position?: [number, number, number];
}

function RotatingCube({ position = [0, 0, 0] }: RotatingCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={1.5}>
      {/* <boxGeometry args={[1, 1, 1, 2, 2, 2]} /> */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="#d32e2e" wireframe={false} />
    </mesh>
  );
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[10, 10, 10]} intensity={8} />
      <RotatingCube position={[0, 0, 0]} />
    </Canvas>
  );
}
