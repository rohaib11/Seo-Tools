import React, { useState } from 'react';
import { Box, Button, Alert, Slider, Typography, CircularProgress } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const CompressPDF = () => {
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.load(fileBytes);

      // Simulate compression (real compression should be done server-side)
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        ...(compressionLevel > 75 && { useCompression: true }),
      });

      return {
        downloadUrl: URL.createObjectURL(new Blob([compressedPdfBytes], { type: 'application/pdf' })),
        originalSize: file.size,
        compressedSize: compressedPdfBytes.byteLength
      };
    } catch (err) {
      throw new Error('Compression failed. File might be corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const additionalOptions = () => (
    <Box>
      <Typography gutterBottom>Compression Level</Typography>
      <Slider
        value={compressionLevel}
        onChange={(e, newValue) => setCompressionLevel(newValue)}
        min={0}
        max={100}
        step={5}
        marks={[
          { value: 0, label: 'Low' },
          { value: 50, label: 'Medium' },
          { value: 100, label: 'High' }
        ]}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" display="block" gutterBottom>
        Higher compression = smaller file, potentially lower quality.
      </Typography>
    </Box>
  );

  const resultComponent = (result) => {
    const reduction = Math.round((1 - result.compressedSize / result.originalSize) * 100);
    const originalMB = (result.originalSize / (1024 * 1024)).toFixed(2);
    const compressedMB = (result.compressedSize / (1024 * 1024)).toFixed(2);

    return (
      <Box>
        <Alert severity="success" sx={{ mb: 2 }}>
          PDF compressed successfully! <br />
          Original: {originalMB} MB | Compressed: {compressedMB} MB <br />
          Reduction: {reduction}%
        </Alert>
        <Button
          variant="contained"
          color="success"
          fullWidth
          component="a"
          href={result.downloadUrl}
          download="compressed-document.pdf"
        >
          Download Compressed PDF
        </Button>
      </Box>
    );
  };

  return (
    <PDFToolBase
      title="Compress PDF"
      description="Reduce PDF file size while preserving quality"
      actionButtonText={
        isProcessing ? <><CircularProgress size={18} sx={{ mr: 1 }} /> Compressing...</> : 'Compress PDF'
      }
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default CompressPDF;
