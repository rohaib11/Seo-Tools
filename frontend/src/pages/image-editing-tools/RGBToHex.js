import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import ColorThief from 'colorthief'; // Import ColorThief
import ImageToolBase from '../../components/ImageToolBase';

const RGBToHex = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [hexValue, setHexValue] = useState('');

  const handleColorPick = (file) => {
    return new Promise((resolve, reject) => {
      // Create an image element to load the file
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        try {
          // Use ColorThief to extract the dominant color from the image
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);
          
          // Convert the color to RGB and HEX
          const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          const hex = `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
          
          setSelectedColor({ rgb, hex });
          setHexValue(hex); // Set the HEX value

          resolve({ rgb, hex });
        } catch (error) {
          reject('Failed to extract colors from image');
        }
      };
      img.onerror = () => reject('Failed to load image');
    });
  };

  const resultComponent = (color) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Extracted Color
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: color.rgb,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <Typography>{color.rgb}</Typography>
            <Typography>{color.hex}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => navigator.clipboard.writeText(color.hex)}
      >
        Copy HEX to Clipboard
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="RGB to HEX Converter"
      description="Extract colors from your image and convert between RGB and HEX"
      maxFileSize={5}
      actionButtonText="Extract Colors"
      onProcess={handleColorPick}
      resultComponent={resultComponent}
    />
  );
};

export default RGBToHex;
