const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example route for plagiarism checking (we'll just return a dummy response for now)
app.post('/plagiarism-check', (req, res) => {
    const text = req.body.text;
    res.json({ status: 'success', result: 'No plagiarism found' });
});

// Start server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
