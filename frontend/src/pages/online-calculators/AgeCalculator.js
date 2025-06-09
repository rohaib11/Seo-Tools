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
import { Person as PersonIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select a valid birth date');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    
    if (birth > today) {
      setError('Birth date cannot be in the future');
      return;
    }

    setError(null);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
      totalDays: Math.floor((today - birth) / (1000 * 60 * 60 * 24)),
      totalMonths: years * 12 + months,
      nextBirthday: new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Age Calculator
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date of Birth"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={calculateAge}
                sx={{ py: 2 }}
              >
                Calculate Age
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>

        {result && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Age Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Years</Typography>
                  <Typography variant="h4" color="primary">
                    {result.years}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Months</Typography>
                  <Typography variant="h4" color="primary">
                    {result.months}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Days</Typography>
                  <Typography variant="h4" color="primary">
                    {result.days}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Months</Typography>
                  <Typography variant="h4" color="primary">
                    {result.totalMonths}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Days</Typography>
                  <Typography variant="h4" color="primary">
                    {result.totalDays}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="body1">
                Next birthday: {result.nextBirthday.toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AgeCalculator;