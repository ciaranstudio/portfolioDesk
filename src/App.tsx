// import { isMobile, isSafari } from "react-device-detect";
import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Stage,
  OrbitControls,
  MeshDistortMaterial,
  useCursor,
  useProgress,
} from "@react-three/drei";
import toast, { Toaster } from "react-hot-toast";
import Phone from "./components/Phone";
import Desk from "./components/Desk";
import Laptop from "./components/Laptop";
import Van from "./components/Van";
import { Gramps } from "./components/Gramps";
import Placeholder from "./components/Placeholder";
import Pen from "./components/Pen";
import Mug from "./components/Mug";
import Headphones from "./components/Headphones";

// const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

export const App = () => {
  const toastId = toast;
  const toastDuration = 10000;
  const toastFontSize = "0.9rem";
  const toastBackground = "lightGrey";
  const toastColor = "#212121";

  // const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState("https://gardencenter-c902f.web.app");
  const [height, setHeight] = useState("100dvh");
  const [dpr, setDpr] = useState(0);
  const [hovered, hover] = useState(false);

  const { loaded, progress } = useProgress();
  useCursor(hovered);

  useEffect(() => {
    // prevent swipe back navigation gesture on iOS mobile devices
    const element = document.querySelector("canvas");
    if (element)
      element.addEventListener("touchstart", (e) => {
        // is not near edge of view, exit
        if (
          (e as unknown as Touch).pageX > 20 &&
          (e as unknown as Touch).pageX < window.innerWidth - 20
        )
          return;
        // prevent swipe to navigate gesture
        e.preventDefault();
      });

    return () => {
      if (element)
        element.removeEventListener("touchstart", (_e) => {
          // prevent swipe to navigate gesture
          console.log("removed event listener, 'touchstart'");
        });
    };
  }, []);

  useEffect(() => {
    setDpr(window.devicePixelRatio);

    const measureCanvasHeight = () => {
      let canvasElement = null;
      let canvasHeight = 0;

      if (canvasRef.current) {
        canvasElement = canvasRef.current;
        canvasHeight = canvasElement.clientHeight;
        if (canvasHeight % 2 !== 0) {
          setHeight(`Math.round(${canvasHeight - 1})px`);
          // setHeight(`${canvasHeight - 1}px`);
          console.log("reducing canvasHight by 1px");
        }
      }
    };
    window.requestAnimationFrame(measureCanvasHeight);

    const handleResize = () => {
      setHeight("100dvh)");
      measureCanvasHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // suggested fix for Html position issue on Safari mobile for reference (modified above)
  // https://github.com/pmndrs/drei/issues/720
  // useEffect(() => {
  //   const measureCanvasHeight = () => {
  //     const canvasElement = canvasRef.current;
  //     const canvasHeight = canvasElement.clientHeight;

  //     if (isSafari && canvasHeight % 2 !== 0) {
  //       setHeight(`${canvasHeight - 1}px`);
  //     }
  //   };

  //   window.requestAnimationFrame(measureCanvasHeight);
  //   const handleResize = () => {
  //     setHeight("100dvh)");
  //     measureCanvasHeight();
  //   };

  //   if (!isMobile && isSafari) {
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    toastId.loading("Loading...", {
      id: "loadingToast",
      position: "top-center",
      style: {
        fontSize: toastFontSize,
        background: toastBackground,
        color: toastColor,
        fontFamily: "var(--leva-fonts-mono)",
        borderTop: "0.1rem solid #e0e0e0,",
      },
    });
  }, []);

  useEffect(() => {
    console.log("loaded: ", loaded);
    if (loaded > 30 && progress === 100) {
      toastId.success("Welcome!", {
        id: "loadingToast",
        position: "top-center",
        style: {
          fontSize: toastFontSize,
          background: toastBackground,
          color: toastColor,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
      toast("Tap laptop screen to interact", {
        // id: toastId,
        duration: toastDuration,
        position: "bottom-center",
        style: {
          fontSize: toastFontSize,
          background: toastBackground,
          color: toastColor,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
      // toast("Double tap keyboard to open app", {
      //   // id: toastId,
      //   duration: toastDuration,
      //   position: "bottom-center",
      //   style: {
      //     fontSize: toastFontSize,
      //     background: toastBackground,
      //     color: toastColor,
      //     fontFamily: "var(--leva-fonts-mono)",
      //     borderTop: "0.1rem solid #e0e0e0,",
      //   },
      // });
      toast("Tap items to show projects", {
        // id: toastId,
        duration: toastDuration,
        position: "bottom-center",
        style: {
          fontSize: toastFontSize,
          background: toastBackground,
          color: toastColor,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
    }
  }, [progress]);

  return (
    <>
      <Toaster reverseOrder={true} />
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
        <Suspense fallback={<Placeholder />}>
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
                position={[1, 10, 5]}
                intensity={3}
              />
              <mesh
                position={[0.7, 0.1335, -0.1]}
                scale={0.15}
                rotation={[0, 0, 0]}
              >
                <Mug />
              </mesh>
              <mesh
                position={[0.775, 0.18195, 0.025]}
                scale={0.08}
                rotation={[Math.PI / 2, 0, -Math.PI / 1.15]}
              >
                <Pen />
              </mesh>
              <mesh
                position={[-0.675, 0.431, 0]}
                scale={0.2}
                rotation={[Math.PI / 2.235, Math.PI / 34, Math.PI / 1.25]}
              >
                <Headphones />
              </mesh>
              <mesh
                position={[0.375, 0.18265, 0.5]}
                scale={0.08}
                rotation={[Math.PI / 2, 0, Math.PI / 2 + Math.PI / 10]}
                onClick={(e) => {
                  e.stopPropagation();
                  const email = "ciaranstudio@icloud.com";
                  const subject = "Contact from portfolio";
                  // const emailBody = "";
                  document.location = "mailto:" + email + "?subject=" + subject;
                  // +
                  // "&body=" +
                  // emailBody;
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Phone />
              </mesh>
              <mesh
                visible={true}
                position={[-0.295, 0.265, 0.51]}
                scale={0.0125}
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
                  color="#757575"
                  depthTest={true}
                  flatShading={true}
                />
              </mesh>
              <mesh scale={0.3} position={[0, 0.0475, 0]}>
                <Laptop dpr={dpr} url={url} />
              </mesh>
              <mesh rotation={[0, -Math.PI / 2, 0]}>
                <Desk />
              </mesh>
              <mesh
                scale={0.1}
                position={[-0.6, 0.175, 0.35]}
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
                position={[0.57, 0.176, 0.4]}
                rotation={[0, Math.PI / 8, 0]}
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
        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={dpr > 2 ? false : true}
          enableRotate={dpr > 2 ? false : true}
          minAzimuthAngle={-Math.PI / 6.5}
          maxAzimuthAngle={Math.PI / 6.5}
          maxPolarAngle={Math.PI / 2.3}
          maxZoom={610}
          minZoom={200}
          enableDamping={true}
          target={[0, 0.35, 0]}
        />
      </Canvas>
    </>
  );
};
