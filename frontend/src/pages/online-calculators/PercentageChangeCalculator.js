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
import { CompareArrows as CompareIcon } from '@mui/icons-material';

const PercentageChangeCalculator = () => {
  const [values, setValues] = useState({
    originalValue: '',
    newValue: '',
    percentageChange: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePercentageChange = () => {
    const { originalValue, newValue } = values;
    if (!originalValue || !newValue) return;
    
    const change = parseFloat(newValue) - parseFloat(originalValue);
    const percentageChange = (change / parseFloat(originalValue)) * 100;
    
    setValues(prev => ({
      ...prev,
      percentageChange: percentageChange.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CompareIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Percentage Change Calculator
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
            onClick={calculatePercentageChange}
            disabled={!values.originalValue || !values.newValue}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Change
          </Button>
        </Box>

        {values.percentageChange && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Percentage Change
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Percentage Change</Typography>
                  <Typography variant="h4" color="primary">
                    {values.percentageChange}%
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

export default PercentageChangeCalculator;
