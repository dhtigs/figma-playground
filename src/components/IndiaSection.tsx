import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import gatewayImg from "@/assets/gateway-india.png";

// Simple animated water plane
const Ocean = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(200, 100, 128, 64);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.15 + time * 0.8) * 0.3 + Math.cos(z * 0.2 + time * 0.6) * 0.2);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -2, 0]}>
      <meshStandardMaterial
        color="#1a6b8a"
        transparent
        opacity={0.85}
        metalness={0.6}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const SkyScene = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 5]} intensity={1.2} color="#ffd4a0" />
      <Sky
        distance={450000}
        sunPosition={[100, 20, -50]}
        inclination={0.52}
        azimuth={0.25}
        turbidity={3}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <Ocean />
    </>
  );
};

const IndiaSection = () => {
  return (
    <section className="relative w-full" style={{ height: "100vh" }}>
      {/* Three.js Canvas - sky and ocean */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 3, 30], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
        >
          <SkyScene />
        </Canvas>
      </div>

      {/* "With love from India" text in the sky area */}
      <div className="absolute top-[8%] left-0 right-0 z-10 flex justify-center">
        <h2
          className="font-handwriting text-foreground/90 text-[clamp(2rem,5vw,5rem)] drop-shadow-lg select-none"
          style={{
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          with love, from india 🇮🇳
        </h2>
      </div>

      {/* Gateway of India PNG overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <img
          src={gatewayImg}
          alt="Gateway of India"
          className="w-full max-w-[1400px] object-contain object-bottom"
          style={{ maxHeight: "65vh" }}
        />
      </div>

      {/* Gradient fade at bottom to blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default IndiaSection;
