const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(helmet());
app.use(express.json());

// Mount auth routes
app.use('/api/auth', authRoutes);

module.exports = app;