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
import { Opacity as VolumeIcon } from '@mui/icons-material';

const metricUnits = [
  { value: 'milliliters', label: 'Milliliters (mL)' },
  { value: 'liters', label: 'Liters (L)' },
  { value: 'cubicMeters', label: 'Cubic meters (m³)' },
  { value: 'cubicCentimeters', label: 'Cubic centimeters (cm³)' }
];

const usCustomaryUnits = [
  { value: 'teaspoons', label: 'Teaspoons (tsp)' },
  { value: 'tablespoons', label: 'Tablespoons (tbsp)' },
  { value: 'fluidOunces', label: 'Fluid ounces (fl oz)' },
  { value: 'cups', label: 'Cups (c)' },
  { value: 'pints', label: 'Pints (pt)' },
  { value: 'quarts', label: 'Quarts (qt)' },
  { value: 'gallons', label: 'Gallons (gal)' },
  { value: 'cubicInches', label: 'Cubic inches (in³)' },
  { value: 'cubicFeet', label: 'Cubic feet (ft³)' }
];

const VolumeConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('liters');
  const [outputUnit, setOutputUnit] = useState('gallons');
  const [outputValue, setOutputValue] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const conversionFactors = {
    // Metric
    milliliters: 0.001,
    liters: 1,
    cubicMeters: 1000,
    cubicCentimeters: 0.001,
    // US Customary
    teaspoons: 0.00492892,
    tablespoons: 0.0147868,
    fluidOunces: 0.0295735,
    cups: 0.236588,
    pints: 0.473176,
    quarts: 0.946353,
    gallons: 3.78541,
    cubicInches: 0.0163871,
    cubicFeet: 28.3168
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const convertVolume = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInLiters = numValue * conversionFactors[fromUnit];
    const result = valueInLiters / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertVolume(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertVolume(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertVolume(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <VolumeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Volume Converter
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Metric Units" />
          <Tab label="US Customary Units" />
        </Tabs>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Volume"
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
                    sx={{ minWidth: 160 }}
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
                    sx={{ minWidth: 160 }}
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
            Common Volume Conversions
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Soda Bottle', value: 2, unit: 'liters', to: 'gallons' },
              { desc: 'Swimming Pool', value: 50000, unit: 'gallons', to: 'cubicMeters' },
              { desc: 'Tea Cup', value: 1, unit: 'cups', to: 'milliliters' },
              { desc: 'Engine Displacement', value: 350, unit: 'cubicInches', to: 'liters' }
            ].map((volume, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(volume.value);
                    setInputUnit(volume.unit);
                    setOutputUnit(volume.to);
                    convertVolume(volume.value, volume.unit, volume.to);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {volume.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {volume.value} {volume.unit} → {volume.to}
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

export default VolumeConverter;