import { Application as ExpressApplication } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify.config";
import { injectable } from "inversify";
import "./http/Controllers/HealthController";
import "./http/Controllers/UserController";
import morgan from "morgan";
import bodyParser from "body-parser";

@injectable()
export class Application {
  build = (): ExpressApplication => {
    const inversifyExpressServer = new InversifyExpressServer(container, null, {
      rootPath: "/api/v1",
    });
    inversifyExpressServer.setConfig((app) => {
      this.addMiddlewares(app);
    });
    return inversifyExpressServer.build();
  };

  private addMiddlewares(app: ExpressApplication): void {
    app.use(bodyParser.json());
    app.use(morgan("dev"));
  }
}
