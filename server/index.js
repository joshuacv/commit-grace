const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

let commitments = [];

app.use(cors());
app.use(express.json());

// Serve frontend from Vite build
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/api/commit', (req, res) => {
  const { name, amount } = req.body;
  if (!name || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  commitments.push({ name, amount: parseFloat(amount) });
  res.json({ message: 'Commitment added' });
});

app.get('/api/total', (req, res) => {
  const total = commitments.reduce((sum, c) => sum + c.amount, 0);
  res.json({ total, commitments });
});

// Fallback for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
