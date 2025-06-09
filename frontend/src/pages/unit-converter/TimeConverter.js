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
  Switch,
  FormControlLabel
} from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';

const timeUnits = [
  { value: 'nanoseconds', label: 'Nanoseconds' },
  { value: 'microseconds', label: 'Microseconds' },
  { value: 'milliseconds', label: 'Milliseconds' },
  { value: 'seconds', label: 'Seconds' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' }
];

const TimeConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('hours');
  const [outputUnit, setOutputUnit] = useState('minutes');
  const [outputValue, setOutputValue] = useState('');
  const [exactMode, setExactMode] = useState(false);

  // Conversion factors relative to seconds
  const conversionFactors = {
    nanoseconds: 1e-9,
    microseconds: 1e-6,
    milliseconds: 0.001,
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629800, // Average month length in seconds
    years: 31557600 // Average year length in seconds
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertValue(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertValue(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertValue(inputValue, inputUnit, unit);
  };

  const convertValue = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    // Convert to seconds first
    const valueInSeconds = numValue * conversionFactors[fromUnit];
    // Then convert to target unit
    const result = valueInSeconds / conversionFactors[toUnit];
    
    setOutputValue(exactMode ? result : parseFloat(result.toFixed(6)));
  };

  const handleToggleExactMode = () => {
    setExactMode(!exactMode);
    convertValue(inputValue, inputUnit, outputUnit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TimeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Time Converter
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={exactMode}
              onChange={handleToggleExactMode}
              color="primary"
            />
          }
          label="Exact mode (full precision)"
          sx={{ mb: 3 }}
        />

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Value"
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
                    sx={{ minWidth: 120 }}
                  >
                    {timeUnits.map((option) => (
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
                    sx={{ minWidth: 120 }}
                  >
                    {timeUnits.map((option) => (
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
            Common Conversions
          </Typography>
          <Grid container spacing={2}>
            {[
              { from: 'hours', to: 'minutes', value: 1 },
              { from: 'days', to: 'hours', value: 1 },
              { from: 'weeks', to: 'days', value: 1 },
              { from: 'years', to: 'days', value: 1 }
            ].map((conv, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(conv.value);
                    setInputUnit(conv.from);
                    setOutputUnit(conv.to);
                    convertValue(conv.value, conv.from, conv.to);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    1 {conv.from} →
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {conversionFactors[conv.from] / conversionFactors[conv.to]} {conv.to}
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

export default TimeConverter;