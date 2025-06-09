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

const TextToASCII = () => {
  const [text, setText] = useState('');
  const [ascii, setAscii] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const input = e.target.value;
    setText(input);
    if (input === '') {
      setAscii('');
      setError('');
      return;
    }
    try {
      const asciiStr = textToASCII(input);
      setAscii(asciiStr);
      setError('');
    } catch (err) {
      setError('Invalid characters in input');
    }
  };

  const textToASCII = (str) => {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code > 255) {
        throw new Error('Only ASCII characters (0-255) are supported');
      }
      return code.toString();
    }).join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ascii);
  };

  const handleClear = () => {
    setText('');
    setAscii('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Text to ASCII Codes
        </Typography>
        <Typography variant="body1" paragraph>
          Convert text characters to their corresponding ASCII code numbers.
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
              label="ASCII Codes"
              multiline
              rows={4}
              value={ascii}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy ASCII Codes">
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
            Common ASCII Codes
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 2 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Character</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>ASCII Code</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['A', 65], ['a', 97], ['0', 48], [' ', 32], 
                ['!', 33], ['@', 64], ['\n', 10], ['\t', 9]
              ].map(([char, code]) => (
                <tr key={code}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {char === '\n' ? 'Newline' : char === '\t' ? 'Tab' : char}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{code}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TextToASCII;