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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert
} from '@mui/material';
import { School as SchoolIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const GradeCalculator = () => {
  const [assignments, setAssignments] = useState([
    { name: 'Assignment 1', score: '', maxScore: '', weight: '' }
  ]);
  const [finalGrade, setFinalGrade] = useState(null);

  const handleChange = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { name: `Assignment ${assignments.length + 1}`, score: '', maxScore: '', weight: '' }
    ]);
  };

  const removeAssignment = (index) => {
    if (assignments.length <= 1) return;
    const newAssignments = [...assignments];
    newAssignments.splice(index, 1);
    setAssignments(newAssignments);
  };

  const calculateGrade = () => {
    let totalWeighted = 0;
    let totalWeight = 0;
    let hasError = false;

    const calculatedAssignments = assignments.map(assignment => {
      const score = parseFloat(assignment.score) || 0;
      const maxScore = parseFloat(assignment.maxScore) || 1;
      const weight = parseFloat(assignment.weight) || 0;
      
      if (maxScore === 0) hasError = true;
      
      const percentage = (score / maxScore) * 100;
      const weighted = percentage * (weight / 100);
      
      return {
        ...assignment,
        percentage: percentage.toFixed(2),
        weighted: weighted.toFixed(2)
      };
    });

    if (hasError) {
      setFinalGrade({ error: 'Maximum score cannot be zero' });
      return;
    }

    calculatedAssignments.forEach(assignment => {
      totalWeighted += parseFloat(assignment.weighted);
      totalWeight += parseFloat(assignment.weight) || 0;
    });

    if (totalWeight === 0) {
      setFinalGrade({ error: 'Total weight cannot be zero' });
      return;
    }

    const finalPercentage = (totalWeighted / totalWeight) * 100;
    
    setFinalGrade({
      percentage: finalPercentage.toFixed(2),
      assignments: calculatedAssignments,
      totalWeight
    });
  };

  const resetCalculator = () => {
    setAssignments([{ name: 'Assignment 1', score: '', maxScore: '', weight: '' }]);
    setFinalGrade(null);
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Grade Calculator
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Assignments
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Max Score</TableCell>
                <TableCell align="right">Weight (%)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={assignment.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={assignment.score}
                      onChange={(e) => handleChange(index, 'score', e.target.value)}
                      type="number"
                      variant="standard"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={assignment.maxScore}
                      onChange={(e) => handleChange(index, 'maxScore', e.target.value)}
                      type="number"
                      variant="standard"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={assignment.weight}
                      onChange={(e) => handleChange(index, 'weight', e.target.value)}
                      type="number"
                      variant="standard"
                      sx={{ width: 80 }}
                      InputProps={{
                        endAdornment: '%'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => removeAssignment(index)}
                      disabled={assignments.length <= 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mb={3}>
          <Button
            variant="outlined"
            onClick={addAssignment}
            sx={{ px: 4, py: 1.5 }}
            startIcon={<AddIcon />}
          >
            Add Assignment
          </Button>
        </Box>

        <Box display="flex" gap={2} mb={4}>
          <Button
            variant="contained"
            onClick={calculateGrade}
            sx={{ px: 6, py: 1.5 }}
          >
            Calculate Final Grade
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 4, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>

        {finalGrade && (
          <Box>
            <Divider sx={{ mb: 3 }} />
            {finalGrade.error ? (
              <Alert severity="error">{finalGrade.error}</Alert>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  Final Grade
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Weighted Average (%)</Typography>
                      <Typography variant="h4" color="primary">
                        {finalGrade.percentage}%
                      </Typography>
                      <Typography variant="h6">
                        Letter Grade: {getLetterGrade(finalGrade.percentage)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography>Total Weight</Typography>
                      <Typography variant="h4" color="primary">
                        {finalGrade.totalWeight}%
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Typography variant="h6" mt={3}>
                  Detailed Breakdown
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Assignment</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Max Score</TableCell>
                        <TableCell align="right">Weight (%)</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                        <TableCell align="right">Weighted</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {finalGrade.assignments.map((assignment, index) => (
                        <TableRow key={index}>
                          <TableCell>{assignment.name}</TableCell>
                          <TableCell align="right">{assignment.score}</TableCell>
                          <TableCell align="right">{assignment.maxScore}</TableCell>
                          <TableCell align="right">{assignment.weight}</TableCell>
                          <TableCell align="right">{assignment.percentage}%</TableCell>
                          <TableCell align="right">{assignment.weighted}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default GradeCalculator;
