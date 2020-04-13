import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  WsResponse
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { MessageEntity } from "src/message/message.entity";
import { MessagesService } from "src/message/messages.service";
import { UsersService } from "src/users/users.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService
  ){}
  //@WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connect ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnet ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, content: any ) {
    // client.emit('msgToClient', text);
    //this.wss.emit('msgToClient', text);
    const user = await this.usersService.findById(Number(content.id));


    const newMessage = new MessageEntity();
    newMessage.content = content.message;
    newMessage.user = user;

    await this.messagesService.create(newMessage);

    const messages = await this.messagesService.findAll();
    console.log(messages);

    client.emit('msgToClient', messages);
    // return { event: 'msgToClient', data:  };
  }
  
}