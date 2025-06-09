import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Button,
  Alert,
  Grid
} from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const ImageResizer = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  // Custom file change handler
  const handleFileChange = (file, setFile, setPreview) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setAspectRatio(img.width / img.height);
        if (maintainAspectRatio) {
          setHeight(Math.round(width / aspectRatio));
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleResize = async (file) => {
    // Mock resize implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          originalDimensions: `${width}x${height}`,
          newDimensions: `${Math.round(width / 2)}x${Math.round(height / 2)}`, // Mock resized dimensions
          downloadUrl: URL.createObjectURL(file) // Mock download URL (real resizing will use canvas)
        });
      }, 1500);
    });
  };

  const additionalOptions = () => (
    <Box>
      <Typography gutterBottom>New Dimensions</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Width (px)"
            type="number"
            value={width}
            onChange={(e) => {
              const newWidth = parseInt(e.target.value) || 100;
              setWidth(newWidth);
              if (maintainAspectRatio) {
                setHeight(Math.round(newWidth / aspectRatio));
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Height (px)"
            type="number"
            value={height}
            onChange={(e) => {
              const newHeight = parseInt(e.target.value) || 100;
              setHeight(newHeight);
              if (maintainAspectRatio) {
                setWidth(Math.round(newHeight * aspectRatio));
              }
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
        >
          {maintainAspectRatio ? 'Lock Aspect Ratio' : 'Unlock Aspect Ratio'}
        </Button>
      </Box>
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Image resized from {result.originalDimensions} to {result.newDimensions}
      </Alert>
      
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="resized-image.jpg"
      >
        Download Resized Image
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Image Resizer"
      description="Resize your images to any dimensions"
      maxFileSize={10}
      actionButtonText="Resize Image"
      onProcess={handleResize}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
      customFileChange={handleFileChange} // Ensure this prop is passed to the base component
    />
  );
};

export default ImageResizer;
