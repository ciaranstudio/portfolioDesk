import { isMobile } from "react-device-detect";
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
import Desk from "./components/Desk";
import Laptop from "./components/Laptop";
import Van from "./components/Van";
import Gramps from "./components/Gramps";
import Placeholder from "./components/Placeholder";
// import Pen from "./components/Pen";
import Suit from "./components/Suit";
import Mug from "./components/Mug";
import Headphones from "./components/Headphones";
import RingCircle from "./components/RingCircle";
import {
  LOADED_COUNT,
  TOAST,
  OBJECT_POSITIONS,
  PROJECT_MAP,
} from "./constants";

export const App = () => {
  // useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useState
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  const [hovered, hover] = useState(false);
  const [selected, setSelected] = useState("stool");
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

    // Check if using a touch control device, show/hide joystick
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchScreen(true);
    } else {
      setIsTouchScreen(false);
    }

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
      setZoomLevelWebkit(zoomWebkit);
      setRoundedZoomWebkit(roundedZoomWebkit);
      setZoomLevelClient(zoomClient);
      setRoundedDpr(roundedDpr);
      setHeight("100dvh)");
      measureCanvasHeight();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loading in progress toast
  useEffect(() => {
    toast.loading("Loading...", {
      id: "loadingToast",
      position: isMobile ? "bottom-center" : "bottom-center",
      style: {
        fontSize: TOAST.fontSize,
        background: TOAST.background,
        color: TOAST.color,
        fontFamily: "var(--leva-fonts-mono)",
        borderTop: "0.1rem solid #e0e0e0,",
      },
    });
  }, []);

  // If view is zoomed in / resized during experience then update height to 100 svh
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

  // Welcome toast, instructions for how to use site on initial load
  useEffect(() => {
    console.log("loaded: ", loaded);
    console.log("progress: ", progress);
    if (loaded === LOADED_COUNT && progress === 100) {
      window.document.body.style.cursor = "auto";
      setAppLoaded(true);
      setUrl("https://elibuildslite.web.app");
      toast.success("Welcome!", {
        id: "loadingToast",
        position: isMobile ? "bottom-center" : "bottom-center",
        style: {
          fontSize: TOAST.fontSize,
          background: TOAST.background,
          color: TOAST.color,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
      toast("Tap items to show projects", {
        id: "instructionsToast1",
        duration: TOAST.duration,
        position: isMobile ? "top-center" : "top-center",
        style: {
          fontSize: TOAST.fontSize,
          background: TOAST.background,
          color: TOAST.color,
          fontFamily: "var(--leva-fonts-mono)",
          borderTop: "0.1rem solid #e0e0e0,",
        },
      });
    }
  }, [progress]);

  // Click to open project url toast
  useEffect(() => {
    if (appLoaded)
      toast(
        (_t) => (
          <span onClick={handleUrlToastClick}>
            <button
              style={{
                padding: "2",
                margin: "0",
                fontSize: TOAST.fontSize,
                background: TOAST.background,
                color: TOAST.color,
                fontFamily: "var(--leva-fonts-mono)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Click <u style={{ color: "#757575" }}>here</u> to open{" "}
              <b style={{ color: "#757575" }}>{PROJECT_MAP[selected]}</b>
            </button>
          </span>
        ),
        {
          id: "urlToast",
          duration: Infinity,
          position: isMobile ? "bottom-center" : "top-center",
          style: {
            fontSize: TOAST.fontSize,
            background: TOAST.background,
            color: TOAST.color,
          },
          className: "url-toast",
          icon: (
            <button
              style={{
                padding: "2",
                paddingRight: "0",
                margin: "0",
                fontSize: TOAST.fontSize,
                background: TOAST.background,
                color: TOAST.color,
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
    // console.log("e: ", e);
    setUrl(url);
    setSelected(selected);
  };

  const handleUrlToastClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    toast.dismiss("instructionsToast1");
    if (url === "https://elibuildslite.web.app") {
      window.open("https://elibuilds-998b8.web.app", "_blank", "noreferrer");
    } else if (url === "https://gardencenterlite.web.app") {
      window.open("https://gardencenter-c902f.web.app", "_blank", "noreferrer");
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

              {/* Headphones */}
              <mesh
                position={OBJECT_POSITIONS.headphones}
                scale={0.2}
                rotation={[Math.PI / 2.235, Math.PI / 34, Math.PI / 1.25]}
              >
                <Headphones />
              </mesh>

              {/* Van */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(
                    e,
                    "van",
                    "https://elibuildslite.web.app", // https://gardencenterlite.web.app
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

              {/* Pen */}
              {/* <group
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
                  scale={0.15}
                  rotation={[Math.PI / 2, 0, -Math.PI / 1.5]}
                >
                  <Pen />
                </mesh>
                <RingCircle
                  position={OBJECT_POSITIONS.pen}
                  selected={selected === "pen"}
                />
              </group> */}

              {/* Suit */}
              <group
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={(e) => {
                  handleObjectClick(e, "suit", "https://elibuildslite.web.app"); //  https://corphop-db635.web.app
                }}
              >
                <mesh position={OBJECT_POSITIONS.suit} scale={0.12}>
                  <Suit isTouchScreen={isTouchScreen} selected={selected} />
                </mesh>
                <RingCircle
                  position={OBJECT_POSITIONS.suit}
                  selected={selected === "suit"}
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

              {/* Mug */}
              <mesh
                position={OBJECT_POSITIONS.mug}
                scale={0.15}
                rotation={[0, Math.PI / 5.75, 0]}
              >
                <Mug />
              </mesh>

              {/* Laptop */}
              <mesh scale={0.3} position={OBJECT_POSITIONS.laptop}>
                <Laptop dpr={dpr} url={url} />
              </mesh>

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
          enableZoom={true}
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
