import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const CompressJPEGTo200KB = () => {
  const handleCompress = async (file) => {
    try {
      const compressedBlob = await imageConversion.compressAccurately(file, {
        size: 200, // Target size in KB
        type: 'image/jpeg',
        accuracy: 0.9,
      });
      return {
        originalSize: (file.size / 1024).toFixed(2),
        compressedSize: (compressedBlob.size / 1024).toFixed(2),
        downloadUrl: URL.createObjectURL(compressedBlob),
      };
    } catch (error) {
      throw new Error('Compression failed. Try with a different JPEG image.');
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
        download="compressed.jpg"
      >
        Download Compressed JPEG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Compress JPEG to 200KB"
      description="Reduce JPEG image file size to approximately 200KB"
      acceptedFileTypes={['image/jpeg']}
      actionButtonText="Compress JPEG"
      onProcess={handleCompress}
      resultComponent={resultComponent}
    />
  );
};

export default CompressJPEGTo200KB;