import React, { useState } from 'react';
import { Box, Button, Alert, TextField, Slider, Typography, Grid } from '@mui/material';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const WatermarkPDF = () => {
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(50);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(48);

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const [r, g, b] = hexToRgb(color);

    pages.forEach(page => {
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(text, size);
      const textHeight = font.heightAtSize(size);

      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
        size,
        font,
        color: rgb(r / 255, g / 255, b / 255),
        opacity: opacity / 100,
        rotate: { type: 'degrees', angle: 45 }
      });
    });

    const watermarkedPdfBytes = await pdfDoc.save();
    return {
      downloadUrl: URL.createObjectURL(new Blob([watermarkedPdfBytes], { type: 'application/pdf' }))
    };
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const additionalOptions = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Watermark Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Opacity</Typography>
        <Slider
          value={opacity}
          onChange={(e, newValue) => setOpacity(newValue)}
          min={10}
          max={100}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Font Size</Typography>
        <Slider
          value={size}
          onChange={(e, newValue) => setSize(newValue)}
          min={12}
          max={120}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Color</Typography>
        <TextField
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        ✅ Watermark added successfully!
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="watermarked-document.pdf"
      >
        Download Watermarked PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Watermark PDF"
      description="Add a custom text watermark diagonally to your PDF file"
      actionButtonText="Add Watermark"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default WatermarkPDF;
