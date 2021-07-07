import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";
import { results } from "inversify-express-utils";
@controller("/health")
export class HealthController extends BaseHttpController {
  @httpGet("/")
  health(): results.JsonResult {
    return this.json({ message: "OK" });
  }
}
