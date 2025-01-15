// src/components/UIControls.js

export default function UIControls({ selectedHat, setSelectedHat }) {
  return (
    <div style={styles.controlsContainer}>
      <button style={styles.button} onClick={() => setSelectedHat(!selectedHat)}>
        Toggle Hat
      </button>
    </div>
  );
}

const styles = {
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    background: '#333',
    color: '#fff',
  },
};
