const Url = require('../models/urlModel');
const redisClient = require('redis').createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
const crypto = require('crypto');

function generateShortUrl(longUrl) {
  const hash = crypto.createHash('sha256').update(longUrl).digest('base64').substr(0, 8);
  return hash;
}

async function shortenUrl(longUrl, userId) {
  const shortUrl = generateShortUrl(longUrl);
  
  const url = new Url({
    longUrl,
    shortUrl,
    user: userId
  });

  await url.save();
  redisClient.set(shortUrl, longUrl);
  
  return { shortUrl };
}

async function redirectToUrl(shortUrl, res) {
  redisClient.get(shortUrl, async (err, longUrl) => {
    if (longUrl) {
      res.redirect(longUrl);
    } else {
      const url = await Url.findOne({ shortUrl });
      if (url) {
        redisClient.set(shortUrl, url.longUrl);
        res.redirect(url.longUrl);
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
    }
  });
}

module.exports = { shortenUrl, redirectToUrl };
