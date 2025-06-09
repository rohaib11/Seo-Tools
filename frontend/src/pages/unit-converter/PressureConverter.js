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
import { Compress as PressureIcon } from '@mui/icons-material';

const pressureUnits = [
  { value: 'pascals', label: 'Pascals (Pa)' },
  { value: 'kilopascals', label: 'Kilopascals (kPa)' },
  { value: 'megapascals', label: 'Megapascals (MPa)' },
  { value: 'bars', label: 'Bars (bar)' },
  { value: 'millibars', label: 'Millibars (mbar)' },
  { value: 'atmospheres', label: 'Atmospheres (atm)' },
  { value: 'mmHg', label: 'Millimeters of mercury (mmHg)' },
  { value: 'psi', label: 'Pounds per square inch (psi)' },
  { value: 'torr', label: 'Torr' }
];

const PressureConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('atmospheres');
  const [outputUnit, setOutputUnit] = useState('psi');
  const [outputValue, setOutputValue] = useState('');

  const conversionFactors = {
    pascals: 1,
    kilopascals: 1000,
    megapascals: 1000000,
    bars: 100000,
    millibars: 100,
    atmospheres: 101325,
    mmHg: 133.322,
    psi: 6894.76,
    torr: 133.322
  };

  const convertPressure = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInPascals = numValue * conversionFactors[fromUnit];
    const result = valueInPascals / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertPressure(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertPressure(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertPressure(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PressureIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Pressure Converter
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Standard atmospheric pressure is 1 atm = 101.325 kPa = 14.696 psi
        </Alert>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Pressure"
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
                    {pressureUnits.map((option) => (
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
                    sx={{ minWidth: 220 }}
                  >
                    {pressureUnits.map((option) => (
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
            Common Pressure Values
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Atmospheric Pressure', value: 1, unit: 'atmospheres' },
              { desc: 'Car Tire Pressure', value: 32, unit: 'psi' },
              { desc: 'Scuba Tank', value: 200, unit: 'bars' },
              { desc: 'Blood Pressure (Systolic)', value: 120, unit: 'mmHg' }
            ].map((pressure, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(pressure.value);
                    setInputUnit(pressure.unit);
                    convertPressure(pressure.value, pressure.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {pressure.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {pressure.value} {pressure.unit}
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

export default PressureConverter;