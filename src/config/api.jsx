// src/config/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const detectOutfit = async (imageFile, confidenceThreshold = 0.5) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('confidenceThreshold', confidenceThreshold.toString());

  const response = await fetch(`${API_BASE_URL}/detect-outfit`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to detect outfit');
  }

  return await response.json();
};

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};

// src/components/OutfitDetection.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const OutfitDetection = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Create preview
    setPreview(URL.createObjectURL(file));
    
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('confidenceThreshold', confidenceThreshold.toString());

      const response = await fetch('http://localhost:5000/api/detect-outfit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Detection failed');
      }

      const data = await response.json();
      setDetectedItems(data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to analyze outfit');
      console.error('Outfit detection error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [confidenceThreshold]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    maxSize: 16 * 1024 * 1024 // 16MB max file size
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confidence Threshold: {confidenceThreshold}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={confidenceThreshold}
          onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p>Analyzing outfit...</p>
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select one (max 16MB)</p>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {preview && (
        <div className="mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-64 mx-auto rounded-lg shadow"
          />
        </div>
      )}

      {detectedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Detected Items:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectedItems.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="font-medium">{item.label || item.name}</h3>
                {item.category && (
                  <p className="text-gray-600">{item.category}</p>
                )}
                <p className="text-sm text-gray-500">
                  Confidence: {(item.confidence * 100).toFixed(1)}%
                </p>
                {item.bbox && (
                  <p className="text-xs text-gray-500">
                    Location: {item.bbox.map(v => v.toFixed(2)).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitDetection;

// src/pages/OutfitDetection.jsx
import React, { useEffect, useState } from 'react';
import OutfitDetection from '../components/OutfitDetection';
import { checkHealth } from '../config/api';

const OutfitDetectionPage = () => {
  const [isServerHealthy, setIsServerHealthy] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(true);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await checkHealth();
        setIsServerHealthy(response.status === 'healthy');
      } catch (error) {
        console.error('Server health check failed:', error);
        setIsServerHealthy(false);
      } finally {
        setCheckingHealth(false);
      }
    };

    checkServerHealth();
  }, []);

  if (checkingHealth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Checking server status...</p>
        </div>
      </div>
    );
  }

  if (!isServerHealthy) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded m-4">
        The server appears to be offline. Please ensure the backend server is running.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Outfit Detection</h1>
      <OutfitDetection />
    </div>
  );
};

export default OutfitDetectionPage;