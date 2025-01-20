// src/pages/OutfitDetection/OutfitDetection.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import { detectOutfit } from '../../config/api';
import './OutfitDetection.css';
import { Camera } from 'lucide-react';

const OutfitDetection = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const imageSrc = webcamRef.current.getScreenshot();
      
      // Convert base64 to blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const imageFile = new File([blob], "capture.jpg", { type: "image/jpeg" });

      const results = await detectOutfit(imageFile);
      setDetectedItems(results.detectedItems || []);
      
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
        <div className="detection-tools">
          {/* Square camera viewport with shutter effect */}
          <div className={`camera-viewport ${showCamera ? 'active' : ''}`}>
            <div className="shutter top"></div>
            <div className="shutter bottom"></div>
            {showCamera && (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 720,
                  height: 720,
                  facingMode: "environment"
                }}
                className="webcam-preview"
              />
            )}
          </div>

          <button 
            className="scanner-btn"
            onClick={() => setShowCamera(prev => !prev)}
          >
            <Camera className="icon" size={24} />
            {showCamera ? 'Deactivate Scanner' : 'Activate Scanner'}
          </button>
          
          {showCamera && (
            <button 
              className="capture-btn"
              onClick={handleCapture}
              disabled={isLoading}
            >
              Capture
            </button>
          )}

          {/* Show only the scanned items container */}
          {detectedItems.length > 0 && (
            <div className="scanned-items-container">
              <h4 className="scanned-items-title">Recent Scans</h4>
              <div className="scanned-items-list">
                {detectedItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="scanned-item">
                    <span className="item-label">{item.label}</span>
                    <span className="item-confidence">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default OutfitDetection;