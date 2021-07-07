import { injectable } from "inversify";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { MainRepository } from "./MainRepository";
import { UserCreateRequest } from "../http/Requests/UserCreateRequest";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Logger, LoggerTransport } from "../infra/logger/Logger";

export interface IUserRepository {
  getUsers(): Promise<User[]>;
  createUser(user: UserCreateRequest): Promise<QueryDeepPartialEntity<User>>;
  getUserByEmail(email: string): Promise<User>;
}

export interface InserResultRaw {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

@injectable()
export class UserRepository extends MainRepository implements IUserRepository {
  private logger: Logger;
  constructor() {
    super(getRepository(User));
    this.logger = new Logger(LoggerTransport.file, {
      filename: "logs/users.log",
    });
  }

  /**
   * get all users
   * @returns {Promise<User[]>}
   */
  getUsers(): Promise<User[]> {
    return this.instance.find();
  }

  /**
   * creates a new user
   * @param {UserCreateRequest} user
   * @returns {Promise<QueryDeepPartialEntity<User> | null>}
   */
  async createUser(
    user: UserCreateRequest
  ): Promise<QueryDeepPartialEntity<User>> {
    const { firstName, lastName, email } = user;
    if (await this.getUserByEmail(email)) {
      throw new Error("Email already registered");
    }
    const newUser: QueryDeepPartialEntity<User> = this.instance.create({
      firstName,
      lastName,
      email,
    });
    const response = await this.instance.insert(newUser);
    const raw: InserResultRaw = response.raw;
    if (raw.affectedRows) {
      this.logger.info(`User created with id: ${raw.insertId}`);
      return newUser;
    }
    throw new Error("Something went wrong creating the user");
  }

  /**
   * gets by email
   * @param {string} email
   * @returns {Promise<User>}
   */
  getUserByEmail(email: string): Promise<User> {
    return this.instance.findOne({
      where: {
        email,
      },
    });
  }

  deleteUser(id: number) {
    return this.instance.delete({
      where: {},
    });
  }
}
