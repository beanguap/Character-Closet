// src/components/CameraScanner/CameraScanner.jsx
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, X } from "lucide-react";
import { detectOutfit } from "../../config/api";
import "./camerascanner.css";

const CameraScanner = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "environment" // Use back camera on mobile
  };

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;
    
    try {
      setIsProcessing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);

      // Convert base64 to blob for API
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

      const results = await detectOutfit(file);
      onCapture(results.detectedItems);
    } catch (error) {
      console.error("Capture failed:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [onCapture]);

  const retake = () => {
    setCapturedImage(null);
    setIsCameraActive(true);
  };

  return (
    <div className="camera-scanner">
      <div className="camera-header">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="camera-content">
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam-preview"
            />
            <div className="camera-controls">
              <button 
                className="capture-btn"
                onClick={capture}
                disabled={isProcessing}
              >
                <Camera size={24} />
              </button>
            </div>
          </>
        ) : (
          <div className="preview-container">
            <img src={capturedImage} alt="Captured" className="captured-preview" />
            <div className="preview-controls">
              <button className="retake-btn" onClick={retake}>
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraScanner;