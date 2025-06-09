import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Slider, IconButton, Alert, Grid, Divider, TextField } from '@mui/material';
import { PlayArrow, Pause, Delete } from '@mui/icons-material';

const MP4ToGIFConverter = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.includes('video/')) {
      setError('Please upload a video file (MP4, WebM, etc.)');
      return;
    }

    // Validate file size
    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size exceeds 50MB limit');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);

    // Get video duration once metadata is loaded
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      setDuration(video.duration);
      setEndTime(Math.min(5, video.duration));
    };
    video.src = URL.createObjectURL(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setDuration(0);
    setStartTime(0);
    setEndTime(5);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a video file first');
      return;
    }

    if (endTime <= startTime) {
      setError('End time must be after start time');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Mock conversion - in real app, you would use a library or backend service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setResult({
        gifUrl: previewUrl, // In real app, this would be the generated GIF
        duration: (endTime - startTime).toFixed(1),
        size: '500KB' // Mock size
      });
    } catch (err) {
      setError(err.message || 'An error occurred during conversion');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        MP4 to GIF Converter
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {!file ? (
              <>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="video-upload"
                />
                <Button
                  variant="contained"
                  component="label"
                  htmlFor="video-upload"
                  sx={{ mb: 2 }}
                >
                  Upload Video
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Max file size: 50MB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supported formats: MP4, WebM, MOV
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '4px',
                    }}
                    controls={false}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton
                      onClick={togglePlayPause}
                      sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.7)',
                        },
                      }}
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </Box>
                  <IconButton
                    onClick={handleRemoveFile}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Delete color="error" />
                  </IconButton>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {file.name}
                </Typography>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {file && (
            <>
              <Typography gutterBottom>Select GIF Duration</Typography>
              <Box sx={{ mb: 3 }}>
                <Slider
                  value={[startTime, endTime]}
                  onChange={(e, newValue) => {
                    setStartTime(newValue[0]);
                    setEndTime(newValue[1]);
                  }}
                  min={0}
                  max={duration}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value.toFixed(1)}s`}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    label="Start Time (s)"
                    type="number"
                    value={startTime}
                    onChange={(e) => setStartTime(parseFloat(e.target.value))}
                    inputProps={{ min: 0, max: endTime - 0.1, step: 0.1 }}
                    size="small"
                    sx={{ width: '48%' }}
                  />
                  <TextField
                    label="End Time (s)"
                    type="number"
                    value={endTime}
                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                    inputProps={{ min: startTime + 0.1, max: duration, step: 0.1 }}
                    size="small"
                    sx={{ width: '48%' }}
                  />
                </Box>
              </Box>
            </>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleConvert}
            disabled={!file || isProcessing}
          >
            {isProcessing ? 'Creating GIF...' : 'Create GIF'}
          </Button>

          {result && (
            <>
              <Divider sx={{ my: 3 }} />
              <Alert severity="success" sx={{ mb: 2 }}>
                GIF created successfully! Duration: {result.duration}s, Size: {result.size}
              </Alert>

              <Box
                sx={{
                  backgroundColor: 'grey.200',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Typography>GIF Preview (mock)</Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                component="a"
                href={result.gifUrl}
                download="converted.gif"
              >
                Download GIF
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MP4ToGIFConverter;
