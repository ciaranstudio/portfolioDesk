import { useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { Mesh } from "three";

export const Gramps = () => {
  const { scene, nodes, materials } = useGLTF("./gramps.gltf");

  const blackTexture = [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_black.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
  ];

  const [map, normalMap, roughnessMap, metalnessMap] = useTexture(blackTexture);

  useLayoutEffect(() => {
    console.log("materials: ", materials);
    Object.assign(materials.Material, {
      map: map,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
    });
  }, [scene, nodes, materials, map, normalMap, roughnessMap, metalnessMap]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      console.log("o: ", o);
      if ((o as Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
