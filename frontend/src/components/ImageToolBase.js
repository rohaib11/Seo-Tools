// src/components/ImageToolBase.js
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  IconButton, 
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { Upload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ImageToolBase = ({ 
  title, 
  description, 
  maxFileSize = 5, // in MB
  acceptedFileTypes = ['image/jpeg', 'image/png'],
  actionButtonText = 'Process',
  onProcess,
  additionalOptions,
  resultComponent
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Validate file type
    if (!acceptedFileTypes.includes(selectedFile.type)) {
      setError(`Unsupported file type. Please upload ${acceptedFileTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSize}MB limit`);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await onProcess(file);
      setResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during processing');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        
        {description && (
          <Typography variant="body1" color="text.secondary" mb={3}>
            {description}
          </Typography>
        )}

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
                justifyContent: 'center'
              }}
            >
              {!file ? (
                <>
                  <input
                    type="file"
                    accept={acceptedFileTypes.join(',')}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon />}
                    onClick={() => fileInputRef.current.click()}
                    sx={{ mb: 2 }}
                  >
                    Upload Image
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    Max file size: {maxFileSize}MB
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supported formats: {acceptedFileTypes.map(t => t.split('/')[1]).join(', ')}
                  </Typography>
                </>
              ) : (
                <>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '300px', 
                        borderRadius: '4px' 
                      }}
                    />
                    <IconButton
                      onClick={handleRemoveFile}
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        backgroundColor: 'background.paper' 
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {file.name}
                  </Typography>
                  <Chip 
                    label={`${(file.size / 1024).toFixed(2)} KB`} 
                    size="small" 
                    variant="outlined" 
                  />
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {additionalOptions && (
              <>
                {additionalOptions()}
                <Divider sx={{ my: 3 }} />
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
              onClick={handleProcess}
              disabled={!file || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            >
              {isProcessing ? 'Processing...' : actionButtonText}
            </Button>

            {result && (
              <>
                <Divider sx={{ my: 3 }} />
                {resultComponent(result)}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ImageToolBase;