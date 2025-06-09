import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Alert,
  Link,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid
} from '@mui/material';
import { 
  Search as SearchIcon,
  Google as GoogleIcon,
  CameraAlt as CameraIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import ImageToolBase from '../../components/ImageToolBase';

const ReverseImageSearch = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (file) => {
    // Mock implementation - in real app, you would call a reverse image search API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          imageUrl: URL.createObjectURL(file),
          searchLinks: [
            { name: 'Google Images', url: 'https://images.google.com', icon: <GoogleIcon /> },
            { name: 'TinEye', url: 'https://tineye.com', icon: <CameraIcon /> },
            { name: 'Bing Visual Search', url: 'https://www.bing.com/visualsearch', icon: <ImageIcon /> }
          ],
          similarImages: [
            { url: 'https://example.com/similar1.jpg', source: 'Example Site 1' },
            { url: 'https://example.com/similar2.jpg', source: 'Example Site 2' },
            { url: 'https://example.com/similar3.jpg', source: 'Example Site 3' }
          ]
        });
      }, 2000);
    });
  };

  const resultComponent = (results) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search Results
      </Typography>
      
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Search this image on:
        </Typography>
        <List>
          {results.searchLinks.map((link, index) => (
            <ListItem 
              key={index} 
              button 
              component="a" 
              href={link.url} 
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Visually Similar Images
      </Typography>
      
      <Grid container spacing={2}>
        {results.similarImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box 
                sx={{ 
                  height: '150px', 
                  backgroundColor: 'grey.200',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography color="text.secondary">Similar Image {index + 1}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Source: {image.source}
              </Typography>
              <Button 
                size="small" 
                component="a" 
                href={image.url} 
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ImageToolBase
      title="Reverse Image Search"
      description="Upload an image to find where it appears online or find similar images"
      maxFileSize={5}
      actionButtonText="Search Image"
      onProcess={handleSearch}
      resultComponent={resultComponent}
    />
  );
};

export default ReverseImageSearch;
