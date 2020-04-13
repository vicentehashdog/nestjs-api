import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./users/users.module";
import { MessagesModule } from "./message/messages.module";
import { Connection } from "typeorm";

import { UserEntity } from "./users/user.entity";
import { MessageEntity } from "./message/message.entity";
import { ChatGateway } from "./chat/chat.gateway";

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test',
        entities: [UserEntity,MessageEntity],
        synchronize: true,
      }
    ),
    UsersModule,
    MessagesModule
  ],
  controllers: [],
  providers: [ChatGateway]
})
export class AppModule {
  constructor(
    private readonly connection: Connection
  ){}
}
