import React, { useState } from 'react';
import {
  Box,
  Button,
  Alert,
  Grid,
  Select,
  MenuItem,
  Typography,
  Slider,
  FormControl,
  InputLabel
} from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const JPGToPDF = () => {
  const [pageSize, setPageSize] = useState('a4');
  const [margin, setMargin] = useState(20);
  const [orientation, setOrientation] = useState('portrait');

  const handleProcess = async (files) => {
    const pdfDoc = await PDFDocument.create();

    const sizes = {
      a4: { width: 595, height: 842 },
      letter: { width: 612, height: 792 },
      legal: { width: 612, height: 1008 }
    };

    const selectedSize = sizes[pageSize];
    const isLandscape = orientation === 'landscape';
    const width = isLandscape ? selectedSize.height : selectedSize.width;
    const height = isLandscape ? selectedSize.width : selectedSize.height;

    for (const file of files) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) continue;

      const imageBytes = await file.arrayBuffer();
      let image;

      if (file.type === 'image/jpeg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      }

      const page = pdfDoc.addPage([width, height]);
      const { width: imgW, height: imgH } = image.scale(1);
      const availW = width - margin * 2;
      const availH = height - margin * 2;
      const ratio = Math.min(availW / imgW, availH / imgH);

      page.drawImage(image, {
        x: margin + (availW - imgW * ratio) / 2,
        y: margin + (availH - imgH * ratio) / 2,
        width: imgW * ratio,
        height: imgH * ratio
      });
    }

    const pdfBytes = await pdfDoc.save();
    return {
      downloadUrl: URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
    };
  };

  const additionalOptions = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Page Size</InputLabel>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            label="Page Size"
          >
            <MenuItem value="a4">A4</MenuItem>
            <MenuItem value="letter">Letter</MenuItem>
            <MenuItem value="legal">Legal</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Orientation</InputLabel>
          <Select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            label="Orientation"
          >
            <MenuItem value="portrait">Portrait</MenuItem>
            <MenuItem value="landscape">Landscape</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography gutterBottom>Margin (px): {margin}</Typography>
        <Slider
          value={margin}
          onChange={(e, newValue) => setMargin(newValue)}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        PDF created successfully!
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="converted-document.pdf"
      >
        Download PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="JPG to PDF"
      description="Convert JPG and PNG images into a neatly formatted PDF"
      maxFiles={20}
      acceptedFileTypes={['image/jpeg', 'image/png']}
      actionButtonText="Create PDF"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default JPGToPDF;
