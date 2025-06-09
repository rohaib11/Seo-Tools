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
import { CompareArrows as VoltageIcon } from '@mui/icons-material';

const voltageUnits = [
  { value: 'volts', label: 'Volts (V)' },
  { value: 'millivolts', label: 'Millivolts (mV)' },
  { value: 'kilovolts', label: 'Kilovolts (kV)' },
  { value: 'statvolts', label: 'Statvolts (statV)' }
];

const VoltageConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('volts');
  const [outputUnit, setOutputUnit] = useState('millivolts');
  const [outputValue, setOutputValue] = useState('');

  const conversionFactors = {
    volts: 1,
    millivolts: 0.001,
    kilovolts: 1000,
    statvolts: 299.792458
  };

  const convertVoltage = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInVolts = numValue * conversionFactors[fromUnit];
    const result = valueInVolts / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertVoltage(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertVoltage(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertVoltage(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <VoltageIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Voltage Converter
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          1 statvolt ≈ 299.792458 volts (based on the speed of light in m/s)
        </Alert>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Voltage"
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
                    {voltageUnits.map((option) => (
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
                    {voltageUnits.map((option) => (
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
            Common Voltage Examples
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'AA Battery', value: 1.5, unit: 'volts' },
              { desc: 'USB Power', value: 5, unit: 'volts' },
              { desc: 'Car Battery', value: 12, unit: 'volts' },
              { desc: 'Household (US)', value: 120, unit: 'volts' },
              { desc: 'Household (EU)', value: 230, unit: 'volts' },
              { desc: 'Power Line', value: 10, unit: 'kilovolts' }
            ].map((voltage, idx) => (
              <Grid item xs={6} sm={4} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(voltage.value);
                    setInputUnit(voltage.unit);
                    convertVoltage(voltage.value, voltage.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {voltage.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {voltage.value} {voltage.unit}
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

export default VoltageConverter;