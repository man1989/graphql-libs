import { statSync } from 'node:fs';
import { isAbsolute } from 'node:path';

import winston from 'winston';

import { LoggerOptsType } from "./types";

const { combine, errors, timestamp, printf, json } = winston.format;

class WinstonLogger{
    private logger;

    constructor(config: LoggerOptsType & { appname: string }){
        this.logger = this.init(config);
    }

    init(config: LoggerOptsType & { appname: string }){
        const metaData: Record<string, string> = { service: config.appname };
        
        let logFilePath = config.logFilePath;
        
        const transports: winston.transport[] = [];
        
        console.log("config.logFilePath: ", config.logFilePath);
        if (config.logFilePath && !isAbsolute(config.logFilePath)) {
            console.warn("failed to initialize file logger");
            console.warn("logFilePath should be absolute path");
        }
        
        if (config.logFilePath) {
            const stats = statSync(config.logFilePath, { throwIfNoEntry: false });
            if (stats?.isFile()) {
            logFilePath = config.logFilePath;
            }
            transports.push(new winston.transports.File({ filename: logFilePath }));
        }
        
        if (config.isConsoleLogEnabled) {
            transports.push(new winston.transports.Console({ format: winston.format.json() }));
        }
        
        const logger = winston.createLogger({
            level: config.logLevel,
            format: combine(
            errors({ stack: true }),
            timestamp(),
            json(),
            printf(({ timestamp, level, message, ...meta }) => {
                return JSON.stringify({
                timestamp,
                level,
                message,
                ...meta,
                });
            }),
            ),
        
            defaultMeta: metaData,
        
            transports: transports,
        
            exceptionHandlers: transports,
        
            rejectionHandlers: transports,
        });
        
        return logger;
    }

    getLogger(){
        return this.logger
    }
}

export function getLogger(config: LoggerOptsType & { appname: string }){
    const winstonLogger = new WinstonLogger(config);
    return winstonLogger.getLogger();
}

export type LoggerType = winston.Logger;