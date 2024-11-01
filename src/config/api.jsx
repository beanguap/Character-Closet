// src/config/api.js

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Validates the image file before upload
 * @param {File} file - The image file to validate
 * @throws {Error} If validation fails
 */
const validateImageFile = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Check file size (16MB max)
  const MAX_FILE_SIZE = 16 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 16MB');
  }
};

/**
 * Detects outfit items in an uploaded image
 * @param {File} imageFile - The image file to analyze
 * @param {number} confidenceThreshold - Minimum confidence threshold (0-1)
 * @returns {Promise<{items: Array}>} Detection results
 */
export const detectOutfit = async (imageFile, confidenceThreshold = 0.5) => {
  try {
    validateImageFile(imageFile);

    // Validate confidence threshold
    if (confidenceThreshold < 0 || confidenceThreshold > 1) {
      throw new Error('Confidence threshold must be between 0 and 1');
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('confidenceThreshold', confidenceThreshold.toString());

    const response = await fetch(`${API_BASE_URL}/detect-outfit`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to detect outfit');
    }

    return {
      items: data.items || [],
      ...data
    };
  } catch (error) {
    console.error('Outfit detection error:', error);
    throw error;
  }
};

/**
 * Checks the health status of the API server
 * @returns {Promise<{status: string}>} Server health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

// Export base URL for potential use in other parts of the application
export const getApiBaseUrl = () => API_BASE_URL;