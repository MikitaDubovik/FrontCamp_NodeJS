const winston = require('winston');

class Logger {
    constructor() {

        if (typeof Logger.instance === 'object') {
            return Logger.instance;
        }

        Logger.instance = this;

        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log', level: 'info' })
            ]
        });

        return this;
    }

    logInfo(url, body) {
        let bodyParsed = Object.keys(body).reduce((bodyParsed, key) => {
            return bodyParsed += `Key - ${key}, Value - ${body[key]}; `;
        }, "");

        this.logger.info(`URL - ${url}, body - ${bodyParsed}`);
    }

    logError(message) {
        this.logger.error(message);
    }
}

module.exports = Logger