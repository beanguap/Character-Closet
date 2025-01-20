import { useState, useCallback } from 'react';
import { 
  Paper, 
  Grid, 
  Typography, 
  Box,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera } from 'lucide-react';
import './OutfitDetection.css';
import { detectOutfit } from '../config/api';

// Create a web worker for image processing
const worker = new Worker(new URL('./imageProcessor.js', import.meta.url));

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const MediaBoard = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [error, setError] = useState(null);
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetection = async (file) => {
    setIsLoading(true);
    setError(null);

    worker.postMessage(file);
    worker.onmessage = (event) => {
      const results = event.data;
      setDetectedItems(results.items);
      setIsLoading(false);
    };

    worker.onerror = (error) => {
      setError('Failed to detect outfit');
      setIsLoading(false);
    };
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length > 0) {
      const { message } = rejectedFiles[0].errors[0];
      setError(message);
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setSelectedImage(reader.result);
      setError(null);

      try {
        await handleDetection(file);
      } catch (err) {
        setError('Failed to detect outfit. Please try again.');
        console.error('Outfit detection error:', err);
      }
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES.join(','),
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  return (
    <Box sx={{ p: 3, height: '100vh', maxHeight: 800 }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Left Panel - Upload & Scanner */}
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            {/* Upload Zone */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 2
              }}
            >
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                <input {...getInputProps()} />
                <Upload size={48} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {isDragActive ? 'Drop the image here' : 'Upload Image'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  PNG, JPG up to 10MB
                </Typography>
              </Box>
            </Paper>

            {/* Scanner */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.50' }
              }}
            >
              <Camera size={48} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Image Scanner
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Middle Panel - Board */}
        <Grid item xs={6}>
          <Paper 
            elevation={3}
            sx={{ 
              height: '100%',
              p: 2
            }}
          >
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {detectedItems.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'grey.300',
                      bgcolor: 'background.paper',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'grey.50'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Confidence: {item.confidence.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Panel - Results */}
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              p: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}

            {activeCategory && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Selected category: {activeCategory}
                </Typography>
                {/* Results content will go here */}
              </Box>
            )}
            <img src="src/assets/Character-Closet.png" alt="Character Closet" loading="lazy" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaBoard;