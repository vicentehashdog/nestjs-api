import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { UsersModule } from "src/users/users.module";
import { MessagesModule } from "src/message/messages.module";

@Module({
  imports: [
    UsersModule,
    MessagesModule
  ],
  providers: [ChatGateway]
})
export class ChatModule {}