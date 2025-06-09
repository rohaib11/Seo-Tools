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
import { Settings as TorqueIcon } from '@mui/icons-material';

const torqueUnits = [
  { value: 'newtonMeters', label: 'Newton meters (N·m)' },
  { value: 'kilonewtonMeters', label: 'Kilonewton meters (kN·m)' },
  { value: 'poundFeet', label: 'Pound-feet (lb·ft)' },
  { value: 'poundInches', label: 'Pound-inches (lb·in)' },
  { value: 'ounceInches', label: 'Ounce-inches (oz·in)' },
  { value: 'kilogramMeters', label: 'Kilogram meters (kgf·m)' }
];

const TorqueConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('newtonMeters');
  const [outputUnit, setOutputUnit] = useState('poundFeet');
  const [outputValue, setOutputValue] = useState('');

  const conversionFactors = {
    newtonMeters: 1,
    kilonewtonMeters: 1000,
    poundFeet: 1.35582,
    poundInches: 0.112985,
    ounceInches: 0.00706155,
    kilogramMeters: 9.80665
  };

  const convertTorque = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInNewtonMeters = numValue * conversionFactors[fromUnit];
    const result = valueInNewtonMeters / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertTorque(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertTorque(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertTorque(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TorqueIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Torque Converter
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Torque is a measure of rotational force. 1 N·m is the torque resulting from 1 newton force 
          applied perpendicularly to a 1 meter moment arm.
        </Alert>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Torque"
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
                    sx={{ minWidth: 180 }}
                  >
                    {torqueUnits.map((option) => (
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
                    sx={{ minWidth: 180 }}
                  >
                    {torqueUnits.map((option) => (
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
            Common Torque Values
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Car Wheel Nut', value: 100, unit: 'newtonMeters' },
              { desc: 'Bicycle Pedal', value: 35, unit: 'newtonMeters' },
              { desc: 'Engine Torque (Car)', value: 150, unit: 'poundFeet' },
              { desc: 'Small Screw', value: 5, unit: 'poundInches' }
            ].map((torque, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(torque.value);
                    setInputUnit(torque.unit);
                    convertTorque(torque.value, torque.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {torque.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {torque.value} {torque.unit}
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

export default TorqueConverter;