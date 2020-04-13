import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "src/users/user.entity";

@Entity("message")
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(type => UserEntity, userEntity => userEntity.messages)
  user: UserEntity;
}