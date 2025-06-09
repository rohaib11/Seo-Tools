import React, { useState } from 'react';
import { Box, Button, Alert, Typography, MenuItem, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const RotatePDF = () => {
  const [rotation, setRotation] = useState(90);

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);

    const pages = pdfDoc.getPages();
    pages.forEach(page => {
      const currentAngle = page.getRotation().angle || 0;
      page.setRotation((currentAngle + rotation) % 360);
    });

    const rotatedPdfBytes = await pdfDoc.save();
    const blob = new Blob([rotatedPdfBytes], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);

    return {
      downloadUrl,
      fileSizeKB: (blob.size / 1024).toFixed(2),
      fileName: `rotated-${file.name}`
    };
  };

  const additionalOptions = () => (
    <TextField
      select
      label="Rotation Angle"
      value={rotation}
      onChange={(e) => setRotation(Number(e.target.value))}
      fullWidth
      variant="outlined"
      aria-label="Select rotation angle"
    >
      <MenuItem value={90}>90° Clockwise</MenuItem>
      <MenuItem value={180}>180°</MenuItem>
      <MenuItem value={270}>90° Counter-Clockwise</MenuItem>
    </TextField>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        PDF rotated successfully!
      </Alert>

      <Typography variant="body2" sx={{ mb: 1 }}>
        File Size: {result.fileSizeKB} KB
      </Typography>

      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download={result.fileName}
        aria-label="Download rotated PDF"
      >
        Download {result.fileName}
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Rotate PDF"
      description="Rotate all pages in a PDF document by 90°, 180°, or 270°. Upload one PDF and choose a rotation angle."
      actionButtonText="Rotate PDF"
      maxFiles={1}
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default RotatePDF;
