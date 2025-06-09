import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';  // Ensure this import is correct

const PNGToJPG = () => {
  const [quality, setQuality] = useState(80);

  const handleConvert = async (file) => {
    try {
      const convertedBlob = await imageConversion.compressAccurately(file, {
        quality: quality / 100,
        type: 'image/jpeg',
      });
      return {
        originalFormat: 'PNG',
        convertedFormat: 'JPG',
        downloadUrl: URL.createObjectURL(convertedBlob),
        sizeBefore: (file.size / 1024).toFixed(2),
        sizeAfter: (convertedBlob.size / 1024).toFixed(2),
      };
    } catch (error) {
      throw new Error('Conversion failed. Please try another image.');
    }
  };

  const additionalOptions = () => (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>JPG Quality: {quality}%</Typography>
      <Slider
        value={quality}
        onChange={(e, newValue) => setQuality(newValue)}
        min={10}
        max={100}
        step={5}
        valueLabelDisplay="auto"
      />
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Conversion successful! Reduced size by {((result.sizeBefore - result.sizeAfter) / result.sizeBefore * 100).toFixed(1)}%
      </Alert>
      <Typography>Original: {result.sizeBefore} KB ({result.originalFormat})</Typography>
      <Typography>Converted: {result.sizeAfter} KB ({result.convertedFormat})</Typography>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        href={result.downloadUrl}
        download="converted.jpg"
      >
        Download JPG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG format with adjustable quality"
      acceptedFileTypes={['image/png']}
      actionButtonText="Convert to JPG"
      onProcess={handleConvert}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default PNGToJPG;
