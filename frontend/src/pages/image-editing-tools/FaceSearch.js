import React from 'react';  // Removed useState import as it wasn't being used
import { 
  Box, 
  Typography, 
  Alert, 
  Button, 
  Grid, 
  Paper 
} from '@mui/material';
import { Face as FaceIcon, Search as SearchIcon } from '@mui/icons-material';
import ImageToolBase from '../../components/ImageToolBase';

const FaceSearch = () => {
  const handleSearch = async (file) => {
    // Mock implementation for face detection
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          facesDetected: 3,
          sampleResults: [
            { name: 'John Doe', confidence: '92%', source: 'Social Media' },
            { name: 'Jane Smith', confidence: '85%', source: 'Public Records' },
            { name: 'Unknown', confidence: '78%', source: 'Online Database' }
          ]
        });
      }, 3000);
    });
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        {result.facesDetected} face(s) detected in the image
      </Alert>

      <Typography variant="h6" gutterBottom>
        Possible Matches
      </Typography>

      <Grid container spacing={2}>
        {result.sampleResults.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Box
                sx={{
                  height: '100px',
                  backgroundColor: 'grey.200',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaceIcon fontSize="large" color="disabled" />
              </Box>
              <Typography variant="subtitle1">{match.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Confidence: {match.confidence}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Source: {match.source}
              </Typography>
              <Button size="small" sx={{ mt: 1 }} startIcon={<SearchIcon />}>
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ImageToolBase
      title="Face Search"
      description="Upload an image to search for matching faces in public databases"
      maxFileSize={5}
      actionButtonText="Search Faces"
      onProcess={handleSearch}
      resultComponent={resultComponent}
    />
  );
};

export default FaceSearch;
