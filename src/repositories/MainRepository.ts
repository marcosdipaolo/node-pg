import { Repository } from "typeorm";
import { injectable, unmanaged } from "inversify";

@injectable()
export abstract class MainRepository {
  protected constructor(@unmanaged() protected instance: Repository<any>) {}
}
