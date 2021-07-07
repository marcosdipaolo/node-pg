import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { results, request as decoRequest } from "inversify-express-utils";
import { inject } from "inversify";
import { IUserRepository } from "../../repositories/UserRepository";
import { TYPES } from "../../config/types";
import { Request } from "express";

@controller("/users")
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.userRepository) private userRepository: IUserRepository
  ) {
    super();
  }
  @httpGet("/")
  async getUsers(): Promise<results.JsonResult> {
    return this.json(await this.userRepository.getUsers());
  }

  @httpGet("/:email")
  async findByEmail(
    @decoRequest() request: Request
  ): Promise<results.JsonResult> {
    const { email } = request.params;
    if (!email) {
      return this.json({});
    }
    return this.json(this.userRepository.getUserByEmail(email));
  }

  @httpPost("/")
  async createUser(
    @decoRequest() request: Request
  ): Promise<results.JsonResult> {
    try {
      const { firstName, lastName, email } = request.body;
      const response = await this.userRepository.createUser({
        firstName,
        lastName,
        email,
      });
      return this.json(response || { message: "something when wrong." });
    } catch (err) {
      return this.json({ error: err.message }, 422);
    }
  }
}
