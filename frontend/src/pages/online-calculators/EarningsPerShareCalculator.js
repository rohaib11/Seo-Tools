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
  Slider
} from '@mui/material';
import { LocalAtm as DiscountIcon } from '@mui/icons-material';

const DiscountCalculator = () => {
  const [values, setValues] = useState({
    originalPrice: '',
    discountPercent: '',
    discountAmount: '',
    finalPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setValues(prev => ({
      ...prev,
      discountPercent: newValue
    }));
    calculateFromPercent();
  };

  const calculateFromPercent = () => {
    const { originalPrice, discountPercent } = values;
    if (!originalPrice || !discountPercent) return;
    
    const discount = (parseFloat(originalPrice) * parseFloat(discountPercent)) / 100;
    const finalPrice = parseFloat(originalPrice) - discount;
    
    setValues(prev => ({
      ...prev,
      discountAmount: discount.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    }));
  };

  const calculateFromAmount = () => {
    const { originalPrice, discountAmount } = values;
    if (!originalPrice || !discountAmount) return;
    
    const percent = (parseFloat(discountAmount) / parseFloat(originalPrice)) * 100;
    const finalPrice = parseFloat(originalPrice) - parseFloat(discountAmount);
    
    setValues(prev => ({
      ...prev,
      discountPercent: percent.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <DiscountIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Discount Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original Price ($)"
              name="originalPrice"
              value={values.originalPrice}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Discount: {values.discountPercent}%
            </Typography>
            <Slider
              value={values.discountPercent ? parseFloat(values.discountPercent) : 0}
              onChange={handleSliderChange}
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Discount Percent (%)"
              name="discountPercent"
              value={values.discountPercent}
              onChange={handleChange}
              onBlur={calculateFromPercent}
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: '%'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Discount Amount ($)"
              name="discountAmount"
              value={values.discountAmount}
              onChange={handleChange}
              onBlur={calculateFromAmount}
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
            onClick={calculateFromPercent}
            disabled={!values.originalPrice}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Discount
          </Button>
        </Box>

        {values.finalPrice && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Discount Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Original Price</Typography>
                  <Typography variant="h5" color="primary">
                    ${values.originalPrice}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Discount</Typography>
                  <Typography variant="h5" color="primary">
                    {values.discountPercent}% (${values.discountAmount})
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Final Price</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.finalPrice}
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

export default DiscountCalculator;