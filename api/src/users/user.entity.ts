import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MessageEntity } from "../message/message.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(type => MessageEntity, messageEntity => messageEntity.user )
  messages: MessageEntity[];
}