import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const JPEGOptimizer = () => {
  const [quality, setQuality] = useState(75);

  const handleOptimize = async (file) => {
    try {
      const optimizedBlob = await imageConversion.compressAccurately(file, {
        quality: quality / 100,
        type: 'image/jpeg',
      });
      return {
        originalSize: (file.size / 1024).toFixed(2),
        optimizedSize: (optimizedBlob.size / 1024).toFixed(2),
        downloadUrl: URL.createObjectURL(optimizedBlob),
        quality,
      };
    } catch (error) {
      throw new Error('JPEG optimization failed. Please try another image.');
    }
  };

  const additionalOptions = () => (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Quality: {quality}%</Typography>
      <Slider
        value={quality}
        onChange={(e, newValue) => setQuality(newValue)}
        min={10}
        max={100}
        step={5}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" color="text.secondary">
        Higher quality = larger file size
      </Typography>
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Optimized from {result.originalSize}KB to {result.optimizedSize}KB (Quality: {result.quality}%)
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="optimized.jpg"
      >
        Download Optimized JPEG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="JPEG Optimizer"
      description="Optimize JPEG images to reduce file size while preserving quality"
      acceptedFileTypes={['image/jpeg']}
      actionButtonText="Optimize JPEG"
      onProcess={handleOptimize}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default JPEGOptimizer;