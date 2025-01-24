# outfit_detector.py
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

def load_model(model_path):
    try:
        # Use tf.keras.models.save_model() to save the model first
        model = tf.keras.models.load_model(model_path, compile=False)
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        return model
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

class OutfitDetector:
    def __init__(self, model_path: str):
        """Initialize the outfit detector with a trained model."""
        try:
            self.model = load_model(model_path)
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
            
        self.categories = [
            'T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
            'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot'
        ]
    
    def preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """Preprocess image for model input."""
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes)).convert('L')
            
            # Resize to 28x28 (Fashion MNIST size)
            image = image.resize((28, 28))
            
            # Convert to numpy array and normalize
            image_array = np.array(image)
            image_array = image_array.astype('float32') / 255.0
            
            # Reshape for model input
            image_array = image_array.reshape(1, 28, 28, 1)
            
            return image_array
            
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise
    
    def detect_multiple_items(
        self, 
        image_bytes: bytes, 
        confidence_threshold: float = 0.5,
        max_detections: int = 5
    ) -> List[Dict]:
        """Detect multiple clothing items in an image."""
        try:
            # Preprocess the image
            processed_image = self.preprocess_image(image_bytes)
            
            # Get model predictions
            predictions = self.model.predict(processed_image)[0]
            
            # Get all predictions above threshold
            detected_items = []
            for idx, confidence in enumerate(predictions):
                if confidence >= confidence_threshold:
                    detected_items.append({
                        'label': self.categories[idx],
                        'confidence': float(confidence)
                    })
            
            # Sort by confidence and limit to max_detections
            detected_items.sort(key=lambda x: x['confidence'], reverse=True)
            return detected_items[:max_detections]
            
        except Exception as e:
            logger.error(f"Error detecting items: {str(e)}")
            raise