// src/components/CharacterModel/CharacterModel.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Bounds } from '@react-three/drei'
import './CharacterModel.css'

export default function CharacterScene() {
  const { scene } = useGLTF('/models/wednesday_addams_chibi/scene.gltf')
  scene.rotation.y = Math.PI / 2
  scene.scale.set(2, 2, 2)

  return (
    <div className="model-canvas-wrapper">
      <Canvas
        camera={{
          fov: 25,
          position: [0, 1, 2.5],
        }}
      >
        <OrbitControls
          enablePan={false}
          target={[0, 1, 0]}
          minDistance={2}
          maxDistance={4}
        />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[10, 10, 10]} />
        <primitive object={scene} />
      </Canvas>
    </div>
  )
}
