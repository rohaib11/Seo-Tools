import React, { useState } from 'react';
import { Box, Button, Alert, Grid, Select, MenuItem, Typography,  FormControlLabel, Checkbox } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import PDFToolBase from '../../components/PDFToolBase';

const ResizePDF = () => {
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [scaleContent, setScaleContent] = useState(true);

  const handleProcess = async (files) => {
    const file = files[0];
    const fileBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(fileBytes);
    const resizedPdf = await PDFDocument.create();

    const sizes = {
      a4: { width: 595, height: 842 },
      letter: { width: 612, height: 792 },
      legal: { width: 612, height: 1008 },
      a5: { width: 420, height: 595 }
    };

    const isLandscape = orientation === 'landscape';
    const selectedSize = sizes[pageSize];
    const newWidth = isLandscape ? selectedSize.height : selectedSize.width;
    const newHeight = isLandscape ? selectedSize.width : selectedSize.height;

    const pages = originalPdf.getPages();
    for (const [index, page] of pages.entries()) {
      const { width, height } = page.getSize();
      const [copiedPage] = await resizedPdf.copyPages(originalPdf, [index]);
      const resizedPage = resizedPdf.addPage([newWidth, newHeight]);

      if (scaleContent) {
        const scaleX = newWidth / width;
        const scaleY = newHeight / height;
        const scale = Math.min(scaleX, scaleY);
        const x = (newWidth - width * scale) / 2;
        const y = (newHeight - height * scale) / 2;

        resizedPage.drawPage(copiedPage, {
          x,
          y,
          xScale: scale,
          yScale: scale
        });
      } else {
        resizedPage.drawPage(copiedPage, {
          x: 0,
          y: 0
        });
      }
    }

    const resizedBytes = await resizedPdf.save();
    return {
      downloadUrl: URL.createObjectURL(new Blob([resizedBytes], { type: 'application/pdf' })),
      newSize: `${newWidth} x ${newHeight} pts`,
      scaleUsed: scaleContent ? 'Scaled to fit' : 'Original content size'
    };
  };

  const additionalOptions = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Page Size</Typography>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="a4">A4</MenuItem>
          <MenuItem value="letter">Letter</MenuItem>
          <MenuItem value="legal">Legal</MenuItem>
          <MenuItem value="a5">A5</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Orientation</Typography>
        <Select
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="portrait">Portrait</MenuItem>
          <MenuItem value="landscape">Landscape</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={scaleContent}
              onChange={(e) => setScaleContent(e.target.checked)}
            />
          }
          label="Scale content to fit new page size"
        />
      </Grid>
    </Grid>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        PDF resized successfully!<br />
        <strong>New Size:</strong> {result.newSize}<br />
        <strong>Scaling:</strong> {result.scaleUsed}
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        component="a"
        href={result.downloadUrl}
        download="resized-document.pdf"
      >
        Download Resized PDF
      </Button>
    </Box>
  );

  return (
    <PDFToolBase
      title="Resize PDF"
      description="Change PDF page size and optionally scale content to fit"
      actionButtonText="Resize PDF"
      onProcess={handleProcess}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default ResizePDF;
