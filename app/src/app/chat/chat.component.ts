import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { NgForm } from '@angular/forms';
import { Message } from './message';

@Component({
  selector: "chat-root",
  templateUrl: "./chat.component.html"
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messageList: Message[] = [];

  constructor(private chatService: ChatService){}

  sendMessage(f: NgForm) {
    this.chatService.sendMessage(f.value.newMessage);
    f.resetForm();
  }

  ngOnInit() {
    this.chatService
      .getMessage()
      .subscribe((message: Message[]) => {
        this.messageList = message;
      });
  }
}