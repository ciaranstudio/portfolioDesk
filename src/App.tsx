import { isMobile } from "react-device-detect";
// import { isMobile, isSafari } from "react-device-detect";
import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  Stage,
  OrbitControls,
  MeshDistortMaterial,
  useCursor,
  useProgress,
} from "@react-three/drei";
import toast, { Toaster } from "react-hot-toast";
// import Phone from "./components/Phone";
import Desk from "./components/Desk";
import Laptop from "./components/Laptop";
import Van from "./components/Van";
import Gramps from "./components/Gramps";
import Placeholder from "./components/Placeholder";
import Pen from "./components/Pen";
import Mug from "./components/Mug";
import Headphones from "./components/Headphones";
import * as THREE from "three";
import RingCircle from "./components/RingCircle";

// const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

const PROJECT_MAP: Record<string, any> = {
  van: "GardenCenter",
  sphere: "PartList (debug)",
  pen: "PartList (admin)",
  stool: "EliBuilds",
};

const TOAST_DURATION = 10000;
const TOAST_FONT_SIZE = "0.8rem";
const TOAST_BACKGROUND = "white";
const TOAST_COLOR = "#212121";

const OBJECT_POSITIONS = {
  headphones: new THREE.Vector3(-0.675, 0.431, 0),
  van: new THREE.Vector3(-0.6, 0.176, 0.415),
  sphere: new THREE.Vector3(-0.175, 0.275, 0.45),
  laptop: new THREE.Vector3(0, 0.0475, 0),
  pen: new THREE.Vector3(0.175, 0.18265, 0.475),
  stool: new THREE.Vector3(0.585, 0.176, 0.425),
  // phone: new THREE.Vector3(0.775, 0.18195, 0.175),
  mug: new THREE.Vector3(0.715, 0.1335, -0.1275),
  desk: new THREE.Vector3(0, 0, 0),
};

export const App = () => {
  // toasts
  const loadingToast = toast;
  const urlToast = toast;

  // useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useState
  const [hovered, hover] = useState(false);
  const [selected, setSelected] = useState("");
  const [url, setUrl] = useState("");

  const [height, setHeight] = useState("100dvh");
  const [dpr, setDpr] = useState(0);

  const [_zoomLevelWebkit, setZoomLevelWebkit] = useState(0);
  const [roundedZoomWebkit, setRoundedZoomWebkit] = useState(0);
  const [_zoomLevelClient, setZoomLevelClient] = useState("");
  const [_roundedDpr, setRoundedDpr] = useState(0);

  const [appLoaded, setAppLoaded] = useState(false);
  const { loaded, progress } = useProgress();
  useCursor(hovered);

  // useEffect
  // Prevent swipe back navigation gesture on iOS mobile devices
  useEffect(() => {
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
  // Original suggested fix for Html position issue on Safari mobile for reference (modified above)
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

  // If view is zoomed in / resized during experience, update height to 100 svh
  useEffect(() => {
    // console.log("zoomLevelWebkit: ", zoomLevelWebkit);
    // console.log("roundedZoomWebkit: ", roundedZoomWebkit);
    // console.log("zoomLevelClient: ", zoomLevelClient);
    // console.log("roundedDpr: ", roundedDpr);
    if (roundedZoomWebkit >= 99) {
      // console.log("webkit zoom (rounded) < 99 so refresh");
      if (canvasRef.current) {
        // console.log(canvasRef.current);
        // console.log(canvasRef.current.style);
        canvasRef.current.style.height = "100svh";
      }
    }
  }, [roundedZoomWebkit]);

  // Loading toast
  useEffect(() => {
    loadingToast.loading("Loading...", {
      id: "loadingToast",
      position: "bottom-right",
      style: {
        fontSize: TOAST_FONT_SIZE,
        background: TOAST_BACKGROUND,
        color: TOAST_COLOR,
        fontFamily: "var(--leva-fonts-mono)",
        borderTop: "0.1rem solid #e0e0e0,",
      },
    });
  }, []);

  // Welcome toast / instructions for how to use site on initial load
  useEffect(() => {
    console.log("loaded: ", loaded);
    console.log("progress: ", progress);
    if (loaded === 28 && progress === 100) {
      window.document.body.style.cursor = "auto";
      setAppLoaded(true);
      loadingToast.success("Welcome!", {
        id: "loadingToast",
        position: "bottom-right",
        style: {
          fontSize: TOAST_FONT_SIZE,
          background: TOAST_BACKGROUND,
          color: TOAST_COLOR,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
      toast("Tap items to show projects", {
        id: "instructionsToast1",
        duration: TOAST_DURATION,
        position: isMobile ? "bottom-center" : "bottom-center",
        style: {
          fontSize: TOAST_FONT_SIZE,
          background: TOAST_BACKGROUND,
          color: TOAST_COLOR,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
    }
  }, [progress]);

  // Click to open project url toast on url change
  useEffect(() => {
    if (appLoaded)
      urlToast(
        (_t) => (
          <span onClick={handleUrlToastClick}>
            <button
              style={{
                padding: "2",
                margin: "0",
                fontSize: TOAST_FONT_SIZE,
                background: TOAST_BACKGROUND,
                color: TOAST_COLOR,
                fontFamily: "var(--leva-fonts-mono)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Click <u style={{ color: "#757575" }}>here</u> to open{" "}
              {PROJECT_MAP[selected]}
            </button>
          </span>
        ),
        {
          id: "urlToast",
          duration: Infinity,
          position: isMobile ? "bottom-center" : "bottom-center",
          style: {
            fontSize: TOAST_FONT_SIZE,
            background: "#ffffff",
            color: TOAST_COLOR,
          },
          className: "url-toast",
          icon: (
            <button
              style={{
                padding: "2",
                paddingRight: "0",
                margin: "0",
                fontSize: TOAST_FONT_SIZE,
                background: "#ffffff",
                color: TOAST_COLOR,
                fontFamily: "var(--leva-fonts-mono)",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleUrlToastClick}
            >
              ➡️
            </button>
          ),
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

  // click handlers / functions
  const handleObjectClick = (
    e: ThreeEvent<MouseEvent>,
    selected: React.SetStateAction<string> | string,
    url: React.SetStateAction<string> | string,
  ) => {
    e.stopPropagation();
    console.log("e: ", e);
    setUrl(url);
    setSelected(selected);
    // const { eventObject } = e;
    // const tempObjectPosition = eventObject.position;
    // console.log("tempObjectPosition: ", tempObjectPosition);
    // const positionMatch = (element: { x: number; y: number; z: number }) =>
    //   element.x === tempObjectPosition.x &&
    //   element.y === tempObjectPosition.y &&
    //   element.z === tempObjectPosition.z;
    // // for (const property in OBJECT_POSITIONS) {
    // if (positionMatch(OBJECT_POSITIONS.van)) {
    //   setSelected("van");
    // }
    // if (positionMatch(OBJECT_POSITIONS.sphere)) {
    //   setSelected("sphere");
    // }
    // if (positionMatch(OBJECT_POSITIONS.pen)) {
    //   setSelected("pen");
    // }
    // if (positionMatch(OBJECT_POSITIONS.stool)) {
    //   setSelected("stool");
    // }
    // }

    // if (positionMatch) {
    //   // console.log(
    //   //   "shopItems.find(positionMatch): ",
    //   //   shopItems.find(positionMatch),
    //   // );
    //   const matchedItem = OBJECT_POSITIONS.find(positionMatch);
    //   // console.log("matchedItem from handleClick function: ", matchedItem);
    // }
  };

  const handleUrlToastClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    toast.dismiss("instructionsToast1");
    if (url === "https://elibuildslite.web.app") {
      window.open("https://elibuilds-998b8.web.app", "_blank", "noreferrer");
    } else window.open(url, "_blank", "noreferrer");
  };

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
                position={OBJECT_POSITIONS.mug}
                scale={0.15}
                rotation={[0, 0, 0]}
                // onPointerOver={() => hover(true)}
                // onPointerOut={() => hover(false)}
              >
                <Mug />
              </mesh>

              {/* Pen */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(
                    e,
                    "pen",
                    "https://partlist-e9fc0.web.app/admin",
                  );
                }}
              >
                <mesh
                  position={OBJECT_POSITIONS.pen}
                  scale={0.115}
                  rotation={[Math.PI / 2, 0, -Math.PI / 1.5]}
                >
                  <Pen />
                </mesh>
                <RingCircle
                  position={OBJECT_POSITIONS.pen}
                  selected={selected === "pen"}
                />
              </group>

              {/* Headphones */}
              <mesh
                position={OBJECT_POSITIONS.headphones}
                scale={0.2}
                rotation={[Math.PI / 2.235, Math.PI / 34, Math.PI / 1.25]}
                // onPointerOver={() => hover(true)}
                // onPointerOut={() => hover(false)}
              >
                <Headphones />
              </mesh>

              {/* iPhone */}
              {/* <mesh
                position={OBJECT_POSITIONS.phone}
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
              </mesh> */}

              {/* Distorted sphere */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(
                    e,
                    "sphere",
                    "https://partlist-e9fc0.web.app/debug",
                  );
                }}
              >
                <mesh
                  visible={true}
                  position={OBJECT_POSITIONS.sphere}
                  scale={0.0185}
                  castShadow
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
                <RingCircle
                  position={[
                    OBJECT_POSITIONS.sphere.x,
                    OBJECT_POSITIONS.sphere.y - 0.09925,
                    OBJECT_POSITIONS.sphere.z,
                  ]}
                  selected={selected === "sphere"}
                />
              </group>

              {/* Laptop */}
              <mesh scale={0.3} position={OBJECT_POSITIONS.laptop}>
                <Laptop dpr={dpr} url={url} />
              </mesh>

              {/* Van */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(
                    e,
                    "van",
                    "https://gardencenter-c902f.web.app",
                  );
                }}
              >
                <mesh
                  scale={0.115}
                  position={OBJECT_POSITIONS.van}
                  rotation={[0, Math.PI / 6, 0]}
                >
                  <Van />
                </mesh>
                <RingCircle
                  position={OBJECT_POSITIONS.van}
                  selected={selected === "van"}
                />
              </group>

              {/* Stool (Gramps model) */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(
                    e,
                    "stool",
                    "https://elibuildslite.web.app",
                  );
                }}
              >
                <mesh
                  scale={0.44}
                  position={OBJECT_POSITIONS.stool}
                  rotation={[0, Math.PI / 8, 0]}
                >
                  <Gramps />
                </mesh>
                <RingCircle
                  position={OBJECT_POSITIONS.stool}
                  selected={selected === "stool"}
                />
              </group>

              {/* Desk */}
              <mesh
                position={OBJECT_POSITIONS.desk}
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
