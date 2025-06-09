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
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ name: '', grade: '', credits: '' }]);
  const [gpa, setGPA] = useState(null);

  const handleChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: '' }]);
  };

  const removeCourse = (index) => {
    if (courses.length <= 1) return;
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let hasError = false;

    const gradePoints = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'D-': 0.7,
      'F': 0.0
    };

    const calculatedCourses = courses.map(course => {
      const gradePoint = gradePoints[course.grade];
      if (!gradePoint) {
        hasError = true;
        return { ...course, error: 'Invalid grade' };
      }
      const credit = parseFloat(course.credits) || 0;
      const points = gradePoint * credit;
      totalCredits += credit;
      totalPoints += points;

      return {
        ...course,
        gradePoint,
        points
      };
    });

    if (hasError) {
      setGPA({ error: 'Please enter valid grades and credits for all courses.' });
      return;
    }

    if (totalCredits === 0) {
      setGPA({ error: 'Total credits cannot be zero.' });
      return;
    }

    const finalPercentage = (totalPoints / totalCredits) * 100;
    
    setGPA({
      value: finalPercentage.toFixed(2),
      letterGrade: getLetterGrade(finalPercentage),
      courses: calculatedCourses,
      totalCredits
    });
  };

  const resetCalculator = () => {
    setCourses([{ name: '', grade: '', credits: '' }]);
    setGPA(null);
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            GPA Calculator
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Courses
        </Typography>

        {courses.map((course, index) => (
          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Course Name"
                value={course.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={course.grade}
                  onChange={(e) => handleChange(index, 'grade', e.target.value)}
                  label="Grade"
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="C+">C+</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="C-">C-</MenuItem>
                  <MenuItem value="D+">D+</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="D-">D-</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Credits"
                value={course.credits}
                onChange={(e) => handleChange(index, 'credits', e.target.value)}
                variant="outlined"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeCourse(index)}
                disabled={courses.length <= 1}
                fullWidth
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        <Box display="flex" gap={2} mb={4}>
          <Button
            variant="outlined"
            onClick={addCourse}
            sx={{ px: 4, py: 1.5 }}
          >
            Add Course
          </Button>
          <Button
            variant="contained"
            onClick={calculateGPA}
            sx={{ px: 4, py: 1.5 }}
          >
            Calculate GPA
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 4, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>

        {gpa && gpa.error && (
          <Box mt={4}>
            <Alert severity="error">{gpa.error}</Alert>
          </Box>
        )}

        {gpa && gpa.value && (
          <Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              GPA
            </Typography>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {gpa.value}
              </Typography>
              <Typography variant="body1" mt={1}>
                Letter Grade: {gpa.letterGrade}
              </Typography>
            </Paper>
          </Box>
        )}

        <Box mt={4}>
          <Alert severity="info">
            GPA = (Sum of (Grade Points * Credits)) / Total Credits
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default GPACalculator;
