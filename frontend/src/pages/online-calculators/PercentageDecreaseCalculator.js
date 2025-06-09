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
import { TrendingDown as TrendIcon } from '@mui/icons-material';

const PercentageDecreaseCalculator = () => {
  const [values, setValues] = useState({
    originalValue: '',
    newValue: '',
    decrease: '',
    percentageDecrease: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDecrease = () => {
    const { originalValue, newValue } = values;
    if (!originalValue || !newValue) return;
    
    const decrease = parseFloat(originalValue) - parseFloat(newValue);
    const percentageDecrease = (decrease / parseFloat(originalValue)) * 100;
    
    setValues(prev => ({
      ...prev,
      decrease: decrease.toFixed(2),
      percentageDecrease: percentageDecrease.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TrendIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Percentage Decrease Calculator
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
            onClick={calculateDecrease}
            disabled={!values.originalValue || !values.newValue}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Decrease
          </Button>
        </Box>

        {values.percentageDecrease && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Decrease</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.decrease}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Percentage Decrease</Typography>
                  <Typography variant="h4" color="primary">
                    {values.percentageDecrease}%
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

export default PercentageDecreaseCalculator;
