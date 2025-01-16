/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import './charactermodel.css';

export default function CharacterScene() {
  const { scene } = useGLTF('/models/wednesday_addams_chibi/scene.gltf');
  
  scene.rotation.y = Math.PI * 1.5;
  scene.scale.set(1, 1, 1);
  
  return (
    <div className="model-canvas-wrapper">
      <div className="rotation-icon">
        <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="5" width="100" height="30" rx="15" 
                fill="rgba(255, 255, 255, 0.15)" 
                stroke="rgba(255, 255, 255, 0.3)" 
                strokeWidth="1.5"/>
          <text x="35" y="27" 
                fontFamily="Arial" 
                fontSize="18" 
                fontWeight="bold" 
                fill="rgba(255, 255, 255, 0.8)">360°</text>
          <path d="M85 20 A12 12 0 1 1 85 19.9"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"/>
          <path d="M83 15 L85 20 L80 19"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
      </div>

      <Canvas
        camera={{ 
          fov: 40,
          position: [0, 1, 4],
          near: 0.1,
          far: 1000
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
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
        <primitive 
          object={scene} 
          position={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}