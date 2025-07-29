require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));

// Public routes (no auth required)
app.get('/api/public/experiences', require('./controllers/experienceController').getAllExperiences);
app.get('/api/public/projects', require('./controllers/projectController').getAllProjects);
app.get('/api/public/education', require('./controllers/educationController').getAllEducation);
app.get('/api/public/skills', require('./controllers/skillController').getAllSkills);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));