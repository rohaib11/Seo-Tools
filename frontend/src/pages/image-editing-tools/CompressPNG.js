import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import * as imageConversion from 'image-conversion';

const CompressPNG = () => {
  const [compressionLevel, setCompressionLevel] = useState(6); // Default PNG compression level

  const handleCompress = async (file) => {
    try {
      const compressedBlob = await imageConversion.compressAccurately(file, {
        type: 'image/png',
        quality: compressionLevel / 10,
      });
      return {
        originalSize: (file.size / 1024).toFixed(2),
        compressedSize: (compressedBlob.size / 1024).toFixed(2),
        downloadUrl: URL.createObjectURL(compressedBlob),
      };
    } catch (error) {
      throw new Error('PNG compression failed. Try with a different image.');
    }
  };

  const additionalOptions = () => (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Compression Level: {compressionLevel}/9</Typography>
      <Slider
        value={compressionLevel}
        onChange={(e, newValue) => setCompressionLevel(newValue)}
        min={0}
        max={9}
        step={1}
        marks
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" color="text.secondary">
        Higher values = better compression but slower processing
      </Typography>
    </Box>
  );

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
        download="compressed.png"
      >
        Download Compressed PNG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="PNG Compressor"
      description="Compress PNG images to reduce file size"
      acceptedFileTypes={['image/png']}
      actionButtonText="Compress PNG"
      onProcess={handleCompress}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default CompressPNG;