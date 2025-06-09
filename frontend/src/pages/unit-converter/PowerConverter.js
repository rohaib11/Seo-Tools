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
import { Bolt as PowerIcon } from '@mui/icons-material';

const powerUnits = [
  { value: 'watts', label: 'Watts (W)' },
  { value: 'kilowatts', label: 'Kilowatts (kW)' },
  { value: 'megawatts', label: 'Megawatts (MW)' },
  { value: 'horsepower', label: 'Horsepower (hp)' },
  { value: 'btuPerHour', label: 'BTU/hour' },
  { value: 'tonsRefrigeration', label: 'Tons of Refrigeration' }
];

const PowerConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('watts');
  const [outputUnit, setOutputUnit] = useState('horsepower');
  const [outputValue, setOutputValue] = useState('');

  const conversionFactors = {
    watts: 1,
    kilowatts: 1000,
    megawatts: 1000000,
    horsepower: 745.7,
    btuPerHour: 0.29307107,
    tonsRefrigeration: 3516.85284
  };

  const convertPower = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInWatts = numValue * conversionFactors[fromUnit];
    const result = valueInWatts / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertPower(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertPower(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertPower(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PowerIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Power Converter
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          1 horsepower (mechanical) = 745.7 watts. Other horsepower definitions exist.
        </Alert>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Power"
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
                    {powerUnits.map((option) => (
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
                    {powerUnits.map((option) => (
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
            Common Power Conversions
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Car Engine', value: 150, unit: 'horsepower' },
              { desc: 'Household Solar', value: 5, unit: 'kilowatts' },
              { desc: 'Wind Turbine', value: 2, unit: 'megawatts' },
              { desc: 'Air Conditioner', value: 3, unit: 'tonsRefrigeration' }
            ].map((power, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(power.value);
                    setInputUnit(power.unit);
                    convertPower(power.value, power.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {power.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {power.value} {power.unit}
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

export default PowerConverter;