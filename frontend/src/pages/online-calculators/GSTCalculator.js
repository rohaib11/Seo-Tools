import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Grid,
  Alert
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const LoanToValueCalculator = () => {
  const [values, setValues] = useState({
    loanAmount: '',
    propertyValue: '',
    ltv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLTV = () => {
    const { loanAmount, propertyValue } = values;
    if (!loanAmount || !propertyValue) return;
    
    const ltv = (parseFloat(loanAmount) / parseFloat(propertyValue)) * 100;
    
    setValues(prev => ({
      ...prev,
      ltv: ltv.toFixed(2)
    }));
  };

  const calculateFromLTV = () => {
    const { ltv, propertyValue } = values;
    if (!ltv || !propertyValue) return;
    
    const loanAmount = (parseFloat(ltv) * parseFloat(propertyValue)) / 100;
    
    setValues(prev => ({
      ...prev,
      loanAmount: loanAmount.toFixed(2)
    }));
  };

  const calculatePropertyValue = () => {
    const { loanAmount, ltv } = values;
    if (!loanAmount || !ltv) return;
    
    const propertyValue = (parseFloat(loanAmount) * 100) / parseFloat(ltv);
    
    setValues(prev => ({
      ...prev,
      propertyValue: propertyValue.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <HomeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Loan-to-Value (LTV) Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Loan Amount ($)"
              name="loanAmount"
              value={values.loanAmount}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Property Value ($)"
              name="propertyValue"
              value={values.propertyValue}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="LTV Ratio (%)"
              name="ltv"
              value={values.ltv}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: '%'
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={calculateLTV}
            disabled={!values.loanAmount || !values.propertyValue}
          >
            Calculate LTV
          </Button>
          <Button
            variant="outlined"
            onClick={calculateFromLTV}
            disabled={!values.ltv || !values.propertyValue}
          >
            Calculate Loan
          </Button>
          <Button
            variant="outlined"
            onClick={calculatePropertyValue}
            disabled={!values.loanAmount || !values.ltv}
          >
            Calculate Value
          </Button>
        </Box>

        {values.ltv && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Loan-to-Value Ratio
            </Typography>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {values.ltv}%
              </Typography>
              <Typography variant="body1" mt={1}>
                {parseFloat(values.ltv) > 80 ? 
                  'May require Private Mortgage Insurance (PMI)' : 
                  'Generally acceptable to most lenders'}
              </Typography>
            </Paper>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            LTV = (Loan Amount / Property Value) × 100<br />
            Most lenders prefer LTV ratios of 80% or less.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoanToValueCalculator;