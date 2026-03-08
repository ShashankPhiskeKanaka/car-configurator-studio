import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface CarModel3DProps {
  color?: string;
  modelType?: string;
}

function CarBody({ color = "#1a2744", modelType = "sedan" }: { color?: string; modelType?: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const bodyHeight = modelType === "suv" ? 0.9 : modelType === "sport" ? 0.55 : 0.65;
  const bodyLength = modelType === "coupe" ? 2.2 : 2.4;
  const cabinHeight = modelType === "suv" ? 0.7 : modelType === "sport" ? 0.45 : 0.55;
  const cabinOffset = modelType === "coupe" ? 0.15 : 0;

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {/* Main body */}
      <mesh position={[0, bodyHeight / 2, 0]} castShadow>
        <boxGeometry args={[bodyLength, bodyHeight, 1.1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cabin */}
      <mesh position={[cabinOffset, bodyHeight + cabinHeight / 2 - 0.05, 0]} castShadow>
        <boxGeometry args={[1.4, cabinHeight, 1.0]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Hood slope */}
      <mesh position={[-0.7, bodyHeight + 0.05, 0]} castShadow>
        <boxGeometry args={[0.8, 0.12, 1.05]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trunk */}
      <mesh position={[0.85, bodyHeight + 0.05, 0]} castShadow>
        <boxGeometry args={[0.6, 0.15, 1.05]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[-1.25, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.35, 1.15]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[1.25, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.35, 1.15]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Headlights */}
      {[-0.5, 0.5].map((z, i) => (
        <mesh key={`hl-${i}`} position={[-1.22, 0.45, z]}>
          <boxGeometry args={[0.08, 0.12, 0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Tail lights */}
      {[-0.45, 0.45].map((z, i) => (
        <mesh key={`tl-${i}`} position={[1.22, 0.45, z]}>
          <boxGeometry args={[0.08, 0.1, 0.25]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [-0.8, 0, 0.6],
        [-0.8, 0, -0.6],
        [0.8, 0, 0.6],
        [0.8, 0, -0.6],
      ].map((pos, i) => (
        <group key={`wheel-${i}`} position={pos as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
            <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 8]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Ground reflection glow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function CarModel3D({ color = "#1a2744", modelType = "sedan" }: CarModel3DProps) {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-3, 3, -3]} intensity={0.3} />
          <pointLight position={[0, 3, 0]} intensity={0.5} color="#88ccff" />

          <CarBody color={color} modelType={modelType} />

          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={8} blur={2} far={3} />
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
