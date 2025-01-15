// CharacterScene.jsx is a React component that renders a 3D model of a character.
// It uses the @react-three/fiber and @react-three/drei libraries to create a 3D scene with lighting and camera controls.
// The CharacterModel component loads a GLTF/GLB model of the character and renders it in the scene.
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function CharacterModel() {
  // Load the model (GLTF/GLB).
  const { scene } = useGLTF('/path/to/character.glb');

  return <primitive object={scene} />;
}

export default function CharacterScene() {
  return (
    <Canvas style={{ width: '600px', height: '600px' }}>
      {/* OrbitControls is a helper that lets the user rotate/pan/zoom the model */}
      <OrbitControls enablePan={false} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      <CharacterModel />
    </Canvas>
  );
}
