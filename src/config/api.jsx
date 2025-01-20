const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const cache = new Map();

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

  return response.json();
};