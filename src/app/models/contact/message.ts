import { Sender } from "./sender";

const TIMES = 60000;
export class Message {
  public read: boolean;
  public sent: boolean;

  constructor(public readonly sender: Sender, public readonly text: string,
    public date: Date = new Date()) {
    this.setToCurrentDate();
  }

  public setToCurrentDate(): void {
    const d = new Date();
    this.date = new Date(d.getTime() + d.getTimezoneOffset() * TIMES);
  }
}