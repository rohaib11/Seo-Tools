import React, { useState } from 'react';
import { Box, Button, Alert, Typography, CircularProgress } from '@mui/material';
import PDFToolBase from '../../components/PDFToolBase';

const PDFToWord = () => {
  const [isConverting, setIsConverting] = useState(false);

  const handleProcess = async (files) => {
    setIsConverting(true);
    
    // In a real implementation, you would:
    // 1. Send the PDF to a backend service for conversion
    // 2. Return the Word document
    // This is a mock implementation
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsConverting(false);
        // Mock response - in real app, this would be the actual Word file
        resolve({
          downloadUrl: '#',
          isMock: true
        });
      }, 2000);
    });
  };

  const resultComponent = (result) => (
    <Box>
      {result.isMock ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          In a full implementation, this would download the converted Word document.
          This demo shows the UI flow only.
        </Alert>
      ) : (
        <Alert severity="success" sx={{ mb: 2 }}>
          PDF converted to Word successfully!
        </Alert>
      )}
      
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-document.docx"
        disabled={result.isMock}
      >
        Download Word Document
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="PDF to Word"
      description="Convert PDF files to editable Word documents"
      actionButtonText={isConverting ? 'Converting...' : 'Convert to Word'}
      onProcess={handleProcess}
      resultComponent={resultComponent}
    />
  );
};

export default PDFToWord;