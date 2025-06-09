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
  Slider
} from '@mui/material';
import { Speed as SpeedIcon } from '@mui/icons-material';

const speedUnits = [
  { value: 'metersPerSecond', label: 'Meters per second (m/s)' },
  { value: 'kilometersPerHour', label: 'Kilometers per hour (km/h)' },
  { value: 'milesPerHour', label: 'Miles per hour (mph)' },
  { value: 'feetPerSecond', label: 'Feet per second (ft/s)' },
  { value: 'knots', label: 'Knots (nautical miles per hour)' },
  { value: 'mach', label: 'Mach (at sea level)' }
];

const SpeedConverter = () => {
  const [inputValue, setInputValue] = useState(100);
  const [inputUnit, setInputUnit] = useState('kilometersPerHour');
  const [outputUnit, setOutputUnit] = useState('milesPerHour');
  const [outputValue, setOutputValue] = useState(62.1371);

  const conversionFactors = {
    metersPerSecond: 1,
    kilometersPerHour: 0.277778,
    milesPerHour: 0.44704,
    feetPerSecond: 0.3048,
    knots: 0.514444,
    mach: 343
  };

  const convertSpeed = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInMetersPerSecond = numValue * conversionFactors[fromUnit];
    const result = valueInMetersPerSecond / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertSpeed(value, inputUnit, outputUnit);
  };

  const handleSliderChange = (e, newValue) => {
    setInputValue(newValue);
    convertSpeed(newValue, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertSpeed(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertSpeed(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SpeedIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Speed Converter
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Speed"
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
                    sx={{ minWidth: 220 }}
                  >
                    {speedUnits.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )
              }}
            />
            <Slider
              value={typeof inputValue === 'number' ? inputValue : 0}
              onChange={handleSliderChange}
              min={0}
              max={inputUnit === 'mach' ? 3 : 
                   inputUnit === 'kilometersPerHour' ? 300 : 
                   inputUnit === 'milesPerHour' ? 200 : 1000}
              step={1}
              sx={{ mt: 2 }}
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
                    sx={{ minWidth: 220 }}
                  >
                    {speedUnits.map((option) => (
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
            Common Speed Examples
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Walking Speed', value: 5, unit: 'kilometersPerHour' },
              { desc: 'Highway Speed', value: 65, unit: 'milesPerHour' },
              { desc: 'Commercial Jet', value: 0.8, unit: 'mach' },
              { desc: 'Sound Speed', value: 1, unit: 'mach' }
            ].map((speed, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(speed.value);
                    setInputUnit(speed.unit);
                    convertSpeed(speed.value, speed.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {speed.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {speed.value} {speed.unit}
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

export default SpeedConverter;