const crypto = require('crypto');

const generateShortUrl = () => {
  return crypto.randomBytes(6).toString('hex'); // Generate a 12 character short URL
};

module.exports = { generateShortUrl };
