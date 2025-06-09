import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Paper,
  Grid,
  Divider,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const ASCIIToBinary = () => {
  const [ascii, setAscii] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleASCIIChange = (e) => {
    const input = e.target.value;
    setAscii(input);
    if (input === '') {
      setBinary('');
      setError('');
      return;
    }
    try {
      const binaryStr = asciiToBinary(input);
      setBinary(binaryStr);
      setError('');
    } catch (err) {
      setError('Invalid ASCII input. Only numbers 0-255 separated by spaces are allowed.');
    }
  };

  const asciiToBinary = (str) => {
    // Split by whitespace
    const codes = str.trim().split(/\s+/);
    
    return codes.map(code => {
      // Check if it's a valid number
      if (!/^\d+$/.test(code)) {
        throw new Error('Invalid number');
      }
      
      const num = parseInt(code, 10);
      
      // Check if valid ASCII (0-255)
      if (num < 0 || num > 255) {
        throw new Error('ASCII code must be between 0 and 255');
      }
      
      return num.toString(2).padStart(8, '0');
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(binary);
  };

  const handleClear = () => {
    setAscii('');
    setBinary('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          ASCII Codes to Binary
        </Typography>
        <Typography variant="body1" paragraph>
          Convert ASCII code numbers to their 8-bit binary representation.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter ASCII Codes"
              multiline
              rows={4}
              value={ascii}
              onChange={handleASCIIChange}
              variant="outlined"
              placeholder="Enter ASCII codes separated by spaces (e.g., 72 101 108 108 111)..."
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Divider sx={{ my: 2 }} />
            <Tooltip title="Clear All">
              <IconButton onClick={handleClear} color="error" sx={{ mx: 1 }}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Binary Output"
              multiline
              rows={4}
              value={binary}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy Binary">
                    <IconButton onClick={handleCopy} color="primary">
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            ASCII to Binary Conversion
          </Typography>
          <Typography variant="body2" paragraph>
            Each ASCII code (0-255) is converted to its 8-bit binary representation.
          </Typography>
          <Typography variant="body2" paragraph>
            Example: 72 (ASCII for 'H') → 64 + 8 = 72 → 01001000 (binary)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ASCIIToBinary;