import React, { useState } from 'react';
import { Box, Button, Alert, TextField, Grid } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const LockPDF = () => {
  const [userPassword, setUserPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [error, setError] = useState('');

  const handleProcess = async (files) => {
    if (!userPassword && !ownerPassword) {
      setError('Please provide at least one password (User or Owner).');
      throw new Error('No password provided');
    }

    setError('');
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);

    const encryptedPdfBytes = await pdfDoc.save({
      userPassword: userPassword || undefined,
      ownerPassword: ownerPassword || undefined,
      permissions: {
        printing: 'lowResolution',
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      }
    });

    return {
      downloadUrl: URL.createObjectURL(new Blob([encryptedPdfBytes], { type: 'application/pdf' }))
    };
  };

  const additionalOptions = () => (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="User Password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            helperText="Required to open the PDF"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Owner Password"
            type="password"
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            helperText="Used to change security permissions"
          />
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        ✅ PDF secured successfully! Make sure to save your password(s).
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="secured-document.pdf"
      >
        Download Secured PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Lock PDF"
      description="Add password protection to your PDF file"
      actionButtonText="Secure PDF"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default LockPDF;
