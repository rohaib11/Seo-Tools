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
import { AttachMoney as MoneyIcon } from '@mui/icons-material';

const PaypalFeeCalculator = () => {
  const [values, setValues] = useState({
    amount: '',
    feeType: 'domestic',
    fee: '',
    received: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateFees = () => {
    const { amount, feeType } = values;
    if (!amount) return;
    
    const amountNum = parseFloat(amount);
    let fee;
    
    if (feeType === 'domestic') {
      fee = (amountNum * 0.029 + 0.30).toFixed(2);
    } else {
      fee = (amountNum * 0.049 + 0.30).toFixed(2);
    }
    
    const received = (amountNum - parseFloat(fee)).toFixed(2);
    
    setValues(prev => ({
      ...prev,
      fee,
      received
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <MoneyIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            PayPal Fee Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount ($)"
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
              select
              label="Transaction Type"
              name="feeType"
              value={values.feeType}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true
              }}
            >
              <option value="domestic">Domestic (2.9% + $0.30)</option>
              <option value="international">International (4.9% + $0.30)</option>
            </TextField>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateFees}
            disabled={!values.amount}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Fees
          </Button>
        </Box>

        {(values.fee || values.received) && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Fee Calculation
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>PayPal Fee</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.fee}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Amount Received</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.received}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            <strong>Domestic</strong>: 2.9% + $0.30 per transaction<br />
            <strong>International</strong>: 4.9% + $0.30 per transaction<br />
            Fees may vary for micropayments, donations, or special merchant rates.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaypalFeeCalculator;