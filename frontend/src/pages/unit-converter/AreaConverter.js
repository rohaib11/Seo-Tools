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
import { AreaChart as AreaIcon } from '@mui/icons-material';

const metricUnits = [
  { value: 'squareMillimeters', label: 'Square millimeters (mm²)' },
  { value: 'squareCentimeters', label: 'Square centimeters (cm²)' },
  { value: 'squareMeters', label: 'Square meters (m²)' },
  { value: 'hectares', label: 'Hectares (ha)' },
  { value: 'squareKilometers', label: 'Square kilometers (km²)' }
];

const usCustomaryUnits = [
  { value: 'squareInches', label: 'Square inches (in²)' },
  { value: 'squareFeet', label: 'Square feet (ft²)' },
  { value: 'squareYards', label: 'Square yards (yd²)' },
  { value: 'acres', label: 'Acres' },
  { value: 'squareMiles', label: 'Square miles (mi²)' }
];

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('squareMeters');
  const [outputUnit, setOutputUnit] = useState('squareFeet');
  const [outputValue, setOutputValue] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const conversionFactors = {
    // Metric
    squareMillimeters: 0.000001,
    squareCentimeters: 0.0001,
    squareMeters: 1,
    hectares: 10000,
    squareKilometers: 1000000,
    // US Customary
    squareInches: 0.00064516,
    squareFeet: 0.092903,
    squareYards: 0.836127,
    acres: 4046.86,
    squareMiles: 2589988.11
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const convertArea = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    const valueInSquareMeters = numValue * conversionFactors[fromUnit];
    const result = valueInSquareMeters / conversionFactors[toUnit];
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertArea(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertArea(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertArea(inputValue, inputUnit, unit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <AreaIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Area Converter
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
              label="Area"
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
                    sx={{ minWidth: 180 }}
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
            Common Area Examples
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Football Field', value: 5351, unit: 'squareMeters', to: 'squareYards' },
              { desc: 'Central Park', value: 843, unit: 'acres', to: 'hectares' },
              { desc: 'A4 Paper', value: 623.7, unit: 'squareCentimeters', to: 'squareInches' },
              { desc: 'Texas', value: 268597, unit: 'squareMiles', to: 'squareKilometers' }
            ].map((area, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(area.value);
                    setInputUnit(area.unit);
                    setOutputUnit(area.to);
                    convertArea(area.value, area.unit, area.to);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {area.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {area.value} {area.unit} → {area.to}
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

export default AreaConverter;