import { injectable } from "inversify";
import * as dotenv from "dotenv";

@injectable()
export class Environment {
  private qualifier: string | undefined;
  contructor() {
    this.qualifier = process.env.NODE_ENV;
    switch (this.qualifier) {
      case "development":
        dotenv.config({ path: `${process.cwd()}/.env.development` });
        break;
      case "test":
        dotenv.config({ path: `${process.cwd()}/.env.test` });
        break;
      default:
        break;
    }
  }

  get port(): string {
    return process.env.port || "3000";
  }
}
