import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

export default function Phone() {
  const { scene } = useGLTF("/phone.gltf");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if ((o as Mesh).isMesh) {
        o.castShadow = true;
      }
    });
  }, []);

  return <primitive object={scene} />;
}
