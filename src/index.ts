import "reflect-metadata";
import container from "./config/inversify.config";
import { Server } from "./Server";
import * as winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

console.log("ENV: " + process.env.NODE_ENV);

const server = container.get<Server>(Server);

server.up();
