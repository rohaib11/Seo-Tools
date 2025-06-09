import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Grid 
} from '@mui/material';
import { TrendingUp as TrendIcon } from '@mui/icons-material';

const PercentageIncreaseCalculator = () => {
  const [values, setValues] = useState({
    originalValue: '',
    newValue: '',
    increase: '',
    percentageIncrease: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateIncrease = () => {
    const { originalValue, newValue } = values;
    if (!originalValue || !newValue) return;
    
    const increase = parseFloat(newValue) - parseFloat(originalValue);
    const percentageIncrease = (increase / parseFloat(originalValue)) * 100;
    
    setValues(prev => ({
      ...prev,
      increase: increase.toFixed(2),
      percentageIncrease: percentageIncrease.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TrendIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Percentage Increase Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original Value"
              name="originalValue"
              value={values.originalValue}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="New Value"
              name="newValue"
              value={values.newValue}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateIncrease}
            disabled={!values.originalValue || !values.newValue}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Increase
          </Button>
        </Box>

        {values.percentageIncrease && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Increase</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.increase}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Percentage Increase</Typography>
                  <Typography variant="h4" color="primary">
                    {values.percentageIncrease}%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PercentageIncreaseCalculator;
