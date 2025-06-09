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
import { AccessTime as TimeIcon } from '@mui/icons-material';

const HoursCalculator = () => {
  const [entries, setEntries] = useState([{ hours: '', minutes: '' }]);
  const [total, setTotal] = useState(null);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { hours: '', minutes: '' }]);
  };

  const removeEntry = (index) => {
    if (entries.length <= 1) return;
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const calculateTotal = () => {
    let totalHours = 0;
    let totalMinutes = 0;

    entries.forEach(entry => {
      const hours = parseFloat(entry.hours) || 0;
      const minutes = parseFloat(entry.minutes) || 0;
      totalHours += hours;
      totalMinutes += minutes;
    });

    // Convert excess minutes to hours
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    setTotal({
      hours: totalHours,
      minutes: totalMinutes,
      decimal: totalHours + (totalMinutes / 60)
    });
  };

  const resetCalculator = () => {
    setEntries([{ hours: '', minutes: '' }]);
    setTotal(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <TimeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Hours Calculator
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Time Entries
        </Typography>
        
        {entries.map((entry, index) => (
          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={5} sm={3}>
              <TextField
                fullWidth
                label="Hours"
                value={entry.hours}
                onChange={(e) => handleChange(index, 'hours', e.target.value)}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} sm={3}>
              <TextField
                fullWidth
                label="Minutes"
                value={entry.minutes}
                onChange={(e) => handleChange(index, 'minutes', e.target.value)}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeEntry(index)}
                disabled={entries.length <= 1}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        <Box display="flex" gap={2} mb={4}>
          <Button
            variant="outlined"
            onClick={addEntry}
            sx={{ px: 4, py: 1.5 }}
          >
            Add Entry
          </Button>
          <Button
            variant="contained"
            onClick={calculateTotal}
            sx={{ px: 4, py: 1.5 }}
          >
            Calculate Total
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 4, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>

        {total && (
          <Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Total Time
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Hours:Minutes</Typography>
                  <Typography variant="h4" color="primary">
                    {total.hours}h {total.minutes}m
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Decimal Hours</Typography>
                  <Typography variant="h4" color="primary">
                    {total.decimal.toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography>Total Minutes</Typography>
                  <Typography variant="h4" color="primary">
                    {(total.hours * 60 + total.minutes).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            Useful for calculating work hours, timesheets, or adding multiple time durations.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default HoursCalculator;