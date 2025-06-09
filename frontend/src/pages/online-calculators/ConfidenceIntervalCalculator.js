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
  Slider,
  Alert
} from '@mui/material';
import { TrendingUp as TrendIcon } from '@mui/icons-material';

const ConfidenceIntervalCalculator = () => {
  const [values, setValues] = useState({
    mean: '',
    stdDev: '',
    sampleSize: '',
    confidenceLevel: 95
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setValues(prev => ({
      ...prev,
      confidenceLevel: newValue
    }));
  };

  const calculateCI = () => {
    const { mean, stdDev, sampleSize, confidenceLevel } = values;
    if (!mean || !stdDev || !sampleSize) return;

    const zScores = {
      80: 1.282,
      85: 1.440,
      90: 1.645,
      95: 1.960,
      99: 2.576,
      99.5: 2.807,
      99.9: 3.291
    };

    const z = zScores[confidenceLevel] || 1.960;
    const margin = z * (parseFloat(stdDev) / Math.sqrt(parseFloat(sampleSize)));
    const lower = parseFloat(mean) - margin;
    const upper = parseFloat(mean) + margin;

    setResult({
      lower: lower.toFixed(2),
      upper: upper.toFixed(2),
      margin: margin.toFixed(2),
      confidenceLevel
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TrendIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Confidence Interval Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sample Mean"
              name="mean"
              value={values.mean}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Standard Deviation"
              name="stdDev"
              value={values.stdDev}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sample Size"
              name="sampleSize"
              value={values.sampleSize}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Confidence Level: {values.confidenceLevel}%
            </Typography>
            <Slider
              value={values.confidenceLevel}
              onChange={handleSliderChange}
              min={80}
              max={99.9}
              step={0.1}
              marks={[
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 95, label: '95%' },
                { value: 99, label: '99%' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateCI}
            disabled={!values.mean || !values.stdDev || !values.sampleSize}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate
          </Button>
        </Box>

        {result && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Confidence Interval
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              We are {result.confidenceLevel}% confident that the population mean is between:
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Lower Bound</Typography>
                  <Typography variant="h4" color="primary">
                    {result.lower}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Upper Bound</Typography>
                  <Typography variant="h4" color="primary">
                    {result.upper}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Margin of Error</Typography>
                  <Typography variant="h4" color="primary">
                    ±{result.margin}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ConfidenceIntervalCalculator;