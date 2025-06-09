import React, { useState } from 'react';
import {
  Box,
  Button,
  Alert,
  Grid,
  Slider,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const PDFToJPG = () => {
  const [quality, setQuality] = useState(80);
  const [selectedPages, setSelectedPages] = useState('all');

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);
    const pageCount = pdfDoc.getPageCount();

    // Decide which pages to include in image conversion
    let pagesToConvert = [];
    if (selectedPages === 'all') {
      pagesToConvert = Array.from({ length: pageCount }, (_, i) => i);
    } else if (selectedPages === 'first') {
      pagesToConvert = [0];
    } else if (selectedPages === 'last') {
      pagesToConvert = [pageCount - 1];
    }

    // 📌 In production:
    // 1. Send fileBytes, quality, and selectedPages to backend.
    // 2. Use `pdf2image`, `poppler`, `pdftoppm`, or similar for server-side JPG conversion.
    // 3. Return a zip archive of JPGs.

    return {
      downloadUrl: '#',
      isMock: true,
      pageCount: pagesToConvert.length
    };
  };

  const additionalOptions = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>JPEG Quality: {quality}%</Typography>
        <Slider
          value={quality}
          onChange={(e, newValue) => setQuality(newValue)}
          min={10}
          max={100}
          step={1}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="page-select-label">Pages to Convert</InputLabel>
          <Select
            labelId="page-select-label"
            value={selectedPages}
            label="Pages to Convert"
            onChange={(e) => setSelectedPages(e.target.value)}
          >
            <MenuItem value="all">All Pages</MenuItem>
            <MenuItem value="first">First Page Only</MenuItem>
            <MenuItem value="last">Last Page Only</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const resultComponent = (result) => (
    <Box>
      {result.isMock ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          In production, this would convert {result.pageCount} page(s) to JPG images
          and generate a downloadable ZIP file. This is a frontend demo only.
        </Alert>
      ) : (
        <Alert severity="success" sx={{ mb: 2 }}>
          Successfully converted {result.pageCount} page(s) to JPG!
        </Alert>
      )}

      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-images.zip"
        disabled={result.isMock}
      >
        Download JPG Images
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="PDF to JPG"
      description="Convert PDF pages to high-quality JPG images"
      actionButtonText="Convert to JPG"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default PDFToJPG;
