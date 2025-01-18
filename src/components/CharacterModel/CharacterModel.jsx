import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function CharacterModel({
  shirtColor,
  pantsColor,
  shoesColor,
  hatColor
}) {
  const { scene } = useGLTF('/models/wednesday_addams_chibi/scene.gltf')

  // Example transforms
  scene.rotation.y = Math.PI * 1.5
  scene.scale.set(1, 1, 1)

  useEffect(() => {
    // For SHIRT (maybe "roupa_white_0")
    const shirtMesh = scene.getObjectByName('roupa_white_0')
    if (shirtMesh?.material) {
      shirtMesh.material.map = null  // If there's a texture, remove it
      shirtMesh.material.color.set(shirtColor)
    }

    // For PANTS (maybe "roupa_black_0")
    const pantsMesh = scene.getObjectByName('roupa_black_0')
    if (pantsMesh?.material) {
      pantsMesh.material.map = null
      pantsMesh.material.color.set(pantsColor)
    }

    // For SHOES (if your model has a separate mesh)
    const shoesMesh = scene.getObjectByName('shoes_0')  // Example
    if (shoesMesh?.material) {
      shoesMesh.material.map = null
      shoesMesh.material.color.set(shoesColor)
    }

    // For HAT (if your model has it)
    const hatMesh = scene.getObjectByName('hat_0')  // Example
    if (hatMesh?.material) {
      hatMesh.material.map = null
      hatMesh.material.color.set(hatColor)
    }
  }, [scene, shirtColor, pantsColor, shoesColor, hatColor])

  return (
    <Canvas
      camera={{ fov: 40, position: [0, 1, 4], near: 0.1, far: 1000 }}
      style={{ width: '100%', height: '100%' }}
    >
      <OrbitControls
        enablePan={false}
        target={[0, 0.7, 0]}
        minDistance={2}
        maxDistance={6}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        enableDamping
        dampingFactor={0.05}
      />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      <primitive object={scene} position={[0, 0.5, 0]} />
    </Canvas>
  )
}
