// import { isMobile, isSafari } from "react-device-detect";
import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Stage,
  OrbitControls,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import Phone from "./Phone";
import Desk from "./Desk";
import Laptop from "./Laptop";
import Van from "./Van";
import { Gramps } from "./Gramps";

// const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

export const App = () => {
  // const laptop = useRef<THREE.Group>(null);
  const [url, setUrl] = useState("https://gardencenter-c902f.web.app");
  // const ref = useRef(null);
  const [height, setHeight] = useState("100dvh");
  const [dpr, setDpr] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useEffect(() => {
    // document.getElementById("footer")!.innerHTML =
    //   `dpr: ${window.devicePixelRatio}`;
    setDpr(window.devicePixelRatio);
    // if (window.devicePixelRatio >= 3) {
    //   document.getElementById("footer")!.style.color = "red";
    // }
    const measureCanvasHeight = () => {
      let canvasElement = null;
      let canvasHeight = 0;

      if (canvasRef.current) {
        canvasElement = canvasRef.current;
        canvasHeight = canvasElement.clientHeight;
        // document.getElementById("footer")!.innerHTML +=
        //   `  canvas height is ${canvasHeight}px`;
        // if (isSafari && canvasHeight % 2 !== 0)
        if (canvasHeight % 2 !== 0) {
          // document.getElementById("footer")!.innerHTML +=
          //   `  changing height from ${canvasHeight} to ${Math.round(canvasHeight - 1)}px`;
          setHeight(`Math.round(${canvasHeight - 1})px`);
          // setHeight(`${canvasHeight - 1}px`);
          console.log("reducing canvasHight by 1px");
        }
        // console.log("isSafari: ", isSafari);
        // console.log("canvasElement: ", canvasElement);
        // console.log("canvasHeight: ", canvasHeight);
      }
    };
    // if (!isMobile && isSafari) {
    window.requestAnimationFrame(measureCanvasHeight);
    const handleResize = () => {
      setHeight("100dvh)");
      measureCanvasHeight();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // }
  }, []);

  return (
    <>
      <Canvas
        ref={canvasRef}
        style={{ height: height }}
        className="r3f"
        shadows
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 1, 3] }}
        eventSource={document.getElementById("root")!}
        eventPrefix="client"
      >
        <color attach="background" args={["#f0f0f0"]} />
        <Suspense fallback={null}>
          <Stage
            // controls={ref}
            preset="rembrandt"
            intensity={0.15}
            environment="city"
            shadows="contact"
          >
            <group>
              <directionalLight
                castShadow
                position={[1, 10, 3]}
                intensity={3}
              />
              <mesh
                visible={true}
                position={[-0.56, 0.235, 0]}
                scale={0.01}
                castShadow
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("https://partlist-e9fc0.web.app");
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <sphereGeometry
                  args={[6, 64, 64, 0, Math.PI * 2, 0, Math.PI]}
                />
                <MeshDistortMaterial
                  distort={0.4}
                  speed={2}
                  color="#aaaaaa"
                  depthTest={true}
                  flatShading={true}
                />
              </mesh>
              <mesh
                position={[0.62, 0.1875, 0.15]}
                scale={0.08}
                rotation={[Math.PI / 2, 0, -Math.PI - Math.PI / 16]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Phone />
              </mesh>
              <mesh scale={0.3} position={[0, 0.04, 0]}>
                <Laptop dpr={dpr} url={url} />
              </mesh>
              <mesh rotation={[0, -Math.PI / 2, 0]}>
                <Desk />
              </mesh>
              <mesh
                scale={0.1}
                position={[-0.5875, 0.175, 0.35]}
                rotation={[0, Math.PI / 6, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("https://gardencenter-c902f.web.app");
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Van />
              </mesh>
              <mesh
                scale={0.4}
                position={[0.525, 0.175, 0.45]}
                rotation={[0, Math.PI / 6, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("https://elibuildslite.web.app");
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Gramps />
              </mesh>
            </group>
          </Stage>
        </Suspense>
        {/* <CameraControls /> */}
        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={dpr > 2 ? false : true}
          enableRotate={dpr > 2 ? false : true}
          maxPolarAngle={Math.PI / 2.3}
          enableDamping={true}
          target={[0, 0.35, 0]}
        />
      </Canvas>
    </>
  );
};
