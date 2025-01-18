import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import PropTypes from "prop-types";
import { useEffect, Suspense } from "react";

// Separate Model component for better error handling
function Model({ shirtColor, pantsColor, shoesColor, hatColor }) {
  const { scene } = useGLTF("/models/wednesday_addams_chibi/scene.gltf");

  useEffect(() => {
    // Initial transform
    scene.rotation.y = Math.PI * 1.5;
    scene.scale.set(1, 1, 1);

    const updateMeshColor = (meshName, color) => {
      const mesh = scene.getObjectByName(meshName);
      if (mesh?.material) {
        mesh.material.map = null;
        mesh.material.color.set(color);
      }
    };

    updateMeshColor("roupa_white_0", shirtColor);
    updateMeshColor("roupa_black_0", pantsColor);
    updateMeshColor("shoes_0", shoesColor);
    updateMeshColor("hat_0", hatColor);
  }, [scene, shirtColor, pantsColor, shoesColor, hatColor]);

  return (
    <primitive object={scene} position-x={0} position-y={0.5} position-z={0} />
  );
}

export function CharacterModel({
  shirtColor,
  pantsColor,
  shoesColor,
  hatColor,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        position: "relative",
      }}
    >
      <Canvas
        camera={{
          fov: 40,
          position: [0, 1, 4],
          near: 0.1,
          far: 1000,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        dpr={[1, 2]} // Optimize for different device pixel ratios
      >
        <Suspense fallback={null}>
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
          <Model
            shirtColor={shirtColor}
            pantsColor={pantsColor}
            shoesColor={shoesColor}
            hatColor={hatColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

Model.propTypes = {
  shirtColor: PropTypes.string.isRequired,
  pantsColor: PropTypes.string.isRequired,
  shoesColor: PropTypes.string.isRequired,
  hatColor: PropTypes.string.isRequired,
};

CharacterModel.propTypes = {
  shirtColor: PropTypes.string.isRequired,
  pantsColor: PropTypes.string.isRequired,
  shoesColor: PropTypes.string.isRequired,
  hatColor: PropTypes.string.isRequired,
};
