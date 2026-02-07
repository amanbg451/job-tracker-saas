const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
app.use('/api/auth', authRoutes); 
app.use('/api/jobs', jobRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
