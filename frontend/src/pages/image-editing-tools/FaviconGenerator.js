import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Alert,
  Grid,
  TextField,
  Paper,
  Slider
} from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';

const FaviconGenerator = () => {
  const [faviconSize, setFaviconSize] = useState(64);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // Handle File Change (Image Upload)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Real favicon generation using canvas
  const handleGenerate = async () => {
    if (!file) {
      return;
    }

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      const sizes = [16, 32, 64, 128, 256];
      const favicons = [];

      sizes.forEach((size) => {
        canvas.width = size;
        canvas.height = size;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size); // Fill background color
        ctx.drawImage(img, 0, 0, size, size); // Draw image

        // If text is provided, add it to the canvas
        if (text) {
          ctx.fillStyle = '#000000'; // Text color (black)
          ctx.font = `${size / 4}px Arial`; // Adjust font size based on image size
          ctx.fillText(text, size / 8, size / 2); // Position the text
        }

        // Convert canvas to .ico format (Data URL)
        favicons.push(canvas.toDataURL('image/x-icon'));
      });

      setResult({
        sizes: sizes,
        favicons: favicons
      });
    };

    img.src = URL.createObjectURL(file); // Load the uploaded image file
  };

  // Additional Options for favicon size and color
  const additionalOptions = () => (
    <Box>
      <Typography gutterBottom>Favicon Size: {faviconSize}x{faviconSize}px</Typography>
      <Slider
        value={faviconSize}
        onChange={(e, newValue) => setFaviconSize(newValue)}
        min={16}
        max={256}
        step={16}
        marks={[
          { value: 16, label: '16px' },
          { value: 32, label: '32px' },
          { value: 64, label: '64px' },
          { value: 128, label: '128px' },
          { value: 256, label: '256px' }
        ]}
        valueLabelDisplay="auto"
      />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Background Color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Text (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <input type="file" onChange={handleFileChange} accept="image/*" />
    </Box>
  );

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Favicon generated in {result.sizes.join(', ')} sizes
      </Alert>

      <Grid container spacing={2}>
        {result.sizes.map((size, index) => (
          <Grid item xs={4} key={index}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Box sx={{ 
                width: '100%',
                height: '100px',
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}>
                <img src={result.favicons[index]} alt={`favicon-${size}`} />
              </Box>
              <Typography variant="body2">{size}x{size}</Typography>
              <Button 
                size="small" 
                component="a"
                href={result.favicons[index]}
                download={`favicon-${size}.ico`}
              >
                Download
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ImageToolBase
      title="Favicon Generator"
      description="Create favicons from images or generate simple text favicons"
      maxFileSize={2}
      actionButtonText="Generate Favicon"
      onProcess={handleGenerate}
      additionalOptions={additionalOptions}
      resultComponent={resultComponent}
    />
  );
};

export default FaviconGenerator;
