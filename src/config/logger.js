import log4js from 'log4js';

export const configureLogger = () => {
    log4js.configure({
        appenders: {
            console: { type: 'console' },
            errors: { type: 'file', filename: 'logs/error.log' },
            warns: { type: 'file', filename: 'logs/warn.log' }
        },
        categories: {
            default: { appenders: ['console'], level: 'info' },
            error: { appenders: ['errors', 'console'], level: 'error' },
            warn: { appenders: ['warns', 'console'], level: 'warn' }
        }
    });
}

export const logger = log4js.getLogger();
export const warnLogger = log4js.getLogger('warn');
export const errorLogger = log4js.getLogger('error');