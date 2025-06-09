import React, { useState } from 'react';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import PDFToolBase from '../../components/PDFToolBase';

const PowerPointToPDF = () => {
  const [isConverting, setIsConverting] = useState(false);

  const handleProcess = async (files) => {
    setIsConverting(true);
    const file = files[0];

    try {
      // --- Replace this mock block with real API call ---
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/convert-ppt-to-pdf', {
      //   method: 'POST',
      //   body: formData
      // });
      // const blob = await response.blob();
      // return {
      //   downloadUrl: URL.createObjectURL(blob)
      // };
      // ---------------------------------------------------

      // Mock implementation for UI testing
      return new Promise((resolve) => {
        setTimeout(() => {
          setIsConverting(false);
          resolve({
            downloadUrl: '#',
            isMock: true
          });
        }, 2000);
      });

    } catch (err) {
      setIsConverting(false);
      throw new Error('Conversion failed. Please try again later.');
    }
  };

  const resultComponent = (result) => (
    <Box>
      {result.isMock ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          This is a demo. In production, the PowerPoint would be converted by a backend service.
        </Alert>
      ) : (
        <Alert severity="success" sx={{ mb: 2 }}>
          PowerPoint converted to PDF successfully!
        </Alert>
      )}

      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-presentation.pdf"
        disabled={result.isMock}
      >
        Download PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="PowerPoint to PDF"
      description="Convert PowerPoint presentations (.ppt, .pptx) to PDF files"
      acceptedFileTypes={[
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'application/vnd.ms-powerpoint' // .ppt
      ]}
      actionButtonText={isConverting ? <><CircularProgress size={18} sx={{ mr: 1 }} /> Converting...</> : 'Convert to PDF'}
      onProcess={handleProcess}
      resultComponent={resultComponent}
    />
  );
};

export default PowerPointToPDF;
