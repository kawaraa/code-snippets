// limiting the number of requests that a client can make to an API within a certain time frame.
// This prevents abuse of the API, denial-of-service attacks. It can be configured at different levels of the API endpoints.
// To use it for specific users, integrate API key or token-based authentication mechanisms to track and enforce usage limits for different clients.
// Consider implementing caching database to store request counts instead of using in-memory "Map" object when working with distributed deployments to ensure scalability

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// ==== Solution-1 =====
const requestCounts = new Map();

// Define the rate limit parameters
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 40;

// Middleware function to implement rate limiting
function rateLimit(req, res, next) {
  const clientIp = req.ip; // Get client's IP address
  const newRequestData = { count: 1, timestamp: Date.now() };
  const requestData = requestCounts.get(clientIp);

  if (!requestData) requestCounts.set(clientIp, newRequestData);
  else {
    const exceededTheMaximum = newRequestData.timestamp - requestData.timestamp < WINDOW_SIZE;
    requestData.count++;

    if (requestData.count > MAX_REQUESTS && exceededTheMaximum) {
      // If the request count exceeds the maximum, send a 429 response
      return res.status(429).send("Too many requests, please try again later.");
    } else {
      // If the time window has elapsed, reset the request count
      requestCounts.set(clientIp, requestData);
    }
  }

  // Continue to the next middleware or route handler
  next();
}

// Apply the rate limiting middleware to all routes
app.use(rateLimit);

// ==== Solution-2 =====
// // Using "express-rate-limit" => Define the rate limit options
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: "Too many requests, please try again later.",
// });

// // Apply the rate limiter to all requests
// app.use(limiter);

app.get("/", (req, res) => res.json("Request processed successfully"));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
