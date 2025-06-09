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
  Alert
} from '@mui/material';
import { Thermostat as TempIcon } from '@mui/icons-material';

const tempUnits = [
  { value: 'celsius', label: 'Celsius (°C)' },
  { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
  { value: 'kelvin', label: 'Kelvin (K)' }
];

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('celsius');
  const [outputUnit, setOutputUnit] = useState('fahrenheit');
  const [outputValue, setOutputValue] = useState('');

  const convertTemperature = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    // Convert to Celsius first
    let celsius;
    switch (fromUnit) {
      case 'celsius':
        celsius = numValue;
        break;
      case 'fahrenheit':
        celsius = (numValue - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = numValue - 273.15;
        break;
      default:
        celsius = numValue;
    }

    // Then convert to target unit
    let result;
    switch (toUnit) {
      case 'celsius':
        result = celsius;
        break;
      case 'fahrenheit':
        result = (celsius * 9/5) + 32;
        break;
      case 'kelvin':
        result = celsius + 273.15;
        break;
      default:
        result = celsius;
    }

    setOutputValue(parseFloat(result.toFixed(2)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertTemperature(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertTemperature(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertTemperature(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TempIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Temperature Converter
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Absolute zero is -273.15°C, -459.67°F, or 0K. Values below these will be clamped.
        </Alert>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Temperature"
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
                    {tempUnits.map((option) => (
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
                    {tempUnits.map((option) => (
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
            Common Temperature Points
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Water Freezes', celsius: 0 },
              { desc: 'Water Boils', celsius: 100 },
              { desc: 'Room Temperature', celsius: 20 },
              { desc: 'Body Temperature', celsius: 37 }
            ].map((point, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(point.celsius);
                    setInputUnit('celsius');
                    convertTemperature(point.celsius, 'celsius', outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {point.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {point.celsius}°C
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

export default TemperatureConverter;