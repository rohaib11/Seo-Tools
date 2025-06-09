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

const EnglishToBinary = () => {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value === '') {
      setBinary('');
      setError('');
      return;
    }
    try {
      const binaryStr = textToBinary(value);
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
          English to Binary Converter
        </Typography>
        <Typography variant="body1" paragraph>
          Convert English text (letters, numbers, punctuation) to binary code. Each character becomes 8 bits.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter English Text"
              multiline
              rows={4}
              value={text}
              onChange={handleTextChange}
              variant="outlined"
              placeholder="Type or paste English text here..."
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
            English Characters to Binary Examples
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Character</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Binary</th>
              </tr>
            </thead>
            <tbody>
              {['A', 'a', '0', '1', ' ', '!', '?', '.'].map(char => (
                <tr key={char}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{char}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {char.charCodeAt(0).toString(2).padStart(8, '0')}
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

export default EnglishToBinary;