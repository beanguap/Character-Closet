import * as tf from '@tensorflow/tfjs';

// Function to load the model
export async function loadModel() {
  try {
    // Path to the converted TensorFlow.js model in the public directory
    const model = await tf.loadLayersModel('/model/model.json');
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading the model:', error);
    return null;
  }
}
