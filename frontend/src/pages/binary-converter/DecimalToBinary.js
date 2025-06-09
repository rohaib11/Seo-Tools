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

const DecimalToBinary = () => {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleDecimalChange = (e) => {
    const input = e.target.value;
    setDecimal(input);
    if (input === '') {
      setBinary('');
      setError('');
      return;
    }
    try {
      const binaryStr = decimalToBinary(input);
      setBinary(binaryStr);
      setError('');
    } catch (err) {
      setError('Invalid decimal input. Only numbers are allowed.');
    }
  };

  const decimalToBinary = (str) => {
    // Check if the string contains only digits
    if (!/^\d+$/.test(str)) {
      throw new Error('Invalid decimal characters');
    }
    
    const num = parseInt(str, 10);
    if (isNaN(num)) {
      throw new Error('Invalid number');
    }
    
    return num.toString(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(binary);
  };

  const handleClear = () => {
    setDecimal('');
    setBinary('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Decimal to Binary Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert decimal (base-10) numbers to binary (base-2) representation.
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
              placeholder="Enter decimal number (e.g., 42)..."
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
            Decimal to Binary Conversion
          </Typography>
          <Typography variant="body2" paragraph>
            The binary value is calculated by repeatedly dividing the number by 2 and recording the remainders.
          </Typography>
          <Typography variant="body2" paragraph>
            Example: 10 (decimal) → 
            10 ÷ 2 = 5 remainder 0, 
            5 ÷ 2 = 2 remainder 1, 
            2 ÷ 2 = 1 remainder 0, 
            1 ÷ 2 = 0 remainder 1 → 
            Reading remainders in reverse: 1010 (binary)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default DecimalToBinary;