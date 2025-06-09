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
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Savings as SavingsIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestmentCalculator = () => {
  const [values, setValues] = useState({
    principal: 10000,
    contribution: 1000,
    years: 10,
    rate: 6,
    frequency: 12
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSliderChange = (name) => (e, newValue) => {
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const calculateInvestment = () => {
    const { principal, contribution, years, rate, frequency } = values;
    const annualRate = rate / 100;
    const periods = years * frequency;
    const periodicRate = annualRate / frequency;
    let balance = principal;
    const data = [];
    const tableData = [];

    for (let i = 1; i <= periods; i++) {
      balance = balance * (1 + periodicRate) + contribution;
      if (i % frequency === 0) {
        const year = i / frequency;
        const totalContributions = principal + contribution * i;
        const interestEarned = balance - totalContributions;
        data.push({
          year,
          balance: parseFloat(balance.toFixed(2)),
          contributions: parseFloat(totalContributions.toFixed(2))
        });
        tableData.push({
          year,
          balance: balance.toFixed(2),
          contributions: totalContributions.toFixed(2),
          interest: interestEarned.toFixed(2)
        });
      }
    }

    setResults({
      finalBalance: balance.toFixed(2),
      totalContributions: (principal + contribution * periods).toFixed(2),
      interestEarned: (balance - principal - contribution * periods).toFixed(2),
      chartData: data,
      tableData
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SavingsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Investment Calculator
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Initial Investment ($)</Typography>
            <Slider
              value={values.principal}
              onChange={handleSliderChange('principal')}
              min={0}
              max={100000}
              step={1000}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="principal"
              value={values.principal}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />

            <Typography gutterBottom mt={3}>Monthly Contribution ($)</Typography>
            <Slider
              value={values.contribution}
              onChange={handleSliderChange('contribution')}
              min={0}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="contribution"
              value={values.contribution}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                startAdornment: '$'
              }}
            />

            <Typography gutterBottom mt={3}>Investment Length (years)</Typography>
            <Slider
              value={values.years}
              onChange={handleSliderChange('years')}
              min={1}
              max={50}
              step={1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="years"
              value={values.years}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />

            <Typography gutterBottom mt={3}>Estimated Annual Return (%)</Typography>
            <Slider
              value={values.rate}
              onChange={handleSliderChange('rate')}
              min={0}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="rate"
              value={values.rate}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: '%'
              }}
            />

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                size="large"
                onClick={calculateInvestment}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
              </Button>
            </Box>
          </Grid>

          {results && (
            <Grid item xs={12} md={6}>
              <Box mb={4}>
                <Typography variant="h5" gutterBottom>
                  Investment Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Final Balance</Typography>
                      <Typography variant="h4" color="primary">
                        ${parseFloat(results.finalBalance).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Total Contributions</Typography>
                      <Typography variant="h4" color="primary">
                        ${parseFloat(results.totalContributions).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Interest Earned</Typography>
                      <Typography variant="h4" color="primary">
                        ${parseFloat(results.interestEarned).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Box height={300}>
                <Typography variant="h6" gutterBottom>
                  Growth Over Time
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#1976d2" 
                      activeDot={{ r: 8 }} 
                      name="Investment Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}
        </Grid>

        {results && results.tableData.length > 0 && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Year-by-Year Breakdown
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Contributions</TableCell>
                    <TableCell align="right">Interest Earned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.tableData.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell align="right">${parseFloat(row.balance).toLocaleString()}</TableCell>
                      <TableCell align="right">${parseFloat(row.contributions).toLocaleString()}</TableCell>
                      <TableCell align="right">${parseFloat(row.interest).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default InvestmentCalculator;