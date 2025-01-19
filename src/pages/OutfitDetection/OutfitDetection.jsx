// src/pages/OutfitDetection/OutfitDetection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraScanner from '../../components/CameraScanner/CameraScanner';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import { detectOutfit } from '../../config/api';
import './OutfitDetection.css';

const OutfitDetection = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCapture = async (imageFile) => {
    try {
      setIsLoading(true);
      setError(null);

      const results = await detectOutfit(imageFile);
      setDetectedItems(results.detectedItems || []);
      
      // Close camera after successful detection
      setShowCamera(false);
      
    } catch (err) {
      setError('Failed to analyze outfit. Please try again.');
      console.error('Outfit detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="outfit-detection">
      <TopBar />

      <main className="detection-content">
        {showCamera ? (
          <CameraScanner 
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
          />
        ) : (
          <div className="detection-tools">
            <button 
              className="scanner-btn"
              onClick={() => setShowCamera(true)}
            >
              Open Camera Scanner
            </button>
            
            {/* Display detected items */}
            {detectedItems.length > 0 && (
              <div className="detected-items">
                <h3>Detected Items:</h3>
                {detectedItems.map((item, index) => (
                  <div key={index} className="detected-item">
                    <span className="item-label">{item.label}</span>
                    <span className="item-confidence">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default OutfitDetection;