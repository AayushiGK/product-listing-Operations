const winston = require("winston");
const morgan = require("morgan");
const appRoot = require('app-root-path');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


module.exports = function (arrg) {


  morgan('tiny');

  var logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  logger.stream = {
    write: function (message, encoding) {
      logger.info(message);
    },
  };


  return {
    logger,
    morgan
  };
};