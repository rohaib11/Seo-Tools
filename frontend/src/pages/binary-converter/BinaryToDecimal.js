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

const BinaryToDecimal = () => {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [error, setError] = useState('');

  const handleBinaryChange = (e) => {
    const input = e.target.value;
    setBinary(input);
    if (input === '') {
      setDecimal('');
      setError('');
      return;
    }
    try {
      const decimalNum = binaryToDecimal(input);
      setDecimal(decimalNum.toString());
      setError('');
    } catch (err) {
      setError('Invalid binary input. Only 0s and 1s are allowed.');
    }
  };

  const binaryToDecimal = (str) => {
    // Remove all whitespace
    const cleanStr = str.replace(/\s+/g, '');
    
    // Check if the string contains only 0s and 1s
    if (!/^[01]+$/.test(cleanStr)) {
      throw new Error('Invalid binary characters');
    }
    
    return parseInt(cleanStr, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decimal);
  };

  const handleClear = () => {
    setBinary('');
    setDecimal('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary to Decimal Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert binary numbers to decimal (base-10) representation.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Binary"
              value={binary}
              onChange={handleBinaryChange}
              variant="outlined"
              placeholder="Enter binary number (e.g., 101010)..."
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
              label="Decimal Output"
              value={decimal}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy Decimal">
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
            Binary to Decimal Conversion
          </Typography>
          <Typography variant="body2" paragraph>
            The decimal value is calculated by summing the powers of 2 for each '1' in the binary number, 
            starting from the rightmost digit (which represents 2⁰).
          </Typography>
          <Typography variant="body2" paragraph>
            Example: 1010 (binary) = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10 (decimal)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryToDecimal;