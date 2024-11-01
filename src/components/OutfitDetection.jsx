import  { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Crop, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const CONFIDENCE_THRESHOLD = 0.5;

const OutfitDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(CONFIDENCE_THRESHOLD);
  const [cropMode, setCropMode] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const imageRef = useRef(null);

  // Handle file upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setSelectedImage(file);
    };
    reader.readAsDataURL(file);
    setError(null);
    setCropMode(false);
  };

  // Camera handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (err) {
      setError('Unable to access camera');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      setSelectedImage(blob);
      setPreview(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }, 'image/jpeg');
  };

  // Image cropping
  const handleCrop = () => {
    if (!imageRef.current || !croppedArea) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    
    ctx.drawImage(
      imageRef.current,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height
    );

    canvas.toBlob((blob) => {
      setSelectedImage(blob);
      setPreview(canvas.toDataURL('image/jpeg'));
      setCropMode(false);
    }, 'image/jpeg');
  };

  // Process image through model
  const processImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('confidenceThreshold', confidenceThreshold);

      const response = await fetch('/api/detect-outfit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process image');

      const result = await response.json();
      setDetections(result.items.filter(item => item.confidence >= confidenceThreshold));
    } catch (err) {
      setError('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Camera Section */}
      {isCameraActive ? (
        <div className="relative">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="w-full rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              onClick={captureImage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button
              onClick={stopCamera}
              variant="destructive"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        /* Upload Section */
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-sm text-gray-500">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG up to 10MB
              </span>
            </label>
            <Button
              onClick={startCamera}
              variant="outline"
              className="mt-4"
            >
              <Camera className="w-4 h-4 mr-2" />
              Use Camera
            </Button>
          </div>
        </div>
      )}

      {/* Preview and Controls */}
      {preview && !isCameraActive && (
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              ref={imageRef}
              src={preview}
              alt="Preview"
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => setCropMode(!cropMode)}
              variant="outline"
            >
              <Crop className="w-4 h-4 mr-2" />
              {cropMode ? 'Cancel Crop' : 'Crop Image'}
            </Button>
            
            {cropMode && (
              <Button
                onClick={handleCrop}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Apply Crop
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Confidence Threshold: {confidenceThreshold}
            </label>
            <Slider
              value={[confidenceThreshold]}
              onValueChange={([value]) => setConfidenceThreshold(value)}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <Button
            onClick={processImage}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Processing...' : 'Detect Outfit'}
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      {detections.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Detected Items:</h3>
          <div className="space-y-3">
            {detections.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-gray-500">
                  {(item.confidence * 100).toFixed(1)}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitDetection;