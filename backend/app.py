from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import logging
from outfit_detector import OutfitDetector
import os
from typing import Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}})

# Configuration
app.config.update(
    MAX_CONTENT_LENGTH=16 * 1024 * 1024,
    UPLOAD_FOLDER='uploads',
    MODEL_PATH='models/fashion_model.h5',
    ALLOWED_EXTENSIONS={'png', 'jpg', 'jpeg'}
)

# Initialize detector with error handling
try:
    detector = OutfitDetector(app.config['MODEL_PATH'])
except Exception as e:
    logger.error(f"Failed to initialize detector: {str(e)}")
    raise

detector = OutfitDetector(app.config['MODEL_PATH'])

@app.route('/api/detect-outfit', methods=['POST'])
def detect_outfit():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image = request.files['image']
    image_bytes = image.read()
    try:
        results = detector.detect_multiple_items(image_bytes)
        return jsonify({'detectedItems': results}), 200
    except Exception as e:
        logger.error(f"Detection error: {str(e)}")
        return jsonify({'error': 'Detection failed'}), 500