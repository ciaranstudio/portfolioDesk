import { Edges, MeshWobbleMaterial } from "@react-three/drei";
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
      scale={props.selected ? 0.8 : 0.7}
      receiveShadow
      castShadow
    >
      <circleGeometry args={[0.2, 64]} />
      <MeshWobbleMaterial
        factor={0.00025}
        speed={props.selected ? 6 : 3}
        transparent
        opacity={props.selected ? 0.75 : 0.15}
        color={props.selected ? "azure" : "lightgrey"}
      />
      <Edges
        threshold={90}
        color={props.selected ? "black" : "grey"}
        visible={true}
      />
    </mesh>
  );
}
