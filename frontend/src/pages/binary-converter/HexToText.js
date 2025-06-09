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

const HexToText = () => {
  const [hex, setHex] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleHexChange = (e) => {
    const input = e.target.value;
    setHex(input);
    if (input === '') {
      setText('');
      setError('');
      return;
    }
    try {
      const textStr = hexToText(input);
      setText(textStr);
      setError('');
    } catch (err) {
      setError('Invalid HEX input. Only 0-9 and A-F are allowed (case insensitive).');
    }
  };

  const hexToText = (str) => {
    // Remove all whitespace and convert to uppercase
    const cleanStr = str.replace(/\s+/g, '').toUpperCase();
    
    // Check if the string contains only valid HEX characters
    if (!/^[0-9A-F]+$/.test(cleanStr)) {
      throw new Error('Invalid HEX characters');
    }
    
    // Split into 2-character chunks (bytes)
    const chunks = cleanStr.match(/.{1,2}/g) || [];
    
    // Convert each chunk to a character
    return chunks.map(chunk => {
      const charCode = parseInt(chunk, 16);
      if (charCode > 127) {
        throw new Error('Invalid ASCII code (must be 0-127)');
      }
      return String.fromCharCode(charCode);
    }).join('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setHex('');
    setText('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          HEX to Text Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert hexadecimal (HEX) code to readable text. Each pair of HEX digits represents one ASCII character.
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
            HEX to Text Conversion Examples
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>HEX</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Text</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['48', 'H'],
                ['65', 'e'],
                ['6C', 'l'],
                ['6C', 'l'],
                ['6F', 'o'],
                ['20', ' '],
                ['57', 'W'],
                ['6F', 'o'],
                ['72', 'r'],
                ['6C', 'l'],
                ['64', 'd']
              ].map(([hexCode, char]) => (
                <tr key={hexCode}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hexCode}</td>
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

export default HexToText;