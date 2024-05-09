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
import * as THREE from "three";

// const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

export const App = () => {
  const loadingToast = toast;
  const urlToast = toast;

  const toastDuration = 10000;
  const toastFontSize = "0.8rem";
  const toastBackground = "lightGrey";
  const toastColor = "#212121";

  const objectPositions = {
    headphones: new THREE.Vector3(-0.675, 0.431, 0),
    van: new THREE.Vector3(-0.6, 0.175, 0.35),
    sphere: new THREE.Vector3(-0.295, 0.265, 0.51),
    laptop: new THREE.Vector3(0, 0.0475, 0),
    pen: new THREE.Vector3(0.325, 0.18265, 0.425),
    stool: new THREE.Vector3(0.57, 0.176, 0.4),
    phone: new THREE.Vector3(0.775, 0.18195, 0.175),
    mug: new THREE.Vector3(0.7, 0.1335, -0.1),
    desk: new THREE.Vector3(0, 0, 0),
  };

  // const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [appLoaded, setAppLoaded] = useState(false);
  const [url, setUrl] = useState("");
  const [height, setHeight] = useState("100dvh");
  const [dpr, setDpr] = useState(0);
  const [zoomLevelWebkit, setZoomLevelWebkit] = useState(0);
  const [roundedZoomWebkit, setRoundedZoomWebkit] = useState(0);
  const [zoomLevelClient, setZoomLevelClient] = useState("");
  const [roundedDpr, setRoundedDpr] = useState(0);
  const [hovered, hover] = useState(false);

  const { loaded, progress } = useProgress();
  useCursor(hovered);

  const handleObjectClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    console.log("e: ", e);
    // setUrl("https://partlist-e9fc0.web.app/admin");
  };

  const handleUrlToastClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    toast.dismiss("instructionsToast1");
    toast.dismiss("instructionsToast2");
    if (url === "https://elibuildslite.web.app") {
      window.open("https://elibuilds-998b8.web.app", "_blank", "noreferrer");
    } else window.open(url, "_blank", "noreferrer");
  };

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

  // Partial fix for Html component position issue on Chrome and Safari browsers (CSS 3D transform position bug)
  useEffect(() => {
    const dpr = window.devicePixelRatio;
    setDpr(dpr);

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
      const zoomWebkit = ((window.outerWidth - 10) / window.innerWidth) * 100;
      const roundedZoomWebkit = Math.round(zoomWebkit);
      const zoomClient =
        document.body.clientWidth + "px x " + document.body.clientHeight + "px";
      const roundedDpr = Math.round(window.devicePixelRatio);
      // const zoomIE = (window.document.body.style.zoom =
      //   screen.logicalXDPI / screen.deviceXDPI);
      // https://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers/5078596#5078596

      // https://stackoverflow.com/questions/21093570/force-page-zoom-at-100-with-js
      setZoomLevelWebkit(zoomWebkit);
      setRoundedZoomWebkit(roundedZoomWebkit);
      setZoomLevelClient(zoomClient);
      setRoundedDpr(roundedDpr);
      console.log("zoomLevelWebkit: ", zoomWebkit);
      console.log("zoomLevelClient: ", zoomClient);
      console.log("zoomLevelDpr: ", roundedDpr);
      setHeight("100dvh)");
      measureCanvasHeight();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // original suggested fix for Html position issue on Safari mobile for reference (modified above)
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

  // Loading in progress toast
  useEffect(() => {
    loadingToast.loading("Loading...", {
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

  // Welcome toast / instructions for how to use site on initial load
  useEffect(() => {
    console.log("loaded: ", loaded);
    console.log("progress: ", progress);
    if (loaded === 32 && progress === 100) {
      window.document.body.style.cursor = "auto";
      setAppLoaded(true);
      loadingToast.success("Welcome!", {
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
        id: "instructionsToast1",
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
      toast("Tap items to show projects", {
        id: "instructionsToast2",
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

  useEffect(() => {
    if (appLoaded)
      urlToast(
        (_t) => (
          <button
            style={{
              padding: "0",
              margin: "0",
              fontSize: toastFontSize,
              background: "#ffffff",
              color: toastColor,
              fontFamily: "var(--leva-fonts-mono)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleUrlToastClick}
          >
            Click here to open project
          </button>
        ),
        {
          id: "urlToast",
          duration: Infinity,
          position: "top-center",
          style: {
            fontSize: toastFontSize,
            background: "#ffffff",
            color: toastColor,
          },
          className: "url-toast",
          // Custom Icon
          icon: (
            <button
              style={{
                padding: "0",
                margin: "0",
                fontSize: toastFontSize,
                background: toastBackground,
                color: toastColor,
                fontFamily: "var(--leva-fonts-mono)",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleUrlToastClick}
            >
              ➡️
            </button>
          ),
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        },
      );
  }, [url]);

  useEffect(() => {
    console.log("zoomLevelWebkit: ", zoomLevelWebkit);
    console.log("roundedZoomWebkit: ", roundedZoomWebkit);
    console.log("zoomLevelClient: ", zoomLevelClient);
    console.log("roundedDpr: ", roundedDpr);
    if (roundedZoomWebkit >= 99) {
      console.log("webkit zoom (rounded) < 99 so refresh");
      if (canvasRef.current) {
        console.log(canvasRef.current);
        console.log(canvasRef.current.style);
        canvasRef.current.style.height = "100svh";
      }
    }
  }, [zoomLevelWebkit, roundedZoomWebkit, zoomLevelClient, roundedDpr]);

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
            {/* Desk and objects */}
            <group>
              <directionalLight
                castShadow
                position={[1, 10, 5]}
                intensity={3}
              />
              {/* Mug */}
              <mesh
                position={objectPositions.mug}
                scale={0.15}
                rotation={[0, 0, 0]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Mug />
              </mesh>
              {/* Pen */}
              <mesh
                position={objectPositions.pen}
                scale={0.08}
                rotation={[Math.PI / 2, 0, -Math.PI / 1.5]}
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("https://partlist-e9fc0.web.app/admin");
                  handleObjectClick(e);
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Pen />
              </mesh>
              {/* Headphones */}
              <mesh
                position={objectPositions.headphones}
                scale={0.2}
                rotation={[Math.PI / 2.235, Math.PI / 34, Math.PI / 1.25]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <Headphones />
              </mesh>
              {/* iPhone */}
              <mesh
                position={objectPositions.phone}
                scale={0.08}
                rotation={[Math.PI / 2, 0, Math.PI / 2 + Math.PI / 6]}
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
              {/* Distorted sphere */}
              <mesh
                visible={true}
                position={objectPositions.sphere}
                scale={0.0125}
                castShadow
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("https://partlist-e9fc0.web.app/debug");
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
              {/* Laptop */}
              <mesh scale={0.3} position={objectPositions.laptop}>
                <Laptop dpr={dpr} url={url} />
              </mesh>
              {/* Van */}
              <mesh
                scale={0.1}
                position={objectPositions.van}
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
              {/* Stool (Gramps model) */}
              <mesh
                scale={0.4}
                position={objectPositions.stool}
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
              {/* Desk */}
              <mesh
                position={objectPositions.desk}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <Desk />
              </mesh>
            </group>
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={dpr > 2 ? false : true}
          enableRotate={dpr > 2 ? false : true}
          rotateSpeed={0.65}
          minAzimuthAngle={-Math.PI / 6.5}
          maxAzimuthAngle={Math.PI / 6.5}
          maxPolarAngle={Math.PI / 2.3}
          maxZoom={610}
          minZoom={200}
          dampingFactor={0.9}
          enableDamping={true}
          target={[0, 0.35, 0]}
        />
      </Canvas>
    </>
  );
};
