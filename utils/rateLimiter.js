const redis = require('../config/redis');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 URLs per minute
  duration: 60, // 1 minute
});

module.exports = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.user._id); // Rate limit per user
    next();
  } catch (rejRes) {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
};
