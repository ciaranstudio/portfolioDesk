// import * as React from "react";
// import { useState } from "react";
// import * as THREE from "three";
import { useGLTF, Html } from "@react-three/drei";
import { Suspense } from "react";

export default function Laptop2() {
  //   const [urlInput, setUrlInput] = useState(url);

  // from market.pmnd.rs
  const model = useGLTF("/laptop.gltf");

  return (
    <primitive object={model.scene}>
      <Html
        occlude
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[0, 1.56, -1.4]}
        rotation-x={-0.256}
      >
        <Suspense fallback={<div className="text-lg">loading...</div>}>
          <iframe
            src="https://elibuildslite.web.app"
            title="laptop screen"
            seamless
          />
        </Suspense>
      </Html>
    </primitive>
  );
}
