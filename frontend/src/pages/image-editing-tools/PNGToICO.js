import React from 'react';
import { Box, Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const PNGToICO = () => {
  const handleConvert = async (file) => {
    try {
      // In a real app, you would use a library like png-to-ico
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        originalFormat: 'PNG',
        convertedFormat: 'ICO',
        downloadUrl: URL.createObjectURL(file), // Would be ICO file in real app
      };
    } catch (error) {
      throw new Error('PNG to ICO conversion failed. Please try a square image (recommended 256x256).');
    }
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Converted from {result.originalFormat} to {result.convertedFormat}
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="favicon.ico"
      >
        Download ICO
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="PNG to ICO Converter"
      description="Convert PNG images to ICO format for favicons"
      acceptedFileTypes={['image/png']}
      actionButtonText="Convert to ICO"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default PNGToICO;