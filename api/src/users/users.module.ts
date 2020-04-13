import {
  Module
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UserEntity } from "./user.entity";
import { UsersService } from "./users.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth/auth.service";
import { LocalStrategy } from "./auth/local.strategy";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [
    UsersService,
    AuthService
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule {}
