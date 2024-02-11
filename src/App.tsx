import * as React from "react";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  PortalMaterialType,
  RoundedBox,
  // Edges,
  // Backdrop,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { geometry, easing } from "maath";
import { suspend } from "suspend-react";
import {
  BufferGeometry,
  Group,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
// import { Vector3 } from "three";

extend(geometry);

const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
// const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

interface FrameProps {
  id: string | undefined;
  name: string | undefined;
  author: string | undefined;
  bg?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  position?: THREE.Vector3 | undefined;
  rotation?: THREE.Euler | undefined;
  children: React.ReactElement<any, any>;
}

export const App = () => {
  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        eventSource={document.getElementById("root")!}
        eventPrefix="client"
      >
        <color attach="background" args={["#f0f0f0"]} />
        <PortalBox />
        <Rig />
      </Canvas>
    </>
  );
};

function PortalBox() {
  const innerBoxRef: React.RefObject<
    Mesh<BufferGeometry<NormalBufferAttributes>>
  > = useRef(null);
  const portalBoxRef: React.RefObject<Group<Object3DEventMap>> = useRef(null);
  const boxSides = [
    { x: 0, y: -Math.PI / 2, z: 0 },
    { x: 0, y: Math.PI, z: 0 },

    { x: 0, y: Math.PI / 2, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: Math.PI / 2, y: 0, z: 0 },

    { x: -Math.PI / 2, y: 0, z: 0 },
  ];

  // const roundedBoxGeometry: any = new roundedBoxGeometry(1, 1, 1, 7, 0.2);

  useFrame((_state, delta) => {
    const time = delta / 40;
    if (portalBoxRef.current && innerBoxRef.current) {
      portalBoxRef.current?.rotateY(time);
      innerBoxRef.current?.rotateY(time);
    }
  });

  return (
    <>
      <mesh ref={innerBoxRef}>
        {/* <boxGeometry args={[1.099, 1.71703398875, 1.099]} />
        <meshBasicMaterial /> */}

        <RoundedBox
          args={[1.099, 1.71703398875, 1.099]} // Width, height, depth. Default is [1, 1, 1]
          radius={0.07} // Radius of the rounded corners. Default is 0.05
          smoothness={4} // The number of curve segments. Default is 4
          bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
          creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          // {...meshProps} // All THREE.Mesh props are valid
        >
          <meshBasicMaterial color="#ffffff" />
        </RoundedBox>
      </mesh>

      <group ref={portalBoxRef}>
        {boxSides.map((side, i) => (
          <Frame
            key={i}
            id={i.toString()}
            name=""
            author="Ciaran O'Keeffe"
            bg="#ffffff"
            rotation={new THREE.Euler(side.x, side.y, side.z)}
            position={
              new THREE.Vector3(
                Math.abs(side.y) === Math.abs(Math.PI / 2)
                  ? side.y < 0
                    ? -0.55
                    : 0.55
                  : 0,
                Math.abs(side.x) === Math.abs(Math.PI / 2)
                  ? side.x < 0
                    ? 0.85901699437
                    : -0.85901699437
                  : 0,
                (side.x === 0 && side.y === 0) || side.y === Math.abs(Math.PI)
                  ? side.y === 0
                    ? 0.55
                    : -0.55
                  : 0
              )
            }
            height={
              Math.abs(side.x) === Math.abs(Math.PI / 2) ? 1 : 1.61803398875
            }
          >
            <Gltf
              src="fiesta_tea-transformed.glb"
              position={new THREE.Vector3(0, -2, -3)}
            />
          </Frame>
        ))}
      </group>
      {/* <directionalLight intensity={50} position={[0, 50, 25]} />
    <Backdrop
      position={[0, -1, -2]}
      floor={0.75} // Stretches the floor segment, 0.25 by default
      segments={20} // Mesh-resolution, 20 by default
      receiveShadow
      scale={12}
    >
      <meshStandardMaterial color="#353540" />
    </Backdrop> */}
    </>
  );
}

function Frame({
  id,
  // name,
  // author,
  bg,
  width = 1,
  height = 1.61803398875,
  position,
  rotation,
  children,
}: FrameProps) {
  const portal = useRef<PortalMaterialType>(null!);
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((_state, dt) =>
    easing.damp(portal.current!, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );

  return (
    <group position={position} rotation={rotation}>
      {/* <Text
        font={(suspend(medium) as any).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text> */}
      <Text
        font={(suspend(regular) as any).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, height > 1 ? -0.659 : -0.359, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      {/* <Text
        font={(suspend(regular) as any).default}
        fontSize={0.04}
        anchorX="right"
        position={[0.0, height > 1 ? -0.677 : -0.377, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text> */}
      <mesh
        name={id}
        onClick={(e) => (
          e.stopPropagation(), setLocation("/item/" + e.object.name)
        )}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width - 0.025, height - 0.025, 0.04]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={[bg as string]} />

          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const [, params] = useRoute("/item/:id");
  useEffect(() => {
    const active = scene.getObjectByName(params?.id!);
    if (active) {
      active.parent?.localToWorld(position.set(0, 0, 2));
      active.parent?.localToWorld(focus.set(0, 0, 0));
    }
    if (controls) {
      (controls as unknown as CameraControls).setLookAt(
        ...position.toArray(),
        ...focus.toArray(),
        true
      );
    }
  });

  return (
    <group position={[0, 10, 0]}>
      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI * 2}
      />
    </group>
  );
}
