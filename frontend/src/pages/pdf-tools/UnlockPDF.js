import React, { useState } from 'react';
import { Box, Button, Alert, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const UnlockPDF = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();

    try {
      const pdfDoc = await PDFDocument.load(fileBytes, { password });
      const unlockedPdfBytes = await pdfDoc.save();
      setErrorMessage(''); // Clear any previous error

      return {
        downloadUrl: URL.createObjectURL(new Blob([unlockedPdfBytes], { type: 'application/pdf' }))
      };
    } catch (err) {
      setErrorMessage('❌ Failed to unlock PDF. Check if the password is correct.');
      throw err; // Let PDFToolBase handle alert as well if needed
    }
  };

  const additionalOptions = () => (
    <>
      <TextField
        label="PDF Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        ✅ PDF unlocked successfully!
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="unlocked-document.pdf"
      >
        Download Unlocked PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Unlock PDF"
      description="Remove password protection from PDF files"
      actionButtonText="Unlock PDF"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default UnlockPDF;
