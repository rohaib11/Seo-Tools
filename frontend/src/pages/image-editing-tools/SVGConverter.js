import React, { useState } from 'react';
import { 
  Box, 
  
  Button, 
  Alert, 
  Tabs, 
  Tab,
 
} from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const SVGConverter = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const conversionOptions = [
    { label: 'PNG', format: 'image/png' },
    { label: 'JPG', format: 'image/jpeg' },
    { label: 'WEBP', format: 'image/webp' },
  ];

  const handleConvert = async (file) => {
    try {
      // In a real app, you would use a library like svg-to-img
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        originalFormat: 'SVG',
        convertedFormat: conversionOptions[tabValue].label,
        downloadUrl: URL.createObjectURL(file), // Would be converted image in real app
      };
    } catch (error) {
      throw new Error('SVG conversion failed. Please try another file.');
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
        download={`converted.${result.convertedFormat.toLowerCase()}`}
      >
        Download {result.convertedFormat}
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="SVG Converter"
      description="Convert SVG vector images to other formats"
      acceptedFileTypes={['image/svg+xml']}
      actionButtonText="Convert SVG"
      onProcess={handleConvert}
      customHeader={(
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          {conversionOptions.map((option, index) => (
            <Tab key={index} label={`SVG to ${option.label}`} />
          ))}
        </Tabs>
      )}
      resultComponent={resultComponent}
    />
  );
};

export default SVGConverter;