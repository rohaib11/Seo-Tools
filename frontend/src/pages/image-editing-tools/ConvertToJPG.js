import React from 'react';
import { Box, Alert, Button } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const ConvertToJPG = () => {
  const handleConvert = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onerror = (error) => reject(error);

      img.onload = () => {
        // Create a canvas and draw the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Convert to JPG using the canvas API
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          resolve({
            originalFormat: file.name.split('.').pop().toUpperCase(),
            downloadUrl: url // The converted JPG image as a Blob URL
          });
        }, 'image/jpeg');
      };

      reader.readAsDataURL(file); // Convert the file to a base64 URL
    });
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Image converted from {result.originalFormat} to JPG
      </Alert>
      
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-image.jpg"
      >
        Download JPG Image
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="Convert to JPG"
      description="Convert any image format to JPG"
      maxFileSize={10}
      acceptedFileTypes={['image/png', 'image/webp', 'image/gif', 'image/bmp']}
      actionButtonText="Convert to JPG"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default ConvertToJPG;
