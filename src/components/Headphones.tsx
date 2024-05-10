import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Headphones() {
  const { scene, nodes, materials } = useGLTF("/models/headphones.gltf");

  const lightGrey = new THREE.Color(0xd3d3d3);

  useLayoutEffect(() => {
    console.log("materials: ", materials);
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
      }
    });
  }, [scene]);

  useLayoutEffect(() => {
    Object.assign(materials["Black-1"], {
      color: lightGrey,
    });
    Object.assign(materials["Black-2"], {
      color: lightGrey,
    });
    Object.assign(materials["Black-2"], {
      color: lightGrey,
    });
  }, [scene, nodes, materials]);

  return <primitive object={scene} />;
}
