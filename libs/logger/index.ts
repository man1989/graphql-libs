import { Logger } from "./logger";
import { LoggerOptsType } from "./types";

let logger: Logger;

export const LoggerFactory = {
  init(appName: string, options?: LoggerOptsType) {
    if (!logger) {
      logger = new Logger(appName, options);
      return logger;
    } else {
      throw new Error("logger already intialized, please use getLogger");
    }
  },

  getLogger() {
    if (!logger) {
      throw new Error("logger not initialized");
    }
    return logger;
  }
};