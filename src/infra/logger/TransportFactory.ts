import { injectable } from "inversify";
import * as Transport from "winston-transport";
import { LoggerTransport } from "./Logger";
import * as winston from "winston";

@injectable()
export class TransportFactory {
  static make(transport: LoggerTransport, options: any = {}): Transport {
    switch (transport) {
      case LoggerTransport.file:
        return new winston.transports.File(options);
      case LoggerTransport.http:
        return new winston.transports.Http(options);
      case LoggerTransport.stream:
        return new winston.transports.Stream(options);
      default:
        return new winston.transports.Console(options);
    }
  }
}
