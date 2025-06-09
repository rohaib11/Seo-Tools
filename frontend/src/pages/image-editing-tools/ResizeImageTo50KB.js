import React from 'react';
import { Box, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const ResizeImageTo50KB = () => {
  const handleResize = async (file) => {
    try {
      const resizedBlob = await imageConversion.compressAccurately(file, {
        size: 50, // Target size in KB
        width: 800, // Initial width guess
        height: 600, // Initial height guess
        accuracy: 0.8,
      });
      return {
        originalSize: (file.size / 1024).toFixed(2),
        resizedSize: (resizedBlob.size / 1024).toFixed(2),
        downloadUrl: URL.createObjectURL(resizedBlob),
      };
    } catch (error) {
      throw new Error('Resizing failed. Try with a different image.');
    }
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Resized from {result.originalSize}KB to {result.resizedSize}KB
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="resized-image.jpg"
      >
        Download Resized Image
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Resize Image to 50KB"
      description="Resize and compress images to approximately 50KB"
      actionButtonText="Resize Image"
      onProcess={handleResize}
      resultComponent={resultComponent}
    />
  );
};

export default ResizeImageTo50KB;