// Middleware to calculate elapsed time
const calculateElapsedTime = (req, res, next) => {
  const elapsedTime = process.hrtime(req.startTime); // Calculate the elapsed time
  const elapsedTimeMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6; // Convert to milliseconds
  res.setHeader("X-Response-Time", `${elapsedTimeMs.toFixed(2)}ms`); // Set elapsed time in the header
  req.elapsedTimeMs = elapsedTimeMs; // Attach to request object for logging
  next();
};

module.exports = calculateElapsedTime;
