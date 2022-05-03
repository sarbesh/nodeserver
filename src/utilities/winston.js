const winston = require('winston');
const util = require('util');

var options = {
    console: {
        level: 'debug',
        colorize: true,
        timestamp: true,
        label: 'console'
    },
}

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});