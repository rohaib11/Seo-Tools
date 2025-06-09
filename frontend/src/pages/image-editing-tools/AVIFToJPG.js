import React from 'react';
import { Box, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const AVIFToJPG = () => {
  const handleConvert = async (file) => {
    try {
      const convertedBlob = await imageConversion.compressAccurately(file, {
        type: 'image/jpeg',
      });
      return {
        originalFormat: 'AVIF',
        convertedFormat: 'JPG',
        downloadUrl: URL.createObjectURL(convertedBlob),
        sizeBefore: (file.size / 1024).toFixed(2),
        sizeAfter: (convertedBlob.size / 1024).toFixed(2),
      };
    } catch (error) {
      throw new Error('AVIF to JPG conversion failed. Please try another image.');
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
      title="AVIF to JPG Converter"
      description="Convert modern AVIF images to JPG format"
      acceptedFileTypes={['image/avif']}
      actionButtonText="Convert to JPG"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default AVIFToJPG;