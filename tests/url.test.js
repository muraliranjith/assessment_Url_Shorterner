// tests/url.test.js
const request = require('supertest');
const app = require('../server');  // Import your app

describe('POST /api/url/shorten', () => {
  it('should shorten a URL', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'https://example.com' })
      .set('Authorization', 'Bearer valid-google-token');

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBeDefined();
  });
});
