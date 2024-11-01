// src/pages/OutfitDetection.jsx
import React, { useState } from 'react';
import OutfitDetection from '../components/OutfitDetection';
import { detectOutfit } from '../config/api';

const OutfitDetectionPage = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (imageFile) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', imageFile);

      const results = await detectOutfit(formData);
      setDetectedItems(results.detectedItems);
    } catch (err) {
      setError('Failed to analyze outfit. Please try again.');
      console.error('Outfit detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Outfit Detection</h1>
      <OutfitDetection
        onImageUpload={handleImageUpload}
        detectedItems={detectedItems}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default OutfitDetectionPage;

// src/components/OutfitDetection.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const OutfitDetection = ({ onImageUpload, detectedItems, isLoading, error }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <p>Analyzing outfit...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {detectedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Detected Items:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detectedItems.map((item, index) => (
              <div key={index} className="p-4 border rounded">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
                {item.confidence && (
                  <p className="text-sm text-gray-500">
                    Confidence: {(item.confidence * 100).toFixed(1)}%
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

// src/config/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const detectOutfit = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/outfit-detection`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to detect outfit');
  }

  return await response.json();
};