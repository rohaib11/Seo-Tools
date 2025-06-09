import React, { useState } from 'react';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import PDFToolBase from '../../components/PDFToolBase';

const ExcelToPDF = () => {
  const [isConverting, setIsConverting] = useState(false);

  const handleProcess = async (files) => {
    setIsConverting(true);

    // ✅ Future integration plan:
    // 1. Upload Excel to backend
    // 2. Convert using e.g., LibreOffice, Pandoc, or unoconv
    // 3. Return PDF file stream URL

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsConverting(false);
        resolve({
          downloadUrl: '#',  // Replace with backend-generated URL
          isMock: true
        });
      }, 2000);
    });
  };

  const resultComponent = (result) => (
    <Box>
      {result.isMock ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          This demo simulates converting Excel to PDF. In production, the backend would return the PDF file.
        </Alert>
      ) : (
        <Alert severity="success" sx={{ mb: 2 }}>
          Excel converted to PDF successfully!
        </Alert>
      )}
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-spreadsheet.pdf"
        disabled={result.isMock}
      >
        Download PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Excel to PDF"
      description="Convert Excel (.xlsx) spreadsheets to downloadable PDF documents"
      acceptedFileTypes={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
      actionButtonText={isConverting ? <CircularProgress size={20} /> : 'Convert to PDF'}
      onProcess={handleProcess}
      resultComponent={resultComponent}
    />
  );
};

export default ExcelToPDF;
