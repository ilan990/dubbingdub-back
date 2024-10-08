const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./src/middlewares/auth');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const filmRoutes = require('./src/routes/filmRoutes');
const candidatureRoutes = require('./src/routes/candidatureRoutes');
const contratRoutes = require('./src/routes/contratRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/candidature',candidatureRoutes)
app.use('/api/contrat',contratRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});