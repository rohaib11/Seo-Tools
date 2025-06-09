import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const JPGToPNG = () => {
  const handleConvert = async (file) => {
    try {
      const convertedBlob = await imageConversion.compressAccurately(file, {
        type: 'image/png',
      });
      return {
        originalFormat: 'JPG',
        convertedFormat: 'PNG',
        downloadUrl: URL.createObjectURL(convertedBlob),
        sizeBefore: (file.size / 1024).toFixed(2),
        sizeAfter: (convertedBlob.size / 1024).toFixed(2),
      };
    } catch (error) {
      throw new Error('Conversion failed. Please try another image.');
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
        download="converted.png"
      >
        Download PNG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="JPG to PNG Converter"
      description="Convert JPG images to lossless PNG format"
      acceptedFileTypes={['image/jpeg']}
      actionButtonText="Convert to PNG"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default JPGToPNG;