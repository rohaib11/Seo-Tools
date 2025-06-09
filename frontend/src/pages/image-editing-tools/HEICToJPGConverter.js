import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import { Heic2Jpeg } from 'heic2any'; // Ensure this import is correct

const HEICToJPGConverter = () => {
  const handleConvert = async (file) => {
    try {
      const resultBlob = await Heic2Jpeg({
        blob: file,
        quality: 0.9, // Optional quality setting
      });
      return {
        originalFormat: 'HEIC',
        convertedFormat: 'JPG',
        downloadUrl: URL.createObjectURL(resultBlob),
        sizeBefore: (file.size / 1024).toFixed(2),
        sizeAfter: (resultBlob.size / 1024).toFixed(2),
      };
    } catch (error) {
      throw new Error('HEIC conversion failed. Please try another image.');
    }
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Conversion successful! File size changed from {result.sizeBefore}KB to {result.sizeAfter}KB
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="converted.jpg"
      >
        Download JPG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="HEIC to JPG Converter"
      description="Convert HEIC images (from iPhone) to JPG format"
      acceptedFileTypes={['image/heic', 'image/heif']}
      actionButtonText="Convert to JPG"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default HEICToJPGConverter;
