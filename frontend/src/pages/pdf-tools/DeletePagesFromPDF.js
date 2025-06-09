import React, { useState } from 'react';
import { Box, Button, Alert, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const DeletePagesFromPDF = () => {
  const [pagesToDelete, setPagesToDelete] = useState('');

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);
    const pageCount = pdfDoc.getPageCount();

    // Parse and clean input
    const rawRanges = pagesToDelete.trim().split(',');
    const pagesToRemove = new Set();

    for (const range of rawRanges) {
      const trimmed = range.trim();
      if (!trimmed) continue;

      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        if (isNaN(start) || isNaN(end) || start < 1 || end < 1 || start > end) continue;
        for (let i = start; i <= end; i++) {
          if (i <= pageCount) pagesToRemove.add(i - 1);
        }
      } else {
        const page = Number(trimmed);
        if (!isNaN(page) && page >= 1 && page <= pageCount) {
          pagesToRemove.add(page - 1);
        }
      }
    }

    if (pagesToRemove.size === 0) {
      throw new Error('No valid pages specified for deletion.');
    }

    const remainingPages = Array.from({ length: pageCount }, (_, i) => i)
      .filter(i => !pagesToRemove.has(i));

    if (remainingPages.length === 0) {
      throw new Error('Cannot delete all pages. At least one must remain.');
    }

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, remainingPages);
    copiedPages.forEach(page => newPdf.addPage(page));

    const modifiedPdfBytes = await newPdf.save();
    return {
      downloadUrl: URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' })),
      deleted: pagesToRemove.size,
      total: pageCount
    };
  };

  const additionalOptions = () => (
    <TextField
      label="Pages to Delete (e.g., 1,3-5,7)"
      value={pagesToDelete}
      onChange={(e) => setPagesToDelete(e.target.value)}
      fullWidth
      variant="outlined"
      margin="normal"
      helperText="Separate pages or ranges with commas. Example: 1,3-5,7"
    />
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Deleted {result.deleted} page(s) from {result.total}-page PDF.
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="modified-document.pdf"
      >
        Download Modified PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Delete PDF Pages"
      description="Remove specific pages from a PDF file using ranges like 1,3-5"
      actionButtonText="Delete Pages"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default DeletePagesFromPDF;
