import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  Divider
} from '@mui/material';

const MBToKBConverter = () => {
  const [mbValue, setMbValue] = useState('');
  const [kbValue, setKbValue] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    if (!mbValue || isNaN(mbValue)) {
      setError('Please enter a valid number');
      return;
    }
    const kb = parseFloat(mbValue) * 1024;
    setKbValue(kb.toFixed(2));
  };

  const handleReset = () => {
    setMbValue('');
    setKbValue('');
    setError('');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          MB to KB Converter
        </Typography>
        
        <Typography variant="body1" color="text.secondary" mb={3}>
          Convert megabytes (MB) to kilobytes (KB)
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Megabytes (MB)"
            type="number"
            value={mbValue}
            onChange={(e) => setMbValue(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: 'MB',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvert}
            fullWidth
          >
            Convert
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
        </Box>

        {kbValue && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                {mbValue} MB = {kbValue} KB
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigator.clipboard.writeText(kbValue)}
                sx={{ mt: 2 }}
              >
                Copy KB Value
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default MBToKBConverter;