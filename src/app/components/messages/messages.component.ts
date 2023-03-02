import { Component } from '@angular/core';
import { MessageService } from '../../services/messageService/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
