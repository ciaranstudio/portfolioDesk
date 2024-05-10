import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Headphones() {
  const {
    scene,
    // nodes,
    // materials
  } = useGLTF("/headphones.gltf");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        // console.log("o: ", o);
        o.castShadow = true;
      }
    });
  }, [scene]);

  // useLayoutEffect(() => {
  //   console.log("materials: ", materials);
  //   // Object.assign(materials.Material, {
  //   //   color: new THREE.Color(0xffffff),
  //   // });
  // }, [materials]);

  return <primitive object={scene} />;
}
