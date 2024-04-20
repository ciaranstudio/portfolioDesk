import { useGLTF } from "@react-three/drei";

export default function Phone() {
  const model = useGLTF("/phone.gltf");

  return <primitive object={model.scene} />;
}
