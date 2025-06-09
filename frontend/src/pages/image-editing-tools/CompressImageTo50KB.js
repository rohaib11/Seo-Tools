import React, { useState } from 'react';
import { Box, Typography, Button, Alert, LinearProgress } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const CompressImageTo50KB = () => {
  const [progress, setProgress] = useState(0);

  const handleCompress = async (file) => {
    try {
      setProgress(20);
      const compressedBlob = await imageConversion.compressAccurately(file, {
        size: 50, // Target size in KB
        accuracy: 0.9,
        onProgress: (p) => setProgress(p * 100),
      });
      setProgress(100);
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
      title="Compress Image to 50KB"
      description="Reduce image file size to approximately 50KB while preserving quality"
      actionButtonText="Compress Image"
      onProcess={handleCompress}
      resultComponent={resultComponent}
      customProgress={progress > 0 && progress < 100 && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" textAlign="center" mt={1}>
            Compressing... {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    />
  );
};

export default CompressImageTo50KB;