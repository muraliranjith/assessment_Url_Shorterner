const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('connect', () => {
  console.log('Redis connected');
});

module.exports = client;
