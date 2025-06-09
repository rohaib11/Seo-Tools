import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  Button, 
  Alert
} from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const ImageCompressor = () => {
  const [quality, setQuality] = useState(80);

  const handleCompress = async (file) => {
    // This is a mock implementation - in a real app, you would use a library like Compressor.js
    // or send to a backend service for processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          originalSize: (file.size / 1024).toFixed(2),
          compressedSize: ((file.size * (100 - quality) / 100) / 1024).toFixed(2),
          downloadUrl: URL.createObjectURL(file), // In real app, this would be the compressed version
          compressionRatio: `${100 - quality}%`
        });
      }, 1500);
    });
  };

  const additionalOptions = () => (
    <Box>
      <Typography gutterBottom>Compression Quality</Typography>
      <Slider
        value={quality}
        onChange={(e, newValue) => setQuality(newValue)}
        min={10}
        max={95}
        step={5}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
      />
      <Typography variant="body2" color="text.secondary">
        Higher quality = larger file size
      </Typography>
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Image compressed successfully! Reduced by {result.compressionRatio}
      </Alert>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Original Size: {result.originalSize} KB</Typography>
        <Typography>Compressed Size: {result.compressedSize} KB</Typography>
      </Box>

      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="compressed-image.jpg"
      >
        Download Compressed Image
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Image Compressor"
      description="Reduce your image file size without losing quality"
      maxFileSize={10}
      actionButtonText="Compress Image"
      onProcess={handleCompress}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default ImageCompressor;
