import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Cube007: THREE.Mesh;
    Cube007_1: THREE.Mesh;
  };
  materials: {
    MetalBlack: THREE.MeshStandardMaterial;
    DeskWood: THREE.MeshStandardMaterial;
  };
};

export default function Desk(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF(
    "/models/desk.gltf",
  ) as unknown as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={1.43}>
        <mesh
          geometry={nodes.Cube007.geometry}
          material={materials.MetalBlack}
          material-color="white"
          receiveShadow
        />
        <mesh
          geometry={nodes.Cube007_1.geometry}
          material={materials.DeskWood}
          material-color="darkgrey"
          receiveShadow
        />
      </group>
    </group>
  );
}
