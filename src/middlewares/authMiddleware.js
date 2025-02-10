// src/middlewares/authMiddleware.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyToken(req, res, next) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    req.user = ticket.getPayload();
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
}

module.exports = verifyToken;
