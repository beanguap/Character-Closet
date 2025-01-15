// src/components/CharacterScene.jsx

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function CharacterScene() {
  // 1. Load the model, apply rotation & scale
  const { scene } = useGLTF('/models/wednesday_addams_chibi/scene.gltf');
  scene.rotation.y = Math.PI / 2; 
  scene.scale.set(2, 2, 2);

  return (
    // 2. Set up the 3D canvas and camera
    <Canvas
      camera={{
        fov: 25,
        position: [0, 1, 2.5], // Pull back so the model is fully visible
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* 3. Add camera controls, limiting pan & zoom distances */}
      <OrbitControls
        enablePan={false}
        target={[0, 1, 0]}
        minDistance={2}
        maxDistance={4}
      />

      {/* 4. Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 10]} />

      {/* 5. Render the GLTF scene directly */}
      <primitive object={scene} />
    </Canvas>
  );
}
