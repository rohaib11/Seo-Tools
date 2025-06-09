import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Divider,
  Paper,
  Button,
  Alert,
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { FitnessCenter as FitnessIcon } from '@mui/icons-material';

const BMICalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    let heightInMeters;
    if (unit === 'metric') {
      heightInMeters = height / 100;
    } else {
      // imperial: height in inches
      heightInMeters = height * 0.0254;
    }

    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleUnitChange = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <FitnessIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            BMI Calculator
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={unit === 'imperial'}
              onChange={handleUnitChange}
              color="primary"
            />
          }
          label={unit === 'metric' ? 'Metric (cm, kg)' : 'Imperial (in, lbs)'}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </Typography>
            <Slider
              value={height}
              onChange={handleHeightChange}
              min={unit === 'metric' ? 100 : 40}
              max={unit === 'metric' ? 250 : 100}
              step={1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              value={height}
              onChange={handleHeightChange}
              variant="outlined"
              InputProps={{
                endAdornment: unit === 'metric' ? 'cm' : 'in'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </Typography>
            <Slider
              value={weight}
              onChange={handleWeightChange}
              min={unit === 'metric' ? 30 : 66}
              max={unit === 'metric' ? 200 : 440}
              step={unit === 'metric' ? 1 : 0.5}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              value={weight}
              onChange={handleWeightChange}
              variant="outlined"
              InputProps={{
                endAdornment: unit === 'metric' ? 'kg' : 'lbs'
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            size="large"
            onClick={calculateBMI}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate BMI
          </Button>
        </Box>

        {bmi && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Your Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6">BMI</Typography>
                  <Typography variant="h2" color="primary">
                    {bmi}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6">Category</Typography>
                  <Typography variant="h4" color="primary">
                    {category}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                BMI Categories:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 1, bgcolor: 'info.light' }}>
                    <Typography>Underweight: &lt;18.5</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 1, bgcolor: 'success.light' }}>
                    <Typography>Normal weight: 18.5-24.9</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 1, bgcolor: 'warning.light' }}>
                    <Typography>Overweight: 25-29.9</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 1, bgcolor: 'error.light' }}>
                    <Typography>Obese: ≥30</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default BMICalculator;