import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { Functions as CalcIcon } from '@mui/icons-material';

const AverageCalculator = () => {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addNumber = () => {
    if (!input) return;
    const num = parseFloat(input);
    if (isNaN(num)) return;
    setNumbers([...numbers, num]);
    setInput('');
  };

  const calculateAverages = () => {
    if (numbers.length === 0) return;

    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    let median;
    if (sorted.length % 2 === 0) {
      median = (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2;
    } else {
      median = sorted[Math.floor(sorted.length/2)];
    }

    // Calculate mode
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
        modes = [num];
      } else if (frequency[num] === maxFreq) {
        modes.push(num);
      }
    });

    setResults({
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: maxFreq > 1 ? modes.join(', ') : 'No mode',
      count: numbers.length,
      sum: sum.toFixed(2)
    });
  };

  const resetCalculator = () => {
    setNumbers([]);
    setResults(null);
    setInput('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CalcIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Average Calculator
          </Typography>
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Enter a number"
            value={input}
            onChange={handleInputChange}
            type="number"
            variant="outlined"
            onKeyPress={(e) => e.key === 'Enter' && addNumber()}
            InputProps={{
              endAdornment: (
                <Button 
                  variant="contained" 
                  onClick={addNumber}
                  disabled={!input}
                >
                  Add
                </Button>
              )
            }}
          />
        </Box>

        {numbers.length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Numbers ({numbers.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {numbers.map((num, index) => (
                <Chip 
                  key={index} 
                  label={num} 
                  onDelete={() => setNumbers(numbers.filter((_, i) => i !== index))}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box display="flex" gap={2} mb={4}>
          <Button
            variant="contained"
            onClick={calculateAverages}
            disabled={numbers.length === 0}
            sx={{ px: 4, py: 1.5 }}
          >
            Calculate
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ px: 4, py: 1.5 }}
          >
            Reset
          </Button>
        </Box>

        {results && (
          <Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Results
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Mean (Average)" />
                <Typography variant="h6">{results.mean}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Median" />
                <Typography variant="h6">{results.median}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Mode" />
                <Typography variant="h6">{results.mode}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Count" />
                <Typography variant="h6">{results.count}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Sum" />
                <Typography variant="h6">{results.sum}</Typography>
              </ListItem>
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AverageCalculator;