import { isSafari } from "react-device-detect";
import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  // CameraControls,
  Stage,
  OrbitControls,
  // PresentationControls,
  // Html
} from "@react-three/drei";
import Phone from "./Phone";
import Desk from "./Desk";
import Laptop from "./Laptop";
import Van from "./Van";

// const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

export const App = () => {
  // const laptop = useRef<THREE.Group>(null);
  // const [urlInput, setUrlInput] = useState("");
  // const ref = useRef(null);
  const [height, setHeight] = useState("100dvh");
  const [dpr, setDpr] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.getElementById("footer")!.innerHTML =
      `dpr: ${window.devicePixelRatio}`;
    setDpr(window.devicePixelRatio);
    if (window.devicePixelRatio >= 3) {
      document.getElementById("footer")!.style.color = "red";
    }
    const measureCanvasHeight = () => {
      let canvasElement = null;
      let canvasHeight = 0;

      if (canvasRef.current) {
        canvasElement = canvasRef.current;
        canvasHeight = canvasElement.clientHeight;
        document.getElementById("footer")!.innerHTML +=
          `  canvas height is ${canvasHeight}px`;
        // if (isSafari && canvasHeight % 2 !== 0)
        if (canvasHeight % 2 !== 0) {
          document.getElementById("footer")!.innerHTML +=
            `  changing height from ${canvasHeight} to ${Math.round(canvasHeight - 1)}px`;
          setHeight(`Math.round(${canvasHeight - 1})px`);
          // setHeight(`${canvasHeight - 1}px`);
          console.log("reducing canvasHight by 1px");
        }

        console.log("isSafari: ", isSafari);
        console.log("canvasElement: ", canvasElement);
        console.log("canvasHeight: ", canvasHeight);
      }
    };

    window.requestAnimationFrame(measureCanvasHeight);
    const handleResize = () => {
      setHeight("100dvh)");
      measureCanvasHeight();
    };

    // if (!isMobile && isSafari) {
    //   window.addEventListener("resize", handleResize);
    //   return () => {
    //     window.removeEventListener("resize", handleResize);
    //   };
    // }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
            intensity={1}
            environment="city"
          >
            <group>
              <directionalLight position={[1, 10, 3]} intensity={3} />
              <mesh
                position={[0.55, 0.1875, 0.5]}
                scale={0.08}
                rotation={[Math.PI / 2, 0, Math.PI + Math.PI / 16]}
              >
                <Phone />
              </mesh>
              <mesh scale={0.3} position={[0, 0.04, 0]}>
                <Laptop dpr={dpr} />
              </mesh>
              <mesh rotation={[0, -Math.PI / 2, 0]}>
                <Desk />
              </mesh>
              <mesh
                scale={0.1}
                position={[-0.5875, 0.175, 0.35]}
                rotation={[0, Math.PI / 6, 0]}
              >
                <Van />
              </mesh>
            </group>
          </Stage>
        </Suspense>
        {/* <CameraControls /> */}
        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={false}
          enableRotate={dpr > 2 ? false : true}
          maxDistance={3}
          minDistance={1.25} // 1.65 on 04/11/2024 // before 04/11/2024 1.75 good on iphone xr portrait // 1.375 // 60
          maxPolarAngle={Math.PI * 2}
          enableDamping={true}
          // autoRotate
          // autoRotateSpeed={0.8}
          target={[0, 0.35, 0]}
        />
      </Canvas>
    </>
  );
};
