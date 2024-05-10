import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "@react-three/fiber";

export interface RingCircleProps {
  position: THREE.Vector3;
  selected: boolean;
}

export default function RingCircle(props: {
  position: Vector3 | undefined;
  selected: boolean | undefined;
}) {
  return (
    <mesh
      position={props.position}
      rotation-x={-Math.PI / 2}
      rotation-y={0}
      // visible={selected}
      // depthTest={false}
    >
      <circleGeometry args={[0.2, 64]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        // color={"lightgrey"}
      />
      <Edges
        scale={props.selected ? 1 : 0.7}
        threshold={90}
        color={props.selected ? "darkblue" : "grey"}
        visible={true}
      />
    </mesh>
  );
}