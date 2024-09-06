export interface LoggerOptsType {
    isConsoleLogEnabled?: boolean,
    logFilePath?: string,
    logLevel?: string
}

export type stack = string;
export type UUID = string;

export type Meta = object | string;

export interface ILogger {
    error(
      message: string,
      messageCode?: string,
      stackTrace?: stack,
      traceId?: UUID,
      meta?: Meta,
    ): void;
  
    warn(message: string, messageCode?: string, meta?: Meta): void;
  
    info(message: string, messageCode?: string, meta?: Meta): void;
  
    http(message: string, messageCode?: string, meta?: Meta): void;
  
    verbose(message: string, messageCode?: string, meta?: Meta): void;
  
    debug(message: string, messageCode?: string, meta?: Meta): void;
  
    silly(message: string, messageCode?: string, meta?: Meta): void;
}