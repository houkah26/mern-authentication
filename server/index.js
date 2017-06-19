import express from 'express';
import logger from 'morgan';
import config from './config/main';

// initialize express
const app = express();

// Start the server
const server = app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requeststo API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

