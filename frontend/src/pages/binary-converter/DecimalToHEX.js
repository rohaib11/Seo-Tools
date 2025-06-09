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

const DecimalToHEX = () => {
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [error, setError] = useState('');

  const handleDecimalChange = (e) => {
    const input = e.target.value;
    setDecimal(input);
    if (input === '') {
      setHex('');
      setError('');
      return;
    }
    try {
      const hexStr = decimalToHex(input);
      setHex(hexStr);
      setError('');
    } catch (err) {
      setError('Invalid decimal input. Only numbers are allowed.');
    }
  };

  const decimalToHex = (str) => {
    // Check if the string contains only digits
    if (!/^\d+$/.test(str)) {
      throw new Error('Invalid decimal characters');
    }
    
    const num = parseInt(str, 10);
    if (isNaN(num)) {
      throw new Error('Invalid number');
    }
    
    return num.toString(16).toUpperCase();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
  };

  const handleClear = () => {
    setDecimal('');
    setHex('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Decimal to HEX Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert decimal (base-10) numbers to hexadecimal (base-16) representation.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Decimal"
              value={decimal}
              onChange={handleDecimalChange}
              variant="outlined"
              placeholder="Enter decimal number (e.g., 255)..."
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
            Decimal to HEX Conversion Table
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Decimal</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>HEX</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                <tr key={num}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{num}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{num.toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DecimalToHEX;