import React from 'react';
import { Box, Button, Alert, Typography } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const MergePDF = () => {
  const handleProcess = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);

    return {
      downloadUrl,
      fileSizeKB: (blob.size / 1024).toFixed(2),
      fileName: 'merged-document.pdf'
    };
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        PDFs merged successfully!
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
        aria-label="Download Merged PDF"
      >
        Download {result.fileName}
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Merge PDFs"
      description="Combine multiple PDF files into a single document. Upload your PDFs in the desired order and click 'Merge PDFs' to combine them."
      maxFiles={10}
      actionButtonText="Merge PDFs"
      onProcess={handleProcess}
      resultComponent={resultComponent}
    />
  );
};

export default MergePDF;
