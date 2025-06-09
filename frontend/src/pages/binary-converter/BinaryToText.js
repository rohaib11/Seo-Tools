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

const BinaryToText = () => {
  const [binary, setBinary] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleBinaryChange = (e) => {
    const input = e.target.value;
    setBinary(input);
    if (input === '') {
      setText('');
      setError('');
      return;
    }
    try {
      const textStr = binaryToText(input);
      setText(textStr);
      setError('');
    } catch (err) {
      setError('Invalid binary input. Only 0s and 1s are allowed, grouped in 8-digit bytes.');
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

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setBinary('');
    setText('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary to Text Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert binary code (8-bit bytes) back to readable text. Spaces between bytes are optional.
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
              label="Text Output"
              multiline
              rows={4}
              value={text}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy Text">
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
            How Binary to Text Conversion Works
          </Typography>
          <Typography variant="body2" paragraph>
            1. The binary input is split into 8-bit chunks (bytes)
          </Typography>
          <Typography variant="body2" paragraph>
            2. Each byte is converted to its decimal equivalent
          </Typography>
          <Typography variant="body2" paragraph>
            3. The decimal value is mapped to its ASCII character
          </Typography>
          <Typography variant="body2" paragraph>
            4. All characters are combined to form the output text
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryToText;