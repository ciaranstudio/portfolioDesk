// import * as React from "react";
// import { useState } from "react";
// import * as THREE from "three";
import {
  useGLTF,
  // Html
} from "@react-three/drei";
// import { Suspense } from "react";

export default function Phone() {
  //   const [urlInput, setUrlInput] = useState(url);

  // from market.pmnd.rs
  const model = useGLTF("/phone.gltf");

  return (
    <primitive object={model.scene}>
      {/* <Html
        zIndexRange={[1000000, 0]}
        wrapperClass={iFrameWrapperClass}
        position={[0.17, 1.33, 0.091]}
        distanceFactor={1.28}
        transform
        occlude
      >
        <Suspense fallback={<div className="text-lg">LOADING...</div>}>
          <iframe src={wikiURL} title="ePhone screen" seamless />
        </Suspense>
      </Html> */}
    </primitive>
  );
}
