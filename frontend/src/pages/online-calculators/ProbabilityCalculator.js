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
  Tab,
  Alert
} from '@mui/material';
import { Calculate as CalcIcon } from '@mui/icons-material';

const ProbabilityCalculator = () => {
  const [tabValue, setTabValue] = useState(0);
  const [values, setValues] = useState({
    eventA: '',
    eventB: '',
    probA: '',
    probB: '',
    result: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setValues({
      eventA: '',
      eventB: '',
      probA: '',
      probB: '',
      result: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSingle = () => {
    const { eventA, probA } = values;
    if (!eventA || !probA) return;
    
    const prob = parseFloat(probA) / 100;
    const notProb = 1 - prob;
    
    setValues(prev => ({
      ...prev,
      result: {
        event: eventA,
        probability: probA + '%',
        notProbability: (notProb * 100).toFixed(2) + '%',
        oddsFor: `${prob.toFixed(2)}:${notProb.toFixed(2)}`,
        oddsAgainst: `${notProb.toFixed(2)}:${prob.toFixed(2)}`
      }
    }));
  };

  const calculateCombined = () => {
    const { probA, probB } = values;
    if (!probA || !probB) return;
    
    const pA = parseFloat(probA) / 100;
    const pB = parseFloat(probB) / 100;
    
    const and = (pA * pB * 100).toFixed(2) + '%';
    const or = ((pA + pB - pA * pB) * 100).toFixed(2) + '%';
    const aGivenB = ((pA * pB) / pB * 100).toFixed(2) + '%';
    const bGivenA = ((pA * pB) / pA * 100).toFixed(2) + '%';
    
    setValues(prev => ({
      ...prev,
      result: {
        and,
        or,
        aGivenB,
        bGivenA
      }
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CalcIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Probability Calculator
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
        >
          <Tab label="Single Event" />
          <Tab label="Multiple Events" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Name"
                  name="eventA"
                  value={values.eventA}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Probability (%)"
                  name="probA"
                  value={values.probA}
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
                onClick={calculateSingle}
                disabled={!values.eventA || !values.probA}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
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
                  label="Probability of Event A (%)"
                  name="probA"
                  value={values.probA}
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
                  label="Probability of Event B (%)"
                  name="probB"
                  value={values.probB}
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
                onClick={calculateCombined}
                disabled={!values.probA || !values.probB}
                sx={{ px: 6, py: 1.5 }}
              >
                Calculate
              </Button>
            </Box>
          </Box>
        )}

        {values.result && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Probability Results
            </Typography>
            
            {tabValue === 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Probability of {values.eventA}:</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.probability}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Probability of NOT {values.eventA}:</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.notProbability}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Odds For:</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.oddsFor}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Odds Against:</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.oddsAgainst}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>P(A and B):</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.and}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>P(A or B):</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.or}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>P(A|B):</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.aGivenB}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>P(B|A):</Typography>
                    <Typography variant="h5" color="primary">
                      {values.result.bGivenA}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            {tabValue === 0 ? 
              "Probability ranges from 0 (impossible) to 1 (certain)." : 
              "For independent events, P(A and B) = P(A) × P(B)"}
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProbabilityCalculator;