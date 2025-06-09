import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Container, Paper, Button, IconButton,
  Grid, Divider, Alert, CircularProgress, Chip, LinearProgress, Tooltip
} from '@mui/material';
import { Upload as UploadIcon, Delete as DeleteIcon, PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';

const PDFToolBase = ({
  title,
  description,
  maxFiles = 1,
  actionButtonText = 'Process',
  onProcess,
  additionalOptions,
  resultComponent
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (files.length) setResult(null);
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const invalidFiles = selectedFiles.filter(file => file.type !== 'application/pdf');
    if (invalidFiles.length) {
      setError('Please upload only PDF files');
      return;
    }

    if (maxFiles > 1 && selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setError(null);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file)
    })));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files: droppedFiles } });
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviews(newPreviews);
    if (!newFiles.length && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcess = async () => {
    if (!files.length) {
      setError('Please select at least one file');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await onProcess(files);
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
                justifyContent: 'center',
                minHeight: '300px',
                cursor: 'pointer'
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple={maxFiles > 1}
                aria-label="Upload PDF file"
              />
              {!files.length ? (
                <>
                  <UploadIcon fontSize="large" color="primary" />
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {maxFiles > 1 ? `Upload or drag up to ${maxFiles} PDF files` : 'Upload or drag a PDF file'}
                  </Typography>
                </>
              ) : (
                <>
                  <Box sx={{ maxHeight: '400px', overflow: 'auto', mb: 2 }}>
                    {previews.map((preview, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2, position: 'relative' }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Tooltip title="PDF File">
                            <PictureAsPdfIcon color="action" />
                          </Tooltip>
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {preview.name}
                          </Typography>
                          <Chip
                            label={`${(preview.size / 1024).toFixed(2)} KB`}
                            size="small"
                            variant="outlined"
                          />
                          <IconButton onClick={() => handleRemoveFile(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleRemoveAll}
                    size="small"
                  >
                    Remove All
                  </Button>
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

            {isProcessing && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Processing PDF...
                </Typography>
                <LinearProgress />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleProcess}
              disabled={!files.length || isProcessing}
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

export default PDFToolBase;
