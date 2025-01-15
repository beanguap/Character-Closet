import { useGLTF } from '@react-three/drei';

export default function CharacterModel() {
  // Load the model using the correct path relative to public directory
  const { scene } = useGLTF('./src/assets/3DModal/wednesday_addams_chibi/scene.gltf');

  // Preload the model
  useGLTF.preload('./src/assets/3DModal/wednesday_addams_chibi/scene.gltf');

  return <primitive object={scene} />;
}