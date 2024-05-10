import { useGLTF, Html } from "@react-three/drei";
import { Suspense, useLayoutEffect } from "react";
import { Mesh } from "three";

export interface LaptopProps {
  dpr: number;
  url: string;
}

export default function Laptop(props: LaptopProps) {
  const { scene } = useGLTF("/models/laptop.gltf");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if ((o as Mesh).isMesh) {
        o.castShadow = true;
      }
    });
  }, []);

  return (
    <primitive object={scene}>
      <Html
        center={props.dpr > 2 ? true : false}
        occlude={props.dpr > 2 ? false : true}
        transform={props.dpr > 2 ? false : true}
        wrapperClass="htmlScreen"
        distanceFactor={props.dpr > 2 ? 0.00088 : 1.17}
        position={props.dpr > 2 ? [0, 1.54, -1.4] : [0, 1.54, -1.4]}
        rotation-x={props.dpr > 2 ? 0 : -0.256}
      >
        <Suspense fallback={<div className="text-lg">loading...</div>}>
          <iframe src={props.url} title="laptop screen" seamless />
        </Suspense>
      </Html>
    </primitive>
  );
}
