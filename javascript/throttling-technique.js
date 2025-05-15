// limiting the number of requests that a client can make to an API within a certain time frame.
// This prevents abuse of the API, denial-of-service attacks. It can be configured at different levels of the API endpoints.
// To use it for specific users, integrate API key or token-based authentication mechanisms to track and enforce usage limits for different clients.
// Consider implementing caching database to store request counts instead of using in-memory "Map" object when working with distributed deployments to ensure scalability

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// ==== Solution-1 Using "k-utility" =====
const rateLimiter = require("k-utilities/network.js");
app.use(rateLimiter); // Apply the rate limiting middleware to all routes

// ==== Solution-2 Using "express-rate-limit" =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter); //  Apply the rate limiter to all requests

app.get("/", (req, res) => res.json("Request processed successfully"));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
