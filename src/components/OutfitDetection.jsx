import React, { useState, useCallback } from 'react';
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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const MediaBoard = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length > 0) {
      const { message } = rejectedFiles[0].errors[0];
      setError(message);
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setError(null);
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  const categories = [
    { id: 'outfits', title: 'Outfits' },
    { id: 'shows', title: 'Shows' },
    { id: 'movies', title: 'Movies' },
    { id: 'games', title: 'Games' }
  ];

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
              {categories.map(category => (
                <Grid item xs={6} key={category.id}>
                  <Card
                    onClick={() => setActiveCategory(category.id)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: activeCategory === category.id 
                        ? 'primary.main' 
                        : 'grey.300',
                      bgcolor: activeCategory === category.id 
                        ? 'primary.light' 
                        : 'background.paper',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: activeCategory === category.id 
                          ? 'primary.light'
                          : 'grey.50'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {category.title}
                      </Typography>
                      <Box 
                        sx={{ 
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {selectedImage && activeCategory === category.id && (
                          <img
                            src={selectedImage}
                            alt={`${category.title} preview`}
                            style={{
                              maxHeight: '100%',
                              maxWidth: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        )}
                      </Box>
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
                  Selected category: {categories.find(c => c.id === activeCategory)?.title}
                </Typography>
                {/* Results content will go here */}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaBoard;