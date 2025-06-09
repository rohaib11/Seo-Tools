import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  Grid,
  Alert
} from '@mui/material';
import { Functions as CalcIcon } from '@mui/icons-material';

const MeanMedianModeCalculator = () => {
  const [values, setValues] = useState({
    numbers: '',
    mean: '',
    median: '',
    mode: ''
  });

  const handleChange = (e) => {
    setValues(prev => ({
      ...prev,
      numbers: e.target.value
    }));
  };

  const calculateMean = (numbers) => {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return (sum / numbers.length).toFixed(2);
  };

  const calculateMedian = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2);
    } else {
      return sorted[middle].toFixed(2);
    }
  };

  const calculateMode = (numbers) => {
    const frequency = {};
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(num => frequency[num] === maxFreq);
    
    return modes.length === numbers.length ? 'No mode' : modes.join(', ');
  };

  const calculateResults = () => {
    const numArray = values.numbers
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    if (numArray.length === 0) {
      setValues(prev => ({
        ...prev,
        mean: '',
        median: '',
        mode: '',
        error: 'Please enter valid numbers.'
      }));
      return;
    }

    setValues(prev => ({
      ...prev,
      mean: calculateMean(numArray),
      median: calculateMedian(numArray),
      mode: calculateMode(numArray),
      error: ''
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CalcIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Mean, Median & Mode Calculator
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Enter Numbers (comma separated)
        </Typography>
        
        <TextField
          fullWidth
          label="Numbers"
          name="numbers"
          value={values.numbers}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={calculateResults}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate
          </Button>
        </Box>

        {values.error && (
          <Box mt={3}>
            <Alert severity="error">{values.error}</Alert>
          </Box>
        )}

        {values.mean && !values.error && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Mean</Typography>
                  <Typography variant="h4" color="primary">
                    {values.mean}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Median</Typography>
                  <Typography variant="h4" color="primary">
                    {values.median}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Mode</Typography>
                  <Typography variant="h4" color="primary">
                    {values.mode}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            The mean is the average of all numbers, the median is the middle value, and the mode is the most frequent number.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default MeanMedianModeCalculator;
