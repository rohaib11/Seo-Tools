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

const BinaryToASCII = () => {
  const [binary, setBinary] = useState('');
  const [ascii, setAscii] = useState('');
  const [error, setError] = useState('');

  const handleBinaryChange = (e) => {
    const input = e.target.value;
    setBinary(input);
    if (input === '') {
      setAscii('');
      setError('');
      return;
    }
    try {
      const asciiStr = binaryToASCII(input);
      setAscii(asciiStr);
      setError('');
    } catch (err) {
      setError('Invalid binary input. Only 0s and 1s are allowed, grouped in 8-digit bytes.');
    }
  };

  const binaryToASCII = (str) => {
    // Remove all whitespace
    const cleanStr = str.replace(/\s+/g, '');
    
    // Check if the string contains only 0s and 1s
    if (!/^[01]+$/.test(cleanStr)) {
      throw new Error('Invalid binary characters');
    }
    
    // Split into 8-bit chunks
    const chunks = cleanStr.match(/.{1,8}/g) || [];
    
    // Convert each chunk to ASCII
    return chunks.map(chunk => {
      // Pad with zeros if necessary
      const byte = chunk.padEnd(8, '0').substring(0, 8);
      const charCode = parseInt(byte, 2);
      
      // Check if valid ASCII (0-127)
      if (charCode > 127) {
        throw new Error('Invalid ASCII code (must be 0-127)');
      }
      
      return charCode.toString();
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ascii);
  };

  const handleClear = () => {
    setBinary('');
    setAscii('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary to ASCII Codes
        </Typography>
        <Typography variant="body1" paragraph>
          Convert binary code (8-bit bytes) to their corresponding ASCII code numbers.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Binary"
              multiline
              rows={4}
              value={binary}
              onChange={handleBinaryChange}
              variant="outlined"
              placeholder="Enter binary code (e.g., 01001000 01101001)..."
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
              label="ASCII Codes"
              multiline
              rows={4}
              value={ascii}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy ASCII Codes">
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
            How Binary to ASCII Conversion Works
          </Typography>
          <Typography variant="body2" paragraph>
            1. The binary input is split into 8-bit chunks (bytes)
          </Typography>
          <Typography variant="body2" paragraph>
            2. Each byte is converted to its decimal equivalent
          </Typography>
          <Typography variant="body2" paragraph>
            3. The decimal value represents the ASCII code
          </Typography>
          <Typography variant="body2" paragraph>
            Example: 01001000 (binary) → 72 (decimal) → 'H' (ASCII character)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryToASCII;