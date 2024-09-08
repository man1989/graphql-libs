declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    LOG_LEVEL: string;
    CONFIG_PATH: string;
    LOG_FILE_PATH: string;
    NODE_ENV: string;
    PUBLIC_KEY: string;
    ENABLE_CONSOLE_LOGGING: string
    DOT_ENV_PATH: string
  }
}
