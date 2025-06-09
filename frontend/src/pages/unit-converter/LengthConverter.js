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
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Straighten as LengthIcon } from '@mui/icons-material';

const lengthUnits = [
  { value: 'millimeters', label: 'Millimeters (mm)' },
  { value: 'centimeters', label: 'Centimeters (cm)' },
  { value: 'meters', label: 'Meters (m)' },
  { value: 'kilometers', label: 'Kilometers (km)' },
  { value: 'inches', label: 'Inches (in)' },
  { value: 'feet', label: 'Feet (ft)' },
  { value: 'yards', label: 'Yards (yd)' },
  { value: 'miles', label: 'Miles (mi)' }
];

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [inputUnit, setInputUnit] = useState('meters');
  const [outputUnit, setOutputUnit] = useState('feet');
  const [outputValue, setOutputValue] = useState(3.28084);
  const [showVisualization, setShowVisualization] = useState(true);

  // Conversion factors relative to meters
  const conversionFactors = {
    millimeters: 0.001,
    centimeters: 0.01,
    meters: 1,
    kilometers: 1000,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.34
  };

  const convertLength = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    // Convert to meters first
    const valueInMeters = numValue * conversionFactors[fromUnit];
    // Then convert to target unit
    const result = valueInMeters / conversionFactors[toUnit];
    
    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertLength(value, inputUnit, outputUnit);
  };

  const handleSliderChange = (e, newValue) => {
    setInputValue(newValue);
    convertLength(newValue, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertLength(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertLength(inputValue, inputUnit, unit);
  };

  const getVisualizationLength = () => {
    // Scale for visualization (max 300px)
    const maxPixels = 300;
    const baseMeters = inputValue * conversionFactors[inputUnit];
    
    // For very large values, scale down
    if (baseMeters > 100) {
      return Math.min(maxPixels, maxPixels * (baseMeters / 1000));
    }
    
    // For very small values, scale up
    if (baseMeters < 0.1) {
      return Math.min(maxPixels, maxPixels * (baseMeters * 10));
    }
    
    return Math.min(maxPixels, maxPixels * baseMeters);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <LengthIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Length Converter
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Length"
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
                    {lengthUnits.map((option) => (
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
              max={inputUnit === 'kilometers' ? 100 : 
                   inputUnit === 'miles' ? 50 : 
                   inputUnit === 'centimeters' ? 500 : 1000}
              step={inputUnit === 'kilometers' ? 1 : 
                    inputUnit === 'miles' ? 1 : 
                    inputUnit === 'meters' ? 1 : 10}
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
                    sx={{ minWidth: 140 }}
                  >
                    {lengthUnits.map((option) => (
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

        <FormControlLabel
          control={
            <Switch
              checked={showVisualization}
              onChange={() => setShowVisualization(!showVisualization)}
              color="primary"
            />
          }
          label="Show length visualization"
          sx={{ mt: 3 }}
        />

        {showVisualization && (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Visualization
            </Typography>
            <Box
              sx={{
                height: 40,
                width: `${getVisualizationLength()}px`,
                backgroundColor: 'primary.main',
                margin: '0 auto',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {inputValue} {inputUnit}
            </Box>
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Common Lengths
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'Standard Door Height', value: 2, unit: 'meters' },
              { desc: 'Football Field', value: 100, unit: 'yards' },
              { desc: 'Average Human Height', value: 5.6, unit: 'feet' },
              { desc: 'Marathon', value: 42.195, unit: 'kilometers' }
            ].map((length, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(length.value);
                    setInputUnit(length.unit);
                    convertLength(length.value, length.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {length.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {length.value} {length.unit}
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

export default LengthConverter;