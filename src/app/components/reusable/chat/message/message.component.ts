import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/contact/message';
import { Sender } from 'src/app/models/contact/sender';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor() { }
  @Input() message: Message;
  @Input() isSameUser: boolean;
  @Input() isCurrentUser: boolean;

  public getMessage(): string {
    return this.message?.text;
  }

  public getTime(): string {
    const hours: number = this.date.getHours();
    const minutes: number = this.date.getMinutes();
    return `${hours}:${('0' + minutes).slice(-2)}`;
  }

  public get senderName(): string {
    return this.sender?.name;
  }

  private get sender(): Sender {
    const sender: Sender = new Sender(this.message?.sender?.name, this.message?.sender?.email);
    return sender;
  }

  private get date(): Date {
    const date: Date = new Date(this.message?.date);
    return date;
  }
}
