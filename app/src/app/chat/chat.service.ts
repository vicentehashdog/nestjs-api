import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private socket: Socket,
    private authenticationService: AuthenticationService
  ){}

  public sendMessage(text) {
    const currentUser = this.authenticationService.currentUserValue;
    const message = {
      message: text,
      id: currentUser.id
    }
    this.socket.emit("msgToServer", message)
  }

  public getMessage() {
    return Observable.create((observer) => {
      this.socket.on("msgToClient", message => {
        observer.next(message);
      });
    })
  }
}