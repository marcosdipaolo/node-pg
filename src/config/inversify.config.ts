import { Container } from "inversify";
import { Application } from "../Application";
import { Server } from "../Server";
import { Environment } from "../Environment";
import { DB } from "../db/DB";
import { TYPES } from "./types";
import {
  UserRepository,
  IUserRepository,
} from "../repositories/UserRepository";
import { Logger } from "../infra/logger/Logger";

const container = new Container();
container.bind<Application>(Application).toSelf();
container.bind<Server>(Server).toSelf();
container.bind<DB>(DB).toSelf();
container.bind<Logger>(Logger).toSelf();
container.bind<Environment>(Environment).toSelf();
container.bind<IUserRepository>(TYPES.userRepository).to(UserRepository);

export default container;
