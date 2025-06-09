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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert  // <-- Add this line
} from '@mui/material';
import { FitnessCenter as FitnessIcon } from '@mui/icons-material';


const TDEECalculator = () => {
  const [values, setValues] = useState({
    gender: 'male',
    weight: '',
    height: '',
    age: '',
    activityLevel: '1.2',
    tdee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTDEE = () => {
    const { gender, weight, height, age, activityLevel } = values;

    if (!weight || !height || !age) {
      setValues(prev => ({
        ...prev,
        tdee: 'Please fill out all fields'
      }));
      return;
    }

    let bmr;
    
    // Calculate BMR using the Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    }

    // Calculate TDEE by multiplying BMR by the activity level
    const tdee = bmr * parseFloat(activityLevel);

    setValues(prev => ({
      ...prev,
      tdee: tdee.toFixed(2)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <FitnessIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            TDEE Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              value={values.weight}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: 'kg'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              value={values.height}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: 'cm'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age (years)"
              name="age"
              value={values.age}
              onChange={handleChange}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Activity Level</FormLabel>
              <RadioGroup
                row
                name="activityLevel"
                value={values.activityLevel}
                onChange={handleChange}
              >
                <FormControlLabel value="1.2" control={<Radio />} label="Sedentary (little or no exercise)" />
                <FormControlLabel value="1.375" control={<Radio />} label="Lightly active (light exercise/sports 1-3 days/week)" />
                <FormControlLabel value="1.55" control={<Radio />} label="Moderately active (moderate exercise/sports 3-5 days/week)" />
                <FormControlLabel value="1.725" control={<Radio />} label="Very active (hard exercise/sports 6-7 days a week)" />
                <FormControlLabel value="1.9" control={<Radio />} label="Super active (very hard exercise/sports & physical job or 2x training)" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateTDEE}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate TDEE
          </Button>
        </Box>

        {values.tdee && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Your TDEE
            </Typography>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {values.tdee === 'Please fill out all fields' ? values.tdee : `${values.tdee} kcal/day`}
              </Typography>
            </Paper>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            Your Total Daily Energy Expenditure (TDEE) is the amount of calories you need to maintain your current weight based on your activity level.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default TDEECalculator;
