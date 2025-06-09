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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert 
} from '@mui/material';
import { FitnessCenter as FitnessIcon } from '@mui/icons-material';

const CalorieCalculator = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calories, setCalories] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const calculateBMR = () => {
    if (!age || !height || !weight) return;

    let bmr;

    // Harris-Benedict equation to calculate BMR
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
    } else {
      return;
    }

    // Apply the activity multiplier
    let activityMultiplier = 1.2; // Sedentary (little or no exercise)
    if (activityLevel === 'light') {
      activityMultiplier = 1.375; // Lightly active (light exercise/sports 1-3 days/week)
    } else if (activityLevel === 'moderate') {
      activityMultiplier = 1.55; // Moderately active (moderate exercise/sports 3-5 days/week)
    } else if (activityLevel === 'intense') {
      activityMultiplier = 1.725; // Very active (hard exercise/sports 6-7 days a week)
    } else if (activityLevel === 'veryIntense') {
      activityMultiplier = 1.9; // Extremely active (very hard exercise, physical job, or training twice a day)
    }

    const totalCalories = bmr * activityMultiplier;
    setCalories(totalCalories.toFixed(2));
  };

  const resetCalculator = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setActivityLevel('sedentary');
    setCalories(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <FitnessIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Calorie Calculator
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup value={gender} onChange={handleGenderChange} row>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Activity Level</FormLabel>
              <RadioGroup value={activityLevel} onChange={handleActivityLevelChange} row>
                <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary (little to no exercise)" />
                <FormControlLabel value="light" control={<Radio />} label="Lightly active" />
                <FormControlLabel value="moderate" control={<Radio />} label="Moderately active" />
                <FormControlLabel value="intense" control={<Radio />} label="Very active" />
                <FormControlLabel value="veryIntense" control={<Radio />} label="Extremely active" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={calculateBMR}
            sx={{ px: 6, py: 1.5 }}
            disabled={!gender || !age || !height || !weight}
          >
            Calculate Calories
          </Button>
        </Box>

        {calories && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Daily Calorie Needs
            </Typography>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {calories} kcal/day
              </Typography>
            </Paper>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            This is an estimate of your daily calorie needs based on the Mifflin-St Jeor equation.
          </Alert>
        </Box>

        <Box mt={3} textAlign="center">
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 6, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CalorieCalculator;
