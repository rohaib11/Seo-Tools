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
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const BinaryDecoder = () => {
  const [binary, setBinary] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setOutput('');
    setError('');
  };

  const handleBinaryChange = (e) => {
    const input = e.target.value;
    setBinary(input);
    if (input === '') {
      setOutput('');
      setError('');
      return;
    }
    try {
      let result;
      if (tabValue === 0) {
        result = binaryToText(input);
      } else if (tabValue === 1) {
        result = binaryToDecimal(input);
      } else {
        result = binaryToHex(input);
      }
      setOutput(result);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const binaryToText = (str) => {
    // Remove all whitespace
    const cleanStr = str.replace(/\s+/g, '');
    
    // Check if the string contains only 0s and 1s
    if (!/^[01]+$/.test(cleanStr)) {
      throw new Error('Invalid binary characters');
    }
    
    // Split into 8-bit chunks
    const chunks = cleanStr.match(/.{1,8}/g) || [];
    
    // Convert each chunk to a character
    return chunks.map(chunk => {
      // Pad with zeros if necessary
      const byte = chunk.padEnd(8, '0').substring(0, 8);
      return String.fromCharCode(parseInt(byte, 2));
    }).join('');
  };

  const binaryToDecimal = (str) => {
    // Remove all whitespace
    const cleanStr = str.replace(/\s+/g, '');
    
    // Check if the string contains only 0s and 1s
    if (!/^[01]+$/.test(cleanStr)) {
      throw new Error('Invalid binary characters');
    }
    
    return parseInt(cleanStr, 2).toString();
  };

  const binaryToHex = (str) => {
    // Remove all whitespace
    const cleanStr = str.replace(/\s+/g, '');
    
    // Check if the string contains only 0s and 1s
    if (!/^[01]+$/.test(cleanStr)) {
      throw new Error('Invalid binary characters');
    }
    
    // Pad with zeros to make length a multiple of 4
    const paddedStr = cleanStr.padStart(Math.ceil(cleanStr.length / 4) * 4, '0');
    
    // Split into 4-bit chunks
    const chunks = paddedStr.match(/.{1,4}/g) || [];
    
    // Convert each chunk to hex
    return chunks.map(chunk => {
      return parseInt(chunk, 2).toString(16).toUpperCase();
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setBinary('');
    setOutput('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary Decoder
        </Typography>
        <Typography variant="body1" paragraph>
          Decode binary code to text, decimal, or hexadecimal format.
        </Typography>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Text" />
          <Tab label="Decimal" />
          <Tab label="HEX" />
        </Tabs>

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
              label={
                tabValue === 0 ? "Text Output" : 
                tabValue === 1 ? "Decimal Output" : "HEX Output"
              }
              multiline
              rows={4}
              value={output}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy Output">
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
            Binary Decoding Options
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Text:</strong> Converts 8-bit binary segments to ASCII characters
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Decimal:</strong> Converts the entire binary number to decimal
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>HEX:</strong> Converts 4-bit binary segments to hexadecimal digits
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryDecoder;