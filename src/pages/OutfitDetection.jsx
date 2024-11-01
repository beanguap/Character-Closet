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