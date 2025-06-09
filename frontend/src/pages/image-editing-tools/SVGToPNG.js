import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const SVGToPNG = () => {
  const [scale, setScale] = useState(1);

  const handleConvert = async (file) => {
    try {
      // In a real app, you would use a library like svg-to-png
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        originalFormat: 'SVG',
        convertedFormat: 'PNG',
        downloadUrl: URL.createObjectURL(file), // Would be converted PNG in real app
        scale,
      };
    } catch (error) {
      throw new Error('SVG to PNG conversion failed. Please try another file.');
    }
  };

  const additionalOptions = () => (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Scale: {scale}x</Typography>
      <Slider
        value={scale}
        onChange={(e, newValue) => setScale(newValue)}
        min={0.5}
        max={3}
        step={0.1}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" color="text.secondary">
        Higher scale = larger dimensions
      </Typography>
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Converted from {result.originalFormat} to {result.convertedFormat} at {result.scale}x scale
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="converted.png"
      >
        Download PNG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="SVG to PNG Converter"
      description="Convert SVG vector images to PNG raster format"
      acceptedFileTypes={['image/svg+xml']}
      actionButtonText="Convert to PNG"
      onProcess={handleConvert}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default SVGToPNG;