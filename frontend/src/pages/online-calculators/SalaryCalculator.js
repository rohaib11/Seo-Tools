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

const SalaryCalculator = () => {
  const [values, setValues] = useState({
    grossSalary: '',
    taxRate: '',
    healthInsurance: '',
    pensionContribution: '',
    netSalary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSalary = () => {
    const { grossSalary, taxRate, healthInsurance, pensionContribution } = values;
    
    if (!grossSalary || !taxRate) return;

    const gross = parseFloat(grossSalary);
    const tax = (gross * parseFloat(taxRate)) / 100;
    const insurance = parseFloat(healthInsurance) || 0;
    const pension = parseFloat(pensionContribution) || 0;

    const net = gross - tax - insurance - pension;

    setValues(prev => ({
      ...prev,
      netSalary: net.toFixed(2)
    }));
  };

  const resetCalculator = () => {
    setValues({
      grossSalary: '',
      taxRate: '',
      healthInsurance: '',
      pensionContribution: '',
      netSalary: ''
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <MoneyIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Salary Calculator
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Salary Breakdown
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gross Salary ($)"
              name="grossSalary"
              value={values.grossSalary}
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
              label="Tax Rate (%)"
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Health Insurance Deduction ($)"
              name="healthInsurance"
              value={values.healthInsurance}
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
              label="Pension Contribution ($)"
              name="pensionContribution"
              value={values.pensionContribution}
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
            onClick={calculateSalary}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Net Salary
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 4, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>

        {values.netSalary && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Net Salary Breakdown
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Gross Salary</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.grossSalary}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Tax Deduction</Typography>
                  <Typography variant="h4" color="primary">
                    ${((parseFloat(values.grossSalary) * parseFloat(values.taxRate)) / 100).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Health Insurance Deduction</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.healthInsurance}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Pension Contribution</Typography>
                  <Typography variant="h4" color="primary">
                    ${values.pensionContribution}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5">Net Salary</Typography>
                <Typography variant="h4" color="primary">
                  ${values.netSalary}
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            Net Salary = Gross Salary - (Tax Deduction + Health Insurance Deduction + Pension Contribution)
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default SalaryCalculator;
