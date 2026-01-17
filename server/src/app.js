const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes); 

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
