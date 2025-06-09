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
  Tabs,
  Tab
} from '@mui/material';
import { Percent as PercentIcon } from '@mui/icons-material';

const PercentageCalculator = () => {
  const [tabValue, setTabValue] = useState(0);
  const [values, setValues] = useState({
    percentage: '',
    total: '',
    result: '',
    x: '',
    y: '',
    from: '',
    to: '',
    difference: ''
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

  const calculatePercentage = () => {
    const { percentage, total } = values;
    if (!percentage || !total) return;
    const result = (parseFloat(percentage) / 100) * parseFloat(total);
    setValues(prev => ({
      ...prev,
      result: result.toFixed(2)
    }));
  };

  const calculatePercentageOf = () => {
    const { x, y } = values;
    if (!x || !y) return;
    const result = (parseFloat(x) / parseFloat(y)) * 100;
    setValues(prev => ({
      ...prev,
      result: result.toFixed(2) + '%'
    }));
  };

  const calculatePercentageChange = () => {
    const { from, to } = values;
    if (!from || !to) return;
    const result = ((parseFloat(to) - parseFloat(from)) / parseFloat(from)) * 100;
    setValues(prev => ({
      ...prev,
      difference: result.toFixed(2) + '%'
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PercentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Percentage Calculator
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="What is X% of Y?" />
          <Tab label="X is what % of Y?" />
          <Tab label="Percentage Change" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Percentage (%)"
                  name="percentage"
                  value={values.percentage}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Value"
                  name="total"
                  value={values.total}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                onClick={calculatePercentage}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
              </Button>
            </Box>
            {values.result && (
              <Box mt={4}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h5" textAlign="center">
                  {values.percentage}% of {values.total} is <Box component="span" color="primary.main" fontWeight="bold">{values.result}</Box>
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Partial Value"
                  name="x"
                  value={values.x}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Value"
                  name="y"
                  value={values.y}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                onClick={calculatePercentageOf}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
              </Button>
            </Box>
            {values.result && (
              <Box mt={4}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h5" textAlign="center">
                  {values.x} is <Box component="span" color="primary.main" fontWeight="bold">{values.result}</Box> of {values.y}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="From Value"
                  name="from"
                  value={values.from}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="To Value"
                  name="to"
                  value={values.to}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                onClick={calculatePercentageChange}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
              </Button>
            </Box>
            {values.difference && (
              <Box mt={4}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h5" textAlign="center">
                  Change from {values.from} to {values.to} is <Box component="span" color="primary.main" fontWeight="bold">{values.difference}</Box>
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PercentageCalculator;