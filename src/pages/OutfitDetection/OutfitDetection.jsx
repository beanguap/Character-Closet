// src/pages/OutfitDetection/OutfitDetection.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload } from 'lucide-react'; // Add Upload icon
import { detectOutfit } from '../../config/api';
import CameraScanner from '../../components/CameraScanner/CameraScanner';
import TopBar from '../../components/TopBar/TopBar';
import BottomNav from '../../components/BottomNav/BottomNav';
import './outfitdetection.css';

const OutfitDetection = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleCapture = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await detectOutfit(file);
      setDetectedItems(results.detectedItems);
      
      // Create preview URL for the image
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    } catch (err) {
      setError('Failed to detect outfit. Please try again.');
      console.error('Outfit detection error:', err);
    } finally {
      setIsLoading(false);
      setShowCamera(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    await handleCapture(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880 // 5MB
  });

  return (
    <div className="outfit-detection">
      <TopBar />
      
      <div className="detection-content">
        <div className="detection-tools">
          {showCamera ? (
            <CameraScanner 
              onCapture={handleCapture}
              onClose={() => setShowCamera(false)}
            />
          ) : (
            <>
              <div className="dropzone-container">
                <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  <Upload size={32} className="upload-icon" />
                  <p className="upload-text">
                    {isDragActive 
                      ? 'Drop the image here...'
                      : 'Drag & drop an image here, or click to select'}
                  </p>
                  <p className="upload-hint">Supported formats: PNG, JPG</p>
                </div>
              </div>

              <button 
                className="scanner-btn"
                onClick={() => setShowCamera(true)}
                disabled={isLoading}
              >
                <Camera size={20} className="icon" />
                {isLoading ? 'Processing...' : 'Open Camera Scanner'}
              </button>

              {/* Preview and Results Section */}
              {previewImage && (
                <div className="preview-container">
                  <img src={previewImage} alt="Uploaded" className="preview-image" />
                </div>
              )}

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