const express = require('express');
const URL = require('../models/URL');
const Analytics = require('../models/Analytics');
const rateLimiter = require('../utils/rateLimiter');
const { generateShortUrl } = require('../utils/urlUtils');
const router = express.Router();

// Rate-limited URL shortening endpoint
router.post('/shorten', rateLimiter, async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;

  const shortUrl = customAlias || generateShortUrl();
  
  const newUrl = new URL({
    originalUrl: longUrl,
    shortUrl: shortUrl,
    topic: topic,
    createdBy: req.user._id,
  });
  
  await newUrl.save();

  const newAnalytics = new Analytics({ url: newUrl._id });
  await newAnalytics.save();

  res.json({
    shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    createdAt: newUrl.createdAt,
  });
});

module.exports = router;
