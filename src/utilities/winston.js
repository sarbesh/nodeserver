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

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

logger.put = (level, msg, error) => {
    msg = util.format('[Worker: %s] %s', process.pid, msg);
    if (error && error instanceof Error) {
        msg = util.format('%s stack: %s', msg, error.stack);
    }
    msg = util.format('[server] %s', msg);
    if (level==='error') {
        logger.error(msg);
    } else if (level==='warn') {
        logger.warn(msg);
    } else if (level==='debug') {
        logger.debug(msg);
    } else {
        logger.info(msg);
    }
};

module.exports = logger;