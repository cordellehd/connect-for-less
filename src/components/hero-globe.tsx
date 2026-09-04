import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GREEN = "#3ddc84";

function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function Globe() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => fibonacciSphere(90, 2.02), []);

  const arcs = useMemo(() => {
    const curves: THREE.Vector3[][] = [];
    for (let i = 0; i < 14; i++) {
      const a = nodes[(i * 7) % nodes.length]!;
      const b = nodes[(i * 23 + 11) % nodes.length]!;
      const mid = a.clone().add(b).multiplyScalar(0.5).setLength(2.9);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      curves.push(curve.getPoints(40));
    }
    return curves;
  }, [nodes]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (group.current) group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.15]}>
      <mesh>
        <sphereGeometry args={[1.98, 48, 48]} />
        <meshStandardMaterial
          color="#0b1a12"
          roughness={0.35}
          metalness={0.6}
          emissive={GREEN}
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.0, 32, 24]} />
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.18} />
      </mesh>

      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i % 9 === 0 ? 0.055 : 0.028, 10, 10]} />
          <meshBasicMaterial color={i % 9 === 0 ? "#a9ffd0" : GREEN} />
        </mesh>
      ))}

      {arcs.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive
            key={i}
            object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.5 }))}
          />
        );
      })}

      <mesh rotation={[Math.PI / 2.1, 0, 0.4]}>
        <torusGeometry args={[2.75, 0.012, 8, 128]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
        <torusGeometry args={[3.1, 0.008, 8, 128]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!ref.current) return;
    const tx = state.pointer.y * 0.25;
    const ty = state.pointer.x * 0.35;
    ref.current.rotation.x += (tx - ref.current.rotation.x) * (1 - Math.exp(-4 * dt));
    ref.current.rotation.y += (ty - ref.current.rotation.y) * (1 - Math.exp(-4 * dt));
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 7.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#d8fff0" />
      <pointLight position={[-5, -2, -4]} intensity={30} color={GREEN} distance={20} />
      <Environment>
        <Lightformer intensity={1.6} position={[0, 5, 2]} scale={[8, 8, 1]} />
        <Lightformer intensity={1} color={GREEN} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[14, 3, 1]} />
      </Environment>
      <Tilt>
        <Globe />
      </Tilt>
    </Canvas>
  );
}
