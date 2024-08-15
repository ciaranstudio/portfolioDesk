/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Ch33_Belt: THREE.SkinnedMesh;
    Ch33_Body: THREE.SkinnedMesh;
    Ch33_Eyelashes: THREE.SkinnedMesh;
    Ch33_Hair: THREE.SkinnedMesh;
    Ch33_Pants: THREE.SkinnedMesh;
    Ch33_Shirt: THREE.SkinnedMesh;
    Ch33_Shoes: THREE.SkinnedMesh;
    Ch33_Suit: THREE.SkinnedMesh;
    Ch33_Tie: THREE.SkinnedMesh;
    mixamorig7Hips: THREE.Bone;
  };
  materials: {
    Ch33_body: THREE.MeshPhysicalMaterial;
    Ch33_hair: THREE.MeshPhysicalMaterial;
  };
};

type ActionName = "Armature|mixamo.com|Layer0";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
interface MyGLTFResult extends GLTFResult {
  animations: GLTFAction[];
}

interface ISuitProps {
  isTouchScreen: boolean;
  selected: string;
}

export default function Suit(props: ISuitProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/models/joe$@idle.glb",
  ) as MyGLTFResult;
  const { actions } = useAnimations<GLTFAction>(animations, group);
  //   useLayoutEffect(() => {
  //     scene.traverse((o) => {
  //       if ((o as THREE.Mesh).isMesh) {
  //         o.castShadow = true;
  //       }
  //     });
  //   }, []);
  useEffect(() => {
    if (props.selected === "suit") {
      actions["Armature|mixamo.com|Layer0"]?.play();
    } else {
      actions["Armature|mixamo.com|Layer0"]?.stop();
    }
  }, [props.selected]);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Ch33_Belt"
            geometry={nodes.Ch33_Belt.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Belt.skeleton}
          />
          <skinnedMesh
            name="Ch33_Body"
            geometry={nodes.Ch33_Body.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Body.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Ch33_Eyelashes"
            geometry={nodes.Ch33_Eyelashes.geometry}
            material={materials.Ch33_hair}
            skeleton={nodes.Ch33_Eyelashes.skeleton}
          />
          <skinnedMesh
            name="Ch33_Hair"
            geometry={nodes.Ch33_Hair.geometry}
            material={materials.Ch33_hair}
            skeleton={nodes.Ch33_Hair.skeleton}
          />
          <skinnedMesh
            name="Ch33_Pants"
            geometry={nodes.Ch33_Pants.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Pants.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Ch33_Shirt"
            geometry={nodes.Ch33_Shirt.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Shirt.skeleton}
          />
          <skinnedMesh
            name="Ch33_Shoes"
            geometry={nodes.Ch33_Shoes.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Shoes.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Ch33_Suit"
            geometry={nodes.Ch33_Suit.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Suit.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Ch33_Tie"
            geometry={nodes.Ch33_Tie.geometry}
            material={materials.Ch33_body}
            skeleton={nodes.Ch33_Tie.skeleton}
          />
          <primitive object={nodes.mixamorig7Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/joe$@idle.glb");