import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Message } from 'src/app/models/contact/message';
import { Sender } from 'src/app/models/contact/sender';
import { ContactService } from 'src/app/services/contact/contact.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private formBuilder: FormBuilder, private contactService: ContactService,
    private portfolioService: PortfolioService, private changeDetectorRef: ChangeDetectorRef) {
    this.initialiseChat();
  }
  // TODO -- add mail API
  // TODO -- fix send button position
  // TODO -- disable chat box on send
  private readonly DEFAULT_HEIGHT: number = 35;
  public chatHeight: number = this.DEFAULT_HEIGHT;
  public typing: boolean;
  public contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    text: ['', Validators.required],
  });
  messagesSubject: Subject<Message> = new Subject();

  private sendMessageSubject: Subject<{ delay: number, message: Message, typing: boolean }> = new Subject();
  public currentUser: Sender = new Sender();
  private me: Sender = new Sender('Robot Ani', 'anilde@robotemail.com');
  public showInputBox: boolean = false;
  private messageCount: number = 0;
  public sendButtonEnabled: boolean;
  public myMessages = [
    {
      message: new Message(this.me, 'Hi there, if you would like to leave me a message, please let me know your name'),
      field: 'name',
    },
    {
      message: new Message(this.me, `Thanks. And what's your email?`),
      field: 'email',
    },
    {
      message: new Message(this.me, `Nice! Now please type your message`),
      field: 'text',
      chatBoxSize: 100
    }
  ]
  public readonly myMessagesReturningUser = [
    {
      message: new Message(this.me, 'Would you like to send me another message? If so, go ahead'),
      field: 'text',
      chatBoxSize: 100
    }
  ]

  public readonly errorMessages = {
    name: {
      required: 'Please enter your name',
      pattern: 'Please enter a valid name'
    },
    email: {
      required: 'Please enter your email',
      email: 'Please enter a valid email'
    },
    text: {
      required: 'Please enter your message',
      pattern: 'Please enter a valid message'
    }
  };


  public submit(control: FormControl) {
    if (!this.currentControl) {
      return;
    }
    if (control.valid) {
      this.currentControl.setValue(control.value);
      // send currentUser message
      const userMessage: Message = new Message(this.updateUserDetails(), control.value);
      this.sendMessageSubject.next({ delay: 0, message: userMessage, typing: false });


      this.messageCount++;
      control.reset();
      control.disable();
      this.sendButtonEnabled = false;
      // on conversation end
      if (this.isLastMessage) {
        this.saveUserMessage(userMessage);
      }

    } else {
      control.markAsTouched();
    }
  }

  public initialiseChat(): void {
    this.sendMessageSubject.subscribe((message) => {
      timer(message.delay).subscribe(() => {
        this.sendMessage(message.message);
        const isCurrentUser = message.message.sender.isSameUser(this.currentUser);
        if (isCurrentUser) {
          this.triggerNextRobotMessage();
        } else {
          this.typing = false;
          this.chatHeight = this.myMessages[this.messageCount]?.chatBoxSize || this.DEFAULT_HEIGHT;
          if (this.isLastMessage) {
            this.restartChat();
          }
        }
      })
    });

    // start chat
    this.triggerNextRobotMessage();
  }

  public restartChat() {
    this.myMessages = this.myMessagesReturningUser;
    this.messageCount = 0;
    this.triggerNextRobotMessage();
  }

  public onChatFieldChange(control: FormControl): void {
    if (!this.currentControl) {
      return;
    }
    this.currentControl.setValue(control.value, { onlySelf: false, emitEvent: true });
    control.validator = this.currentControl.validator;
  }

  public onChatLoad(control: FormControl): void {
    control.validator = this.currentControl.validator;
    control.disable();
  }

  private sendMessage(message: Message): void {
    message.setToCurrentDate();
    this.messagesSubject.next(message);
  }

  private triggerNextRobotMessage(message?: Message): void {
    const myMessage: Message = this.myMessages[this.messageCount]?.message;
    const hasMessage: boolean = !!message || !!myMessage;

    if (!hasMessage) {
      return;
    }

    timer(800).subscribe(() => {
      this.typing = true;
      const selectedMessage: Message = message || myMessage;
      this.sendMessageSubject.next({ delay: 1000, message: selectedMessage, typing: true });
    })
  }

  private updateUserDetails(): Sender {
    const name: string = this.contactForm.value.name;
    const email: string = this.contactForm.value.email;

    this.currentUser.name = name;
    this.currentUser.email = email;

    return this.currentUser;
  }

  private saveUserMessage(userMessage: Message): void {
    // createUser
    this.contactService.createUserChatRoom(this.updateUserDetails())
      .subscribe(() => {
        // save message
        var message: Message;
        this.contactService.sendMessagge(this.currentUser.email, userMessage)
          .pipe(finalize(() => {
            // on complete
            this.triggerNextRobotMessage(message);
          }))
          .subscribe((_) => {
            // on success
            message = new Message(this.me, `Thank you ${this.capitalise(this.currentUser.name.split(' ')[0])}, I will get back to you as soon as I can :)`);
          },
            (_) => {
              // on error
              message = new Message(this.me, `Unfortunately, I wasn't able to save your message. Please try again later.`);
            }
          )
      });
  }

  private capitalise(value: string): string {
    return value && value.length > 1
      ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      : null;
  }

  // properties

  public get currentFormControlName(): string {
    return this.myMessages[this.messageCount]?.field || 'text';
  }
  private get currentControl(): FormControl {
    const controlName: string = this.myMessages[this.messageCount]?.field;
    return this.contactForm.get(controlName) as FormControl || null;
  }

  private get isLastMessage(): boolean {
    return this.messageCount == this.myMessages?.length;
  }
}
