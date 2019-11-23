
const winston = require('winston');

class LoggerProxy {
    constructor(object) {
        const handlers = {
            get(target, key) {

                const logger = winston.createLogger({
                    level: 'info',
                    format: winston.format.json(),
                    transports: [
                        new winston.transports.Console()
                    ]
                });

                //prop in object
                const propertyValue = target[key];

                //skip if not a function
                if (typeof propertyValue !== 'function') {
                    return propertyValue;
                }

                //log everything about called function.
                // ...args is args for called function, HttpClient.get() for example
                return function (...args) {
                    logger.info(`${key} ${JSON.stringify(args)}`);
                    return propertyValue.apply(target, args);
                };
            }

        };

        const proxy = new Proxy(object, handlers);
        return proxy;
    }
}

exports.LoggerProxy = LoggerProxy;