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
import { Calculate as CalcIcon } from '@mui/icons-material';

const PercentageDifferenceCalculator = () => {
  const [values, setValues] = useState({
    value1: '',
    value2: '',
    percentageDifference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePercentageDifference = () => {
    const { value1, value2 } = values;
    if (!value1 || !value2) return;
    
    const diff = Math.abs(parseFloat(value2) - parseFloat(value1));
    const avg = (parseFloat(value2) + parseFloat(value1)) / 2;
    const percentageDifference = (diff / avg) * 100;
    
    setValues(prev => ({
      ...prev,
      percentageDifference: percentageDifference.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CalcIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Percentage Difference Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Value 1"
              name="value1"
              value={values.value1}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Value 2"
              name="value2"
              value={values.value2}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculatePercentageDifference}
            disabled={!values.value1 || !values.value2}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Difference
          </Button>
        </Box>

        {values.percentageDifference && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Percentage Difference
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Percentage Difference</Typography>
                  <Typography variant="h4" color="primary">
                    {values.percentageDifference}%
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

export default PercentageDifferenceCalculator;
