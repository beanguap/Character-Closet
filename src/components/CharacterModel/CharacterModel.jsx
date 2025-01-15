// src/components/CharacterModel.js

import { useGLTF } from '@react-three/drei';

export default function CharacterModel() {
  // Load base character
  const { scene: baseScene } = useGLTF('/assets/models/baseCharacter.glb');

  // Return the base character model in the scene
  return <primitive object={baseScene} />;
}
