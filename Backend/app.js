const express = require('express');
require('dotenv').config;
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');
const dbConnect = require('./database/dbConnect');
const app = express();
const AppError = require('./utils/AppError');
const cors = require('cors');

//Middlewares
dbConnect();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT;

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} URL `, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    data: err,
  });
});

module.exports = app;
