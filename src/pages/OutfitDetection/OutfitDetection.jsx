// src/pages/OutfitDetection/OutfitDetection.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { detectOutfit } from '../../config/api';
import './OutfitDetection.css';

const OutfitDetection = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const results = await detectOutfit(file);
      setDetectedItems(results.detectedItems);
    } catch (err) {
      setError('Failed to detect outfit. Please try again.');
      console.error('Outfit detection error:', err);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="outfit-detection">
      <div {...getRootProps()} className="upload-zone">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="detected-items">
        {detectedItems.map((item, index) => (
          <div key={index} className="detected-item">
            <span>{item.label}</span>
            <span>{(item.confidence * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitDetection;