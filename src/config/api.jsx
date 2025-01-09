const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

const cache = new Map();

export const detectOutfit = async (imageFile, confidenceThreshold = 0.5) => {
  const cacheKey = `${imageFile.name}-${confidenceThreshold}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    validateImageFile(imageFile);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('confidenceThreshold', confidenceThreshold.toString());

    const response = await fetch(`${API_BASE_URL}/detect-outfit`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(data.error || 'Failed to detect outfit', response.status);
    }

    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error occurred', 500);
  }
};