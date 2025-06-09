import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider,
  Grid,
  Alert,TextField
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ChronologicalAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [comparisonDate, setComparisonDate] = useState(null);
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const compareDate = comparisonDate || new Date();
    const birth = new Date(birthDate);
    
    if (birth > compareDate) {
      setResult({ error: 'Birth date cannot be after the comparison date' });
      return;
    }

    let years = compareDate.getFullYear() - birth.getFullYear();
    let months = compareDate.getMonth() - birth.getMonth();
    let days = compareDate.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(compareDate.getFullYear(), compareDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
      totalDays: Math.floor((compareDate - birth) / (1000 * 60 * 60 * 24)),
      comparisonDate: compareDate.toLocaleDateString()
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Chronological Age Calculator
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Birth"
                value={birthDate}
                onChange={setBirthDate}
                maxDate={comparisonDate || new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Comparison Date (optional)"
                value={comparisonDate}
                onChange={setComparisonDate}
                minDate={birthDate}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateAge}
            disabled={!birthDate}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Age
          </Button>
        </Box>

        {result && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            {result.error ? (
              <Alert severity="error">{result.error}</Alert>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  Age on {result.comparisonDate}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Years</Typography>
                      <Typography variant="h4" color="primary">
                        {result.years}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Months</Typography>
                      <Typography variant="h4" color="primary">
                        {result.months}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Days</Typography>
                      <Typography variant="h4" color="primary">
                        {result.days}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Total Days</Typography>
                      <Typography variant="h5" color="primary">
                        {result.totalDays.toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ChronologicalAgeCalculator;