import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  findAll() {
    return {
      status: 200,
      type: "user",
      data: [
        {
          id: 1,
          username: "sarriagada",
          email: "sergio@hashdog.com"
        },
        {
          id: 2,
          username: "juan",
          email: "juan@delamar.com"
        },
        {
          id: 3,
          username: "delacruz",
          email: "guido@gmail.com"
        }
      ]
    };
  }
}
