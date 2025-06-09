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
import { Storage as ByteIcon } from '@mui/icons-material';

const byteUnits = [
  { value: 'bits', label: 'Bits (b)' },
  { value: 'bytes', label: 'Bytes (B)' },
  { value: 'kilobytes', label: 'Kilobytes (KB)' },
  { value: 'megabytes', label: 'Megabytes (MB)' },
  { value: 'gigabytes', label: 'Gigabytes (GB)' },
  { value: 'terabytes', label: 'Terabytes (TB)' },
  { value: 'petabytes', label: 'Petabytes (PB)' },
  { value: 'kibibytes', label: 'Kibibytes (KiB)' },
  { value: 'mebibytes', label: 'Mebibytes (MiB)' },
  { value: 'gibibytes', label: 'Gibibytes (GiB)' },
  { value: 'tebibytes', label: 'Tebibytes (TiB)' },
  { value: 'pebibytes', label: 'Pebibytes (PiB)' }
];

const ByteConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [inputUnit, setInputUnit] = useState('megabytes');
  const [outputUnit, setOutputUnit] = useState('gigabytes');
  const [outputValue, setOutputValue] = useState(0.001);
  const [useBinary, setUseBinary] = useState(false);

  const convertBytes = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(value);
    if (fromUnit === toUnit) {
      setOutputValue(numValue);
      return;
    }

    // Convert to bits first
    let valueInBits;
    if (useBinary) {
      const binaryFactors = {
        bits: 1,
        bytes: 8,
        kibibytes: 8 * 1024,
        mebibytes: 8 * 1024 * 1024,
        gibibytes: 8 * 1024 * 1024 * 1024,
        tebibytes: 8 * 1024 * 1024 * 1024 * 1024,
        pebibytes: 8 * 1024 * 1024 * 1024 * 1024 * 1024
      };
      valueInBits = numValue * (binaryFactors[fromUnit] || 0);
    } else {
      const decimalFactors = {
        bits: 1,
        bytes: 8,
        kilobytes: 8 * 1000,
        megabytes: 8 * 1000 * 1000,
        gigabytes: 8 * 1000 * 1000 * 1000,
        terabytes: 8 * 1000 * 1000 * 1000 * 1000,
        petabytes: 8 * 1000 * 1000 * 1000 * 1000 * 1000
      };
      valueInBits = numValue * (decimalFactors[fromUnit] || 0);
    }

    // Then convert to target unit
    let result;
    if (useBinary) {
      const binaryFactors = {
        bits: 1,
        bytes: 8,
        kibibytes: 8 * 1024,
        mebibytes: 8 * 1024 * 1024,
        gibibytes: 8 * 1024 * 1024 * 1024,
        tebibytes: 8 * 1024 * 1024 * 1024 * 1024,
        pebibytes: 8 * 1024 * 1024 * 1024 * 1024 * 1024
      };
      result = valueInBits / (binaryFactors[toUnit] || 1);
    } else {
      const decimalFactors = {
        bits: 1,
        bytes: 8,
        kilobytes: 8 * 1000,
        megabytes: 8 * 1000 * 1000,
        gigabytes: 8 * 1000 * 1000 * 1000,
        terabytes: 8 * 1000 * 1000 * 1000 * 1000,
        petabytes: 8 * 1000 * 1000 * 1000 * 1000 * 1000
      };
      result = valueInBits / (decimalFactors[toUnit] || 1);
    }

    setOutputValue(parseFloat(result.toFixed(6)));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    convertBytes(value, inputUnit, outputUnit);
  };

  const handleSliderChange = (e, newValue) => {
    setInputValue(newValue);
    convertBytes(newValue, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    convertBytes(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    convertBytes(inputValue, inputUnit, unit);
  };

  const handleToggleBinary = () => {
    setUseBinary(!useBinary);
    convertBytes(inputValue, inputUnit, outputUnit);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <ByteIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Data Storage Converter
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={useBinary}
              onChange={handleToggleBinary}
              color="primary"
            />
          }
          label={useBinary ? "Using Binary (1024-based)" : "Using Decimal (1000-based)"}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Data Size"
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
                    {byteUnits
                      .filter(unit => 
                        useBinary ? 
                        unit.value.includes('i') || ['bits', 'bytes'].includes(unit.value) :
                        !unit.value.includes('i'))
                      .map((option) => (
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
              max={100}
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
                    sx={{ minWidth: 140 }}
                  >
                    {byteUnits
                      .filter(unit => 
                        useBinary ? 
                        unit.value.includes('i') || ['bits', 'bytes'].includes(unit.value) :
                        !unit.value.includes('i'))
                      .map((option) => (
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
            Common Data Sizes
          </Typography>
          <Grid container spacing={2}>
            {[
              { desc: 'HD Movie', value: 4, unit: 'gigabytes' },
              { desc: 'DVD Capacity', value: 4.7, unit: 'gigabytes' },
              { desc: 'Blu-ray', value: 25, unit: 'gigabytes' },
              { desc: '1TB Hard Drive', value: 1, unit: 'terabytes' }
            ].map((size, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Paper 
                  elevation={1} 
                  sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => {
                    setInputValue(size.value);
                    setInputUnit(size.unit);
                    convertBytes(size.value, size.unit, outputUnit);
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {size.desc}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {size.value} {size.unit}
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

export default ByteConverter;