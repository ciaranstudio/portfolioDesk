import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_wheel_frontLeft: THREE.Mesh;
    Mesh_wheel_frontLeft_1: THREE.Mesh;
    Mesh_body: THREE.Mesh;
    Mesh_body_1: THREE.Mesh;
    Mesh_body_2: THREE.Mesh;
    Mesh_body_3: THREE.Mesh;
    Mesh_body_4: THREE.Mesh;
    Mesh_body_5: THREE.Mesh;
  };
  materials: {
    carTire: THREE.MeshStandardMaterial;
    _defaultMat: THREE.MeshStandardMaterial;
    plastic: THREE.MeshStandardMaterial;
    paintBlue: THREE.MeshStandardMaterial;
    lightFront: THREE.MeshPhysicalMaterial;
    lightBack: THREE.MeshStandardMaterial;
    window: THREE.MeshStandardMaterial;
  };
};

export default function Van(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF(
    "/models/van.gltf",
  ) as unknown as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI, 0, Math.PI]} scale={1.2}>
        <group position={[-0.35, 0.3, 0.76]} scale={[-1, 1, 1]}>
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft.geometry}
            material={nodes.Mesh_wheel_frontLeft.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
            material={nodes.Mesh_wheel_frontLeft_1.material}
            castShadow
            receiveShadow
          />
        </group>
        <group position={[0.35, 0.3, 0.76]}>
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft.geometry}
            material={nodes.Mesh_wheel_frontLeft.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
            material={nodes.Mesh_wheel_frontLeft_1.material}
            castShadow
            receiveShadow
          />
        </group>
        <group position={[-0.35, 0.3, -0.76]} scale={[-1, 1, 1]}>
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft.geometry}
            material={nodes.Mesh_wheel_frontLeft.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
            material={nodes.Mesh_wheel_frontLeft_1.material}
            castShadow
            receiveShadow
          />
        </group>
        <group position={[0.35, 0.3, -0.76]}>
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft.geometry}
            material={nodes.Mesh_wheel_frontLeft.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
            material={nodes.Mesh_wheel_frontLeft_1.material}
            castShadow
            receiveShadow
          />
        </group>
        <group position={[0, 0.2, -0.1]}>
          <mesh
            geometry={nodes.Mesh_body.geometry}
            material={materials.plastic}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_body_1.geometry}
            material={materials.paintBlue}
            material-color="white"
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_body_2.geometry}
            material={materials.lightFront}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_body_3.geometry}
            material={nodes.Mesh_body_3.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_body_4.geometry}
            material={materials.lightBack}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Mesh_body_5.geometry}
            material={materials.window}
            material-color="black"
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}
