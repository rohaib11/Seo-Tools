import React, { useState } from 'react';
import { Box, Button, Alert, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const SplitPDF = () => {
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(null);

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(fileBytes);
    const pageCount = originalPdf.getPageCount();
    setTotalPages(pageCount);

    const ranges = pageRange.split(',').map(r => r.trim());
    const pagesToExtract = new Set();

    for (const range of ranges) {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
          throw new Error(`Invalid range: ${range}`);
        }
        for (let i = start; i <= end; i++) {
          pagesToExtract.add(i - 1);
        }
      } else if (range) {
        const page = Number(range);
        if (!isNaN(page) && page >= 1 && page <= pageCount) {
          pagesToExtract.add(page - 1);
        } else {
          throw new Error(`Invalid page: ${range}`);
        }
      }
    }

    const pages = pageRange 
      ? Array.from(pagesToExtract).sort((a, b) => a - b)
      : Array.from({ length: pageCount }, (_, i) => i);

    if (pages.length === 0) {
      throw new Error('No valid pages selected');
    }

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(originalPdf, pages);
    copiedPages.forEach(page => newPdf.addPage(page));

    const splitPdfBytes = await newPdf.save();

    return {
      downloadUrl: URL.createObjectURL(new Blob([splitPdfBytes], { type: 'application/pdf' })),
      selectedPages: pages.length,
      totalPages: pageCount
    };
  };

  const additionalOptions = () => (
    <Box>
      <TextField
        label="Pages to Extract (e.g., 1-3,5,7-9)"
        value={pageRange}
        onChange={(e) => setPageRange(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        helperText={totalPages ? `PDF has ${totalPages} pages.` : 'Upload a PDF to detect page count.'}
      />
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        PDF split successfully! Extracted {result.selectedPages} page(s) from {result.totalPages}.
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="split-document.pdf"
      >
        Download Extracted Pages
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Split PDF"
      description="Extract specific pages from a PDF document"
      actionButtonText="Split PDF"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default SplitPDF;
