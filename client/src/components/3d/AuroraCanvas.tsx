import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AuroraMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
      meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <meshBasicMaterial transparent opacity={0.12} wireframe color="#3B82F6" />
    </mesh>
  );
}

export const AuroraCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <AuroraMesh />
      </Canvas>
    </div>
  );
};

export default AuroraCanvas;
