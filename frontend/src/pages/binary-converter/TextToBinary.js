import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  Divider,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  SwapHoriz as SwapIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const TextToBinary = () => {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value === '') {
      setBinary('');
      setError('');
      return;
    }
    try {
      const binaryStr = textToBinary(e.target.value);
      setBinary(binaryStr);
      setError('');
    } catch (err) {
      setError('Invalid characters in input');
    }
  };

  const textToBinary = (str) => {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(binary);
  };

  const handleClear = () => {
    setText('');
    setBinary('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Text to Binary Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert any text to binary code instantly. Each character is represented by 8 bits (1 byte).
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Text"
              multiline
              rows={4}
              value={text}
              onChange={handleTextChange}
              variant="outlined"
              placeholder="Type or paste your text here..."
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
            How Text to Binary Conversion Works
          </Typography>
          <Typography variant="body2" paragraph>
            1. Each character in your text is converted to its ASCII code (a number between 0 and 255)
          </Typography>
          <Typography variant="body2" paragraph>
            2. The ASCII code is then converted to an 8-digit binary number
          </Typography>
          <Typography variant="body2" paragraph>
            3. The binary representations are joined together with spaces between characters
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TextToBinary;