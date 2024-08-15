import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";

export default function Placeholder() {
  const groupRef = useRef<Group>(null);
  const innerBoxRef = useRef<Mesh>(null);
  const outerBoxRef = useRef<Mesh>(null);

  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    if (innerBoxRef.current) innerBoxRef.current.rotation.x = angle;
    if (outerBoxRef.current) outerBoxRef.current.rotation.x = -angle / 2;
    if (groupRef.current) groupRef.current.rotation.y = angle * 1.2;
  });

  return (
    <group ref={groupRef} scale={3}>
      <mesh ref={innerBoxRef}>
        <boxGeometry args={[10, 10, 10, 4, 4, 4]} />
        <meshBasicMaterial wireframe color={"blue"} depthTest={false} />
      </mesh>
      <mesh ref={outerBoxRef}>
        <boxGeometry args={[16, 16, 16, 4, 4, 4]} />
        <meshBasicMaterial wireframe color={"lightBlue"} depthTest={false} />
      </mesh>
    </group>
  );
}
