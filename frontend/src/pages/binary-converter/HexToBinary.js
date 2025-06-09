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

const HexToBinary = () => {
  const [hex, setHex] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleHexChange = (e) => {
    const input = e.target.value;
    setHex(input);
    if (input === '') {
      setBinary('');
      setError('');
      return;
    }
    try {
      const binaryStr = hexToBinary(input);
      setBinary(binaryStr);
      setError('');
    } catch (err) {
      setError('Invalid HEX input. Only 0-9 and A-F are allowed (case insensitive).');
    }
  };

  const hexToBinary = (str) => {
    // Remove all whitespace and convert to uppercase
    const cleanStr = str.replace(/\s+/g, '').toUpperCase();
    
    // Check if the string contains only valid HEX characters
    if (!/^[0-9A-F]+$/.test(cleanStr)) {
      throw new Error('Invalid HEX characters');
    }
    
    // Convert each character to 4-bit binary
    return cleanStr.split('').map(char => {
      return parseInt(char, 16).toString(2).padStart(4, '0');
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(binary);
  };

  const handleClear = () => {
    setHex('');
    setBinary('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          HEX to Binary Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert hexadecimal (HEX) code to binary representation. Each HEX digit is converted to 4 bits.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter HEX"
              multiline
              rows={4}
              value={hex}
              onChange={handleHexChange}
              variant="outlined"
              placeholder="Enter HEX code (e.g., 48 65 6C 6C 6F)..."
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
            HEX to Binary Conversion Table
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>HEX</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Binary</th>
              </tr>
            </thead>
            <tbody>
              {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
                .map((hexChar) => (
                  <tr key={hexChar}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hexChar}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {parseInt(hexChar, 16).toString(2).padStart(4, '0')}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HexToBinary;