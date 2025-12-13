// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const servicesRoutes = require('./routes/services');
const projectsRoutes = require('./routes/projects');
const teamRoutes = require('./routes/team');
const jobsRoutes = require('./routes/jobs');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Simple request logger to help debug incoming requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Routes
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/contact', contactRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Company website API is running' });
});

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});