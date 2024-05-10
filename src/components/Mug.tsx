import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Mug() {
  const { scene, nodes, materials } = useGLTF("/models/mug.gltf");

  const lightGrey = new THREE.Color(0xd3d3d3);

  useLayoutEffect(() => {
    console.log("materials: ", materials);
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
      }
    });
  }, []);

  useLayoutEffect(() => {
    Object.assign(materials["Material.002"], {
      color: lightGrey,
    });
  }, [scene, nodes, materials]);

  return <primitive object={scene} />;
}
