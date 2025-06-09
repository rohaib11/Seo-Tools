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
  SwapHoriz as SwapIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const BinaryTranslator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setInput('');
    setOutput('');
    setError('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === '') {
      setOutput('');
      setError('');
      return;
    }
    try {
      let result;
      if (tabValue === 0) {
        result = textToBinary(value);
      } else {
        result = binaryToText(value);
      }
      setOutput(result);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const textToBinary = (str) => {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
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
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwap = () => {
    setTabValue(tabValue === 0 ? 1 : 0);
    setInput(output);
    setOutput(input);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Binary Translator
        </Typography>
        <Typography variant="body1" paragraph>
          Convert between text and binary code with this versatile translator.
        </Typography>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Text to Binary" />
          <Tab label="Binary to Text" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={tabValue === 0 ? "Enter Text" : "Enter Binary"}
              multiline
              rows={4}
              value={input}
              onChange={handleInputChange}
              variant="outlined"
              placeholder={
                tabValue === 0 
                  ? "Type or paste your text here..." 
                  : "Enter binary code (e.g., 01001000 01101001)..."
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Divider sx={{ my: 2 }} />
            <Tooltip title="Clear All">
              <IconButton onClick={handleClear} color="error" sx={{ mx: 1 }}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Swap Conversion">
              <IconButton onClick={handleSwap} color="primary" sx={{ mx: 1 }}>
                <SwapIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={tabValue === 0 ? "Binary Output" : "Text Output"}
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
            {tabValue === 0 ? "Text to Binary Conversion" : "Binary to Text Conversion"}
          </Typography>
          <Typography variant="body2" paragraph>
            {tabValue === 0 
              ? "Each character is converted to its 8-bit binary representation (ASCII code)." 
              : "Each 8-bit binary segment is converted back to its corresponding ASCII character."}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BinaryTranslator;