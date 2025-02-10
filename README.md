# assessment_Url_Shorterner

# URL Shortener with Google Sign-In

A URL shortener service that allows users to shorten long URLs, redirect to the original URL, and track analytics. The service also includes Google Sign-In for user authentication, rate limiting, caching with Redis, and detailed analytics for each shortened URL.

## Features
- **User Authentication**: Authenticate users via Google Sign-In.
- **Shorten URLs**: Create custom short URLs for easier sharing.
- **Redirect Short URL**: Redirect to the original URL when visiting the short URL.
- **Analytics**: Track clicks, unique users, and detailed performance for each shortened URL.
- **Topic-Based Analytics**: Group URLs by categories (topics) and track their performance.
- **Rate Limiting**: Limit the number of URLs a user can shorten in a given time frame.
- **Caching**: Use Redis to cache short and long URLs to improve performance.

## Prerequisites

Before you run this project, make sure you have the following software installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for a cloud database).
- **Redis**: [Install Redis](https://redis.io/download) (or use a hosted Redis service).
- **Google Developer Console** account for OAuth 2.0 credentials.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/muraliranjith/assessment_Url_Shorterner.git
    cd assessment_Url_Shorterner
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root of the project and add the following:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost/url-shortener
    REDIS_HOST=localhost
    REDIS_PORT=6379
    GOOGLE_CLIENT_ID=your_google_client_id_here
    ```

    - Replace `your_google_client_id_here` with the Google Client ID you get from the Google Developer Console.

4. **Start MongoDB** and **Redis**:
   - If you're running them locally, start the MongoDB server with `mongod` and the Redis server with `redis-server`.

5. **Start the project**:

    ```bash
    npm start
    ```

    Your server will start running on `http://localhost:3000`.

---

## API Endpoints

### 1. **User Authentication**
- **POST** `/api/auth/login`
  - Authenticates the user using Google Sign-In with a token.
  - **Request Body**:
    ```json
    {
      "tokenId": "google_token_here"
    }
    ```

### 2. **Create Short URL**
- **POST** `/api/shorten`
  - Shortens a long URL.
  - **Request Body**:
    ```json
    {
      "longUrl": "http://example.com",
      "customAlias": "custom-alias",
      "topic": "activation"
    }
    ```
  - **Response**:
    ```json
    {
      "shortUrl": "http://localhost:3000/api/shorten/custom-alias",
      "createdAt": "2025-02-10T12:00:00Z"
    }
    ```

### 3. **Redirect Short URL**
- **GET** `/api/shorten/{alias}`
  - Redirects to the original long URL.
  - Example:
    ```http
    GET http://localhost:3000/api/shorten/custom-alias
    ```

### 4. **Get URL Analytics**
- **GET** `/api/analytics/{alias}`
  - Retrieves analytics for a specific short URL.
  - **Response**:
    ```json
    {
      "totalClicks": 120,
      "uniqueUsers": 100,
      "clicksByDate": [
        { "date": "2025-02-01", "clickCount": 50 },
        { "date": "2025-02-02", "clickCount": 70 }
      ],
      "osType": [
        { "osName": "Windows", "uniqueClicks": 60, "uniqueUsers": 55 },
        { "osName": "Android", "uniqueClicks": 30, "uniqueUsers": 25 }
      ],
      "deviceType": [
        { "deviceName": "Mobile", "uniqueClicks": 80, "uniqueUsers": 70 },
        { "deviceName": "Desktop", "uniqueClicks": 40, "uniqueUsers": 30 }
      ]
    }
    ```

### 5. **Get Topic-Based Analytics**
- **GET** `/api/analytics/topic/{topic}`
  - Retrieves analytics for URLs grouped by a specific topic.
  - **Response**:
    ```json
    {
      "totalClicks": 200,
      "uniqueUsers": 150,
      "clicksByDate": [
        { "date": "2025-02-01", "clickCount": 100 },
        { "date": "2025-02-02", "clickCount": 100 }
      ],
      "urls": [
        {
          "shortUrl": "http://localhost:3000/api/shorten/alias1",
          "totalClicks": 120,
          "uniqueUsers": 90
        },
        {
          "shortUrl": "http://localhost:3000/api/shorten/alias2",
          "totalClicks": 80,
          "uniqueUsers": 60
        }
      ]
    }
    ```

### 6. **Get Overall Analytics**
- **GET** `/api/analytics/overall`
  - Retrieves overall analytics for all URLs created by the authenticated user.
  - **Response**:
    ```json
    {
      "totalUrls": 5,
      "totalClicks": 600,
      "uniqueUsers": 500,
      "clicksByDate": [
        { "date": "2025-02-01", "clickCount": 300 },
        { "date": "2025-02-02", "clickCount": 300 }
      ],
      "osType": [
        { "osName": "Windows", "uniqueClicks": 150, "uniqueUsers": 120 },
        { "osName": "Android", "uniqueClicks": 100, "uniqueUsers": 90 }
      ],
      "deviceType": [
        { "deviceName": "Mobile", "uniqueClicks": 300, "uniqueUsers": 250 },
        { "deviceName": "Desktop", "uniqueClicks": 100, "uniqueUsers": 80 }
      ]
    }
    ```

---

## Rate Limiting

The API enforces rate limiting for users to prevent abuse. Users can only shorten a specific number of URLs within a given time frame. The default rate limit is **10 URLs per minute**.

---

## Caching with Redis

Redis is used to cache the short and long URLs to improve performance. Cached data is used for analytics and URL redirection.

---

## Running Tests

This project uses **Mocha** and **Chai** for testing. To run the tests, execute the following command:

```bash
npm test
