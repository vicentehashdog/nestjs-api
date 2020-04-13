import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "./message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ){}

  async findAll(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }

  async create(message: MessageEntity): Promise<MessageEntity> {
    return await this.messageRepository.save(message);
  }
}