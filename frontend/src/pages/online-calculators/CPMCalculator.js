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
import { Receipt as CpmIcon } from '@mui/icons-material';

const CPMCalculator = () => {
  const [values, setValues] = useState({
    cost: '',
    impressions: '',
    cpm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCPM = () => {
    const { cost, impressions } = values;
    if (!cost || !impressions) return;
    
    const cpm = (parseFloat(cost) / parseFloat(impressions)) * 1000;
    
    setValues(prev => ({
      ...prev,
      cpm: cpm.toFixed(2)
    }));
  };

  const calculateFromCPM = () => {
    const { cpm, impressions } = values;
    if (!cpm || !impressions) return;
    
    const cost = (parseFloat(cpm) * parseFloat(impressions)) / 1000;
    
    setValues(prev => ({
      ...prev,
      cost: cost.toFixed(2)
    }));
  };

  const calculateImpressions = () => {
    const { cost, cpm } = values;
    if (!cost || !cpm) return;
    
    const impressions = (parseFloat(cost) * 1000) / parseFloat(cpm);
    
    setValues(prev => ({
      ...prev,
      impressions: Math.round(impressions).toLocaleString()
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CpmIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            CPM Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Total Cost ($)"
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
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Impressions"
              name="impressions"
              value={values.impressions}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="CPM ($)"
              name="cpm"
              value={values.cpm}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={calculateCPM}
            disabled={!values.cost || !values.impressions}
          >
            Calculate CPM
          </Button>
          <Button
            variant="outlined"
            onClick={calculateFromCPM}
            disabled={!values.cpm || !values.impressions}
          >
            Calculate Cost
          </Button>
          <Button
            variant="outlined"
            onClick={calculateImpressions}
            disabled={!values.cost || !values.cpm}
          >
            Calculate Impressions
          </Button>
        </Box>

        {values.cpm && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              CPM Calculation
            </Typography>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                ${values.cpm}
              </Typography>
              <Typography variant="body1" mt={1}>
                Cost Per Thousand Impressions
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CPMCalculator;