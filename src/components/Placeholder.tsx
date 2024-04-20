import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";

export default function Placeholder() {
  const groupRef = useRef<Group>(null);
  const innerBoxRef = useRef<Mesh>(null);
  const outerBoxRef = useRef<Mesh>(null);

  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    if (innerBoxRef.current) innerBoxRef.current.rotation.x = angle / 3;
    if (outerBoxRef.current) outerBoxRef.current.rotation.x = -angle / 6;
    if (groupRef.current) groupRef.current.rotation.y = angle / 4;
  });

  return (
    <group ref={groupRef} scale={3}>
      <mesh ref={innerBoxRef}>
        <boxGeometry args={[24, 24, 24, 4, 4, 4]} />
        <meshBasicMaterial wireframe color={"grey"} depthTest={false} />
      </mesh>
      <mesh ref={outerBoxRef}>
        <boxGeometry args={[36, 36, 36, 4, 4, 4]} />
        <meshBasicMaterial wireframe color={"darkgrey"} depthTest={false} />
      </mesh>
    </group>
  );
}
