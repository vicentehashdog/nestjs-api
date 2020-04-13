import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  //@UseGuards(LocalAuthGuard)
  @Post("authenticate")
  async login(@Body() body) {
    const response = await this.userService.findByEmail(body.email);
    console.log(response);
    if (!response) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "The User not found."
      }, HttpStatus.NOT_FOUND);
    }
    const token = await this.authService.generateJwt(response);
    const user = {
      ...response,
      token
    };
    return user;
  }
}
