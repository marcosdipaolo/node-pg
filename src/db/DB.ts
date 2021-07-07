import { Connection, createConnection } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class DB {
  getConnection(): Promise<Connection> {
    return createConnection();
  }
}
