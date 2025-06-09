import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  MenuItem, 
  Divider,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { Scale as WeightIcon } from '@mui/icons-material';

const metricUnits = [
  { value: 'milligrams', label: 'Milligrams (mg)' },
  { value: 'grams', label: 'Grams (g)' },
  { value: 'kilograms', label: 'Kilograms (kg)' },
  { value: 'metricTons', label: 'Metric tons (t)' }
];

const usCustomaryUnits = [
  { value: 'ounces', label: 'Ounces (oz)' },
  { value: 'pounds', label: 'Pounds (lb)' },
  { value: 'usTons', label: 'US tons (short ton)' },
  { value: 'ukTons', label: 'UK tons (long ton)' },
  { value: 'stones', label: 'Stones' }
];

const WeightConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('kilograms');
  const [outputUnit, setOutputUnit] = useState('pounds');
  const [outputValue, setOutputValue] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const conversionFactors = {
    // Metric
    milligrams: 0.000001,
    grams: 0.001,
    kilograms: 1,
    metricTons: 1000,
    // US Customary
    ounces: 0.0283495,
    pounds: 0.453592,
    usTons: 907.185,
    ukTons: 1016.05,
    stones: 6.35029
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const convertWeight = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInKilograms = numValue * conversionFactors[fromUnit];
    const result = valueInKilograms / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertWeight(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertWeight(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertWeight(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <WeightIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Weight Converter
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Metric Units" />
          <Tab label="US/UK Units" />
        </Tabs>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Weight"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <TextField
                    select
                    value={inputUnit}
                    onChange={handleInputUnitChange}
                    variant="standard"
                    sx={{ minWidth: 140 }}
                  >
                    {(tabValue === 0 ? metricUnits : usCustomaryUnits).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
              =
            </Typography>
            <Divider orientation="vertical" flexItem />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Result"
              value={outputValue || ''}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <TextField
                    select
                    value={outputUnit}
                    onChange={handleOutputUnitChange}
                    variant="standard"
                    sx={{ minWidth: 140 }}
                  >
                    {(tabValue === 1 ? metricUnits : usCustomaryUnits).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Common Weight Examples
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Bag of Sugar', value: 1, unit: 'kilograms', to: 'pounds' },
              { desc: 'Elephant', value: 5, unit: 'metricTons', to: 'usTons' },
              { desc: 'Human (Avg)', value: 11, unit: 'stones', to: 'kilograms' },
              { desc: 'Paper Clip', value: 1, unit: 'grams', to: 'ounces' }
            ].map((weight, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(weight.value);
                    setInputUnit(weight.unit);
                    setOutputUnit(weight.to);
                    convertWeight(weight.value, weight.unit, weight.to);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {weight.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {weight.value} {weight.unit} → {weight.to}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default WeightConverter;