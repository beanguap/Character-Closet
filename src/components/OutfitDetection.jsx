import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Crop, X } from 'lucide-react';
import { Alert, AlertTitle, Slider } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './OutfitDetection.css';



const CONFIDENCE_THRESHOLD = 0.5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const OutfitDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(CONFIDENCE_THRESHOLD);
  const [cropMode, setCropMode] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const imageRef = useRef(null);

  // File upload handler
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const { message } = rejectedFiles[0].errors[0];
      setError(message);
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setSelectedImage(file);
      setError(null);
      setCropMode(false);
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  // Camera handling functions
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        stopCamera();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (err) {
      const errorMessage = err.name === 'NotAllowedError' 
        ? 'Camera access denied. Please grant permission.'
        : 'Unable to access camera. Please try again.';
      setError(errorMessage);
      console.error('Camera error:', err);
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      setSelectedImage(file);
      setPreview(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }, 'image/jpeg', 0.9);
  }, [stopCamera]);

  // Image processing function
  const processImage = async (retryCount = 0) => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('confidenceThreshold', confidenceThreshold.toString());

      const response = await fetch('http://localhost:5000/api/detect-outfit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to process image');
      }

      const result = await response.json();
      setDetections(result.items.filter(item => item.confidence >= confidenceThreshold));
    } catch (err) {
      console.error('Processing error:', err);
      
      if (retryCount < 2) {
        setTimeout(() => processImage(retryCount + 1), Math.pow(2, retryCount) * 1000);
      } else {
        setError('Error processing image. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cleanup
  useState(() => {
    return () => {
      stopCamera();
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [stopCamera, preview]);

  return (
    <div className="outfit-detection-container">
      {/* Camera Section */}
      {isCameraActive ? (
        <div className="camera-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="camera-video"
          />
          <div className="camera-controls">
            <button
              onClick={captureImage}
              className="button button-primary"
            >
              <Camera className="button-icon" />
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="button button-destructive"
            >
              <X className="button-icon" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Upload Section */
        <div {...getRootProps()} className="upload-zone">
          <input {...getInputProps()} />
          <div className="upload-content">
            <Upload className="upload-icon" />
            <span className="upload-text">
              {isDragActive 
                ? "Drop the image here" 
                : "Click to upload or drag and drop"}
            </span>
            <span className="upload-subtext">
              PNG, JPG up to 10MB
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="button button-outline"
            >
              <Camera className="button-icon" />
              Use Camera
            </button>
          </div>
        </div>
      )}

      {/* Preview and Controls */}
      {preview && !isCameraActive && (
        <div className="preview-container">
          <div className="preview-image-container">
            <img
              ref={imageRef}
              src={preview}
              alt="Preview"
              className="preview-image"
            />
          </div>
          
          <div className="preview-controls">
            <button
              onClick={() => setCropMode(!cropMode)}
              className="button button-outline"
            >
              <Crop className="button-icon" />
              {cropMode ? 'Cancel Crop' : 'Crop Image'}
            </button>
          </div>

          <div className="slider-container">
            <label className="slider-label">
              Confidence Threshold: {confidenceThreshold}
            </label>
            <Slider
              value={confidenceThreshold}
              onChange={(event, value) => setConfidenceThreshold(value)}
              min={0}
              max={1}
              step={0.1}
            />
          </div>

          <button
            onClick={() => processImage()}
            disabled={loading}
            className="button button-primary button-full"
          >
            {loading ? 'Processing...' : 'Detect Outfit'}
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Results Display */}
      {detections.length > 0 && (
        <div className="results-container">
          <h3 className="results-title">Detected Items:</h3>
          <div className="results-list">
            {detections.map((item, index) => (
              <div 
                key={index}
                className="result-item"
              >
                <span className="result-label">{item.label}</span>
                <span className="result-confidence">
                  {(item.confidence * 100).toFixed(1)}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitDetection;