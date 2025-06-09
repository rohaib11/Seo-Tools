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
  Tabs,
  Tab,Alert
} from '@mui/material';
import { Paid as PaidIcon } from '@mui/icons-material';

const MarginCalculator = () => {
  const [tabValue, setTabValue] = useState(0);
  const [values, setValues] = useState({
    cost: '',
    revenue: '',
    price: '',
    margin: '',
    markup: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateMargin = () => {
    const { cost, revenue } = values;
    if (!cost || !revenue) return;
    
    const profit = parseFloat(revenue) - parseFloat(cost);
    const margin = (profit / parseFloat(revenue)) * 100;
    const markup = (profit / parseFloat(cost)) * 100;
    
    setValues(prev => ({
      ...prev,
      margin: margin.toFixed(2),
      markup: markup.toFixed(2)
    }));
  };

  const calculateFromMargin = () => {
    const { cost, margin } = values;
    if (!cost || !margin) return;
    
    const price = parseFloat(cost) / (1 - (parseFloat(margin) / 100));
    const markup = (parseFloat(margin) / (100 - parseFloat(margin))) * 100;
    
    setValues(prev => ({
      ...prev,
      revenue: price.toFixed(2),
      markup: markup.toFixed(2)
    }));
  };

  const calculateFromMarkup = () => {
    const { cost, markup } = values;
    if (!cost || !markup) return;
    
    const price = parseFloat(cost) * (1 + (parseFloat(markup) / 100));
    const margin = (1 - (parseFloat(cost) / price)) * 100;
    
    setValues(prev => ({
      ...prev,
      revenue: price.toFixed(2),
      margin: margin.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PaidIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Margin Calculator
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Calculate Margin" />
          <Tab label="Calculate Price from Margin" />
          <Tab label="Calculate Price from Markup" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cost ($)"
                  name="cost"
                  value={values.cost}
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
                  label="Revenue ($)"
                  name="revenue"
                  value={values.revenue}
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
                onClick={calculateMargin}
                disabled={!values.cost || !values.revenue}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate Margin
              </Button>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cost ($)"
                  name="cost"
                  value={values.cost}
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
                  label="Margin (%)"
                  name="margin"
                  value={values.margin}
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
                onClick={calculateFromMargin}
                disabled={!values.cost || !values.margin}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate Price
              </Button>
            </Box>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cost ($)"
                  name="cost"
                  value={values.cost}
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
                  label="Markup (%)"
                  name="markup"
                  value={values.markup}
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
                onClick={calculateFromMarkup}
                disabled={!values.cost || !values.markup}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate Price
              </Button>
            </Box>
          </Box>
        )}

        {(values.margin || values.markup || values.revenue) && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Revenue/Price</Typography>
                  <Typography variant="h5" color="primary">
                    ${values.revenue || '0.00'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Profit Margin</Typography>
                  <Typography variant="h5" color="primary">
                    {values.margin || '0.00'}%
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Markup</Typography>
                  <Typography variant="h5" color="primary">
                    {values.markup || '0.00'}%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            <strong>Margin</strong> is profit as a percentage of revenue. 
            <strong> Markup</strong> is profit as a percentage of cost.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default MarginCalculator;