import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Divider,
  Paper,
  Button,
  Alert
} from '@mui/material';
import { Receipt as ReceiptIcon } from '@mui/icons-material';

const SalesTaxCalculator = () => {
  const [values, setValues] = useState({
    amount: '',
    taxRate: '',
    taxAmount: '',
    total: ''
  });
  const [mode, setMode] = useState('calculateTax');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTax = () => {
    const { amount, taxRate } = values;
    if (!amount || !taxRate) return;
    
    const taxAmount = (parseFloat(amount) * parseFloat(taxRate)) / 100;
    const total = parseFloat(amount) + taxAmount;
    
    setValues(prev => ({
      ...prev,
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2)
    }));
  };

  const calculatePreTax = () => {
    const { total, taxRate } = values;
    if (!total || !taxRate) return;
    
    const preTaxAmount = (parseFloat(total) * 100) / (100 + parseFloat(taxRate));
    const taxAmount = parseFloat(total) - preTaxAmount;
    
    setValues(prev => ({
      ...prev,
      amount: preTaxAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <ReceiptIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Sales Tax Calculator
          </Typography>
        </Box>

        <Box mb={3}>
          <Button
            variant={mode === 'calculateTax' ? 'contained' : 'outlined'}
            onClick={() => setMode('calculateTax')}
            sx={{ mr: 2 }}
          >
            Calculate Tax
          </Button>
          <Button
            variant={mode === 'calculatePreTax' ? 'contained' : 'outlined'}
            onClick={() => setMode('calculatePreTax')}
          >
            Calculate Pre-Tax Price
          </Button>
        </Box>

        {mode === 'calculateTax' ? (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount Before Tax ($)"
                  name="amount"
                  value={values.amount}
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
                  label="Sales Tax Rate (%)"
                  name="taxRate"
                  value={values.taxRate}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    endAdornment: '%'
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                onClick={calculateTax}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate Tax
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Amount With Tax ($)"
                  name="total"
                  value={values.total}
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
                  label="Sales Tax Rate (%)"
                  name="taxRate"
                  value={values.taxRate}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    endAdornment: '%'
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                onClick={calculatePreTax}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate Pre-Tax Price
              </Button>
            </Box>
          </Box>
        )}

        {(values.taxAmount || values.total) && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Calculation Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography>Pre-Tax Amount:</Typography>
                  <Typography variant="h5" color="primary">
                    ${values.amount || '0.00'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography>Sales Tax ({values.taxRate}%):</Typography>
                  <Typography variant="h5" color="primary">
                    ${values.taxAmount || '0.00'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography>Total Amount:</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.total || (parseFloat(values.amount || 0) + parseFloat(values.taxAmount || 0)).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            Note: Sales tax rates vary by location. Check your local tax rates for accurate calculations.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default SalesTaxCalculator;