import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  findAll() {
    return [
      {
        type: "Overnight",
        price: 25.99
      },
      {
        type: "2-Day",
        price: 9.99
      },
      {
        type: "Postal",
        price: 2.99
      },
      {
        type: "On Shop",
        price: 0.0
      }
    ];
  }
}
