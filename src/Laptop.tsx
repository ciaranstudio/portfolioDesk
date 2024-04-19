// import * as React from "react";
// import { useState } from "react";
// import * as THREE from "three";
import { useGLTF, Html } from "@react-three/drei";
import { Suspense } from "react";

export interface LaptopProps {
  dpr: number;
}

export default function Laptop(props: LaptopProps) {
  //   const [urlInput, setUrlInput] = useState(url);

  // from market.pmnd.rs
  const model = useGLTF("/laptop.gltf");

  return (
    <primitive object={model.scene}>
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
          <iframe
            src="https://gardencenter-c902f.web.app"
            title="laptop screen"
            seamless
          />
        </Suspense>
      </Html>
    </primitive>
  );
}
