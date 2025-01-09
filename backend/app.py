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