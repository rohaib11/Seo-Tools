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

const BinaryToHEX = () => {
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [error, setError] = useState('');

  const handleBinaryChange = (e) => {
    const input = e.target.value;
    setBinary(input);
    if (input === '') {
      setHex('');
      setError('');
      return;
    }
    try {
      const hexStr = binaryToHex(input);
      setHex(hexStr);
      setError('');
    } catch (err) {
      setError('Invalid binary input. Only 0s and 1s are allowed.');
    }
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
    navigator.clipboard.writeText(hex);
  };

  const handleClear = () => {
    setBinary('');
    setHex('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary to HEX Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert binary code to hexadecimal (HEX) representation. Each 4 bits are converted to one HEX digit.
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
              label="HEX Output"
              multiline
              rows={4}
              value={hex}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy HEX">
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
            Binary to HEX Conversion Table
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Binary</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>HEX</th>
              </tr>
            </thead>
            <tbody>
              {['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', 
                '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111']
                .map((bin, i) => (
                  <tr key={bin}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bin}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.toString(16).toUpperCase()}</td>
                  </tr>
                ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryToHEX;