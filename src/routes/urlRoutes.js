const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToUrl } = require('../services/urlService');
const verifyToken = require('../middlewares/authMiddleware');

// Route for shortening URL
router.post('/shorten', verifyToken, async (req, res) => {
  const { longUrl } = req.body;
  const userId = req.user.sub; // Google's user ID
  const result = await shortenUrl(longUrl, userId);
  res.status(201).json(result);
});

// Route for redirection
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  await redirectToUrl(shortUrl, res);
});

module.exports = router;
