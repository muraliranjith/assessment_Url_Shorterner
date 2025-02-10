require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
redisClient.on('connect', () => console.log('Connected to Redis'));

app.use(express.json());
app.use(cors());

const urlRoutes = require('./src/routes/urlRoutes');
app.use('/api/url', urlRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use('/api/', limiter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
