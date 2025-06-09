import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const CompressImageTo30KB = () => {
  const handleCompress = async (file) => {
    try {
      const compressedBlob = await imageConversion.compressAccurately(file, {
        size: 30, // Target size in KB
        accuracy: 0.85,
      });
      return {
        originalSize: (file.size / 1024).toFixed(2),
        compressedSize: (compressedBlob.size / 1024).toFixed(2),
        downloadUrl: URL.createObjectURL(compressedBlob),
      };
    } catch (error) {
      throw new Error('Compression failed. Try with a different image.');
    }
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Compressed from {result.originalSize}KB to {result.compressedSize}KB
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="compressed-image.jpg"
      >
        Download Compressed Image
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Compress Image to 30KB"
      description="Reduce image file size to approximately 30KB"
      actionButtonText="Compress Image"
      onProcess={handleCompress}
      resultComponent={resultComponent}
    />
  );
};

export default CompressImageTo30KB;