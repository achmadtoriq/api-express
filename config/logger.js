const winston = require('winston');
const moment = require('moment-timezone');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') }),
        winston.format.printf(({ timestamp, level, message, reqId }) => {        
          return `${timestamp} ${level} - ${reqId}: ${message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;