import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Slider, Alert, IconButton, TextField, Container, Paper } from '@mui/material';
import { RotateLeft, RotateRight} from '@mui/icons-material';

const CropImage = () => {
  const [rotation, setRotation] = useState(0); // Rotation state
  const [zoom, setZoom] = useState(100); // Zoom level state
  const [image, setImage] = useState(null); // Loaded image state
  const [croppedImage, setCroppedImage] = useState(null); // Cropped image state
  const canvasRef = useRef(null); // Reference for the canvas element
  const [startX, setStartX] = useState(0); // X position of the crop
  const [startY, setStartY] = useState(0); // Y position of the crop
  const [width, setWidth] = useState(300); // Width of the crop
  const [height, setHeight] = useState(300); // Height of the crop
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          drawImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const drawImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = zoom / 100;

    // Set canvas size based on zoom level
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Clear the canvas before drawing the new image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate and draw the image on the canvas
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(
      img,
      -img.width / 2 * scale,
      -img.height / 2 * scale,
      img.width * scale,
      img.height * scale
    );
    ctx.restore();
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');

    // Crop the area from the main canvas
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    croppedCtx.drawImage(
      canvas,
      startX,
      startY,
      width,
      height,
      0,
      0,
      width,
      height
    );

    // Convert the cropped canvas to an image URL
    const croppedImageUrl = croppedCanvas.toDataURL();
    setCroppedImage(croppedImageUrl);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setDragging(true);
    setDragStartX(e.clientX - rect.left);
    setDragStartY(e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const deltaX = x - dragStartX;
      const deltaY = y - dragStartY;

      setStartX(startX + deltaX);
      setStartY(startY + deltaY);
      setDragStartX(x);
      setDragStartY(y);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const additionalOptions = () => (
    <Box>
      <Typography gutterBottom>Rotation: {rotation}°</Typography>
      <Slider
        value={rotation}
        onChange={(e, newValue) => {
          setRotation(newValue);
          if (image) drawImage(image);
        }}
        min={-180}
        max={180}
        step={1}
        valueLabelDisplay="auto"
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
        <IconButton onClick={() => setRotation(r => r - 90)}>
          <RotateLeft />
        </IconButton>
        <IconButton onClick={() => setRotation(r => r + 90)}>
          <RotateRight />
        </IconButton>
      </Box>

      <Typography gutterBottom>Zoom: {zoom}%</Typography>
      <Slider
        value={zoom}
        onChange={(e, newValue) => {
          setZoom(newValue);
          if (image) drawImage(image);
        }}
        min={10}
        max={300}
        step={5}
        valueLabelDisplay="auto"
      />

      <Typography gutterBottom>Crop Area</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Start X"
          type="number"
          value={startX}
          onChange={(e) => setStartX(e.target.value)}
          sx={{ width: '48%' }}
        />
        <TextField
          label="Start Y"
          type="number"
          value={startY}
          onChange={(e) => setStartY(e.target.value)}
          sx={{ width: '48%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <TextField
          label="Width"
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          sx={{ width: '48%' }}
        />
        <TextField
          label="Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          sx={{ width: '48%' }}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={handleCrop}>
        Crop Image
      </Button>
    </Box>
  );

  const resultComponent = () => (
    <Box>
      {croppedImage && (
        <>
          <Alert severity="success" sx={{ mb: 3 }}>
            Image cropped successfully!
          </Alert>
          <img src={croppedImage} alt="Cropped Image" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          <Button
            variant="contained"
            color="success"
            fullWidth
            component="a"
            href={croppedImage}
            download="cropped-image.jpg"
          >
            Download Cropped Image
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Image Cropper
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Crop and rotate your images with precision
        </Typography>

        <Box sx={{ mb: 3 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <Button variant="contained" component="label" htmlFor="image-upload">
            Upload Image
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {image && (
            <canvas
              ref={canvasRef}
              width="500"
              height="500"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          {additionalOptions()}
          {resultComponent()}
        </Box>
      </Paper>
    </Container>
  );
};

export default CropImage;
