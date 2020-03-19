import { Controller, Get } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
