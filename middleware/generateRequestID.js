const { v4: uuidv4 } = require('uuid');
const logger = require('../config/logger');

// Middleware to generate and attach ReqId to each request
const requestIdMiddleware = (req, res, next) => {
  req.reqId = uuidv4(); // Generate a unique request ID
  req.startTime = process.hrtime(); // Record the start time of the request
  logger.info(`Request ID: ${req.reqId}`, { reqId: req.reqId })
  next();
};

module.exports = requestIdMiddleware;