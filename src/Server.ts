import { injectable } from "inversify";
import { Server as HttpServer } from "http";
import { Application } from "./Application";
import { Environment } from "./Environment";
import { DB } from "./db/DB";

@injectable()
export class Server {
  constructor(
    private app: Application,
    private env: Environment,
    protected db: DB
  ) {}

  up(): Promise<HttpServer> {
    const port = this.env.port;
    return this.db.getConnection().then((conn) => {
      console.log("db connected!!!");
      return this.app.build().listen(port, () => {
        console.log(`server running on port: ${port}`);
      });
    });
  }
}
