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

const BinaryToEnglish = () => {
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
          Binary to English Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert binary code (8-bit bytes) back to readable English text.
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
              label="English Text Output"
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
            Binary to English Examples
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Binary</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>English</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['01001000', 'H'],
                ['01101001', 'i'],
                ['00100001', '!'],
                ['00101110', '.'],
                ['00100000', ' ']
              ].map(([bin, char]) => (
                <tr key={bin}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bin}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{char}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryToEnglish;