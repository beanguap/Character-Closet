// src/pages/OutfitDetection/OutfitDetection.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera } from 'lucide-react';
import { detectOutfit } from '../../config/api';
import CameraScanner from '../../components/CameraScanner/CameraScanner';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import './outfitdetection.css';

const OutfitDetection = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = async (file) => {
    try {
      const results = await detectOutfit(file);
      setDetectedItems(results.detectedItems);
      setShowCamera(false);
    } catch (err) {
      setError('Failed to detect outfit. Please try again.');
      console.error('Outfit detection error:', err);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    await handleCapture(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="outfit-detection">
      <TopBar />
      
      <div className="detection-content">
        <div className="detection-tools">
          {/* Camera Scanner */}
          {showCamera ? (
            <CameraScanner 
              onCapture={handleCapture}
              onClose={() => setShowCamera(false)}
            />
          ) : (
            <>
              {/* Upload Zone */}
              <div {...getRootProps()} className="upload-zone">
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
              </div>

              {/* Scanner Button */}
              <button 
                className="scanner-btn"
                onClick={() => setShowCamera(true)}
              >
                <Camera size={20} className="icon" />
                Open Camera Scanner
              </button>

              {/* Results Section */}
              {error && <div className="error-message">{error}</div>}
              {detectedItems.length > 0 && (
                <div className="scanned-items-container">
                  <h3 className="scanned-items-title">Detected Items</h3>
                  <div className="scanned-items-list">
                    {detectedItems.map((item, index) => (
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
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default OutfitDetection;