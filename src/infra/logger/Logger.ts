import { createLogger, Logger as WinstonLogger } from "winston";
import { TransportFactory } from "./TransportFactory";

export enum LoggerLevel {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
}

export enum LoggerTransport {
  console = "Console",
  file = "File",
  http = "Http",
  stream = "Stream",
}

export class Logger {
  private instance: WinstonLogger;
  constructor(
    private transport: LoggerTransport = LoggerTransport.console,
    options: any = {}
  ) {
    this.instance = createLogger({
      transports: [TransportFactory.make(transport, options)],
    });
  }

  /**
   * error
   * @param {string} message
   */
  error(message: string): void {
    this.instance.log({
      level: LoggerLevel.error,
      message,
    });
  }

  /**
   * info
   * @param {string} message
   */
  info(message: string) {
    console.log(message);
    this.instance.log("info", message);
  }
}
