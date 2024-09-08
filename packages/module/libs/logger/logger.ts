import { ILogger, LoggerOptsType, Meta, stack, UUID } from "./types";
import { getLogger, LoggerType } from "./WinstonLogger";

export class Logger implements ILogger {
  private logger: LoggerType;
  private defaultOptions: LoggerOptsType = {
    isConsoleLogEnabled: true
  }

  constructor(appname: string, options?: LoggerOptsType) {
    this.logger = getLogger({ appname, ...this.defaultOptions, ...options });
  }

  error(message: string, messageCode?: string, stackTrace?: stack, traceId?: UUID, meta?: Meta) {
    this.logger.error(message, { messageCode, stackTrace, traceId, meta });
  }

  warn(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('warn', message, { messageCode, meta });
  }

  info(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('info', message, { messageCode, meta });
  }

  http(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('http', message, { messageCode, meta });
  }

  verbose(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('verbose', message, { messageCode, meta });
  }

  debug(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('debug', message, { messageCode, meta });
  }

  silly(message: string, messageCode?: string, meta?: Meta): void {
    this.logger.log('silly', message, { messageCode, meta });
  }
}