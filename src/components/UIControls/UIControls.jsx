// src/components/UIControls/UIControls.jsx
import React from 'react';

const UIControls = ({ showHat, setShowHat }) => {
  return (
    <div style={styles.container}>
      <button onClick={() => setShowHat(!showHat)}>
        Toggle Hat
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 999, // ensure it's above the canvas
  }
};

export default UIControls;
