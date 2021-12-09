import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, timer } from 'rxjs';
import { Message } from 'src/app/models/contact/message';
import { Sender } from 'src/app/models/contact/sender';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

  @Input() errorMessages: Object;
  @Input() sendButtonEnabled: boolean;
  @Input() typing: boolean;
  @Input() currentUser: Sender;
  @Input() chatBoxHeight: number = 50;
  @Input() messagesSubject: Subject<Message> = new Subject();
  @Output() send: EventEmitter<FormControl> = new EventEmitter();
  @Output() load: EventEmitter<FormControl> = new EventEmitter();
  @Output() change: EventEmitter<FormControl> = new EventEmitter();
  @ViewChild('chat') chatRef: ElementRef;
  @ViewChild('chatInput') chatInputRef: ElementRef;

  private readonly FORM_CONTROL_TEXT = 'text';
  private readonly SCROLL_BEHAVIOUR = 'smooth';
  private readonly SCROLL_BLOCK = 'center';
  private readonly FIRST_SUB_DELAY = 300;
  private readonly SECOND_SUB_DELAY = 10;
  private readonly THIRD_SUB_DELAY = 800;
  private subscriptions: Subscription = new Subscription();

  public messages: Message[] = [];
  public chatForm: FormGroup = this.formBuilder.group({
    text: ['', Validators.required],
  });
  public currentChatBoxHeight: number = this.chatBoxHeight;

  // lifecycle
  public ngOnInit(): void {
    this.load.emit(this.textControl);
  }

  public ngAfterViewInit(): void {
    this.currentChatBoxHeight = this.chatBoxHeight;
    this.changeDetectorRef.detectChanges();

    const messageSub = this.initialiseMessageSubject();

    const textControlSub = this.textControl.valueChanges.subscribe((value) => {
      this.change.emit(this.textControl);
    });

    this.subscriptions.add(messageSub);
    this.subscriptions.add(textControlSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // =========
  public sendMessage(): void {
    this.send.emit(this.textControl);
  }

  public isSameUser(message: Message, currentIndex: number): boolean {
    return message.sender.isSameUser(this.messages[currentIndex - 1]?.sender);
  }

  public isCurrentUser(message: Message): boolean {
    return message.sender.isSameUser(this.currentUser);
  }

  private initialiseMessageSubject(): Subscription {
    return this.messagesSubject.subscribe((message) => {
      const firstTimerSub = timer(this.FIRST_SUB_DELAY)
        .subscribe(() => {
          this.messages.push(message);

          const secondTimerSub = timer(this.SECOND_SUB_DELAY)
            .subscribe(() => {
              const chat: HTMLElement = this.chatRef.nativeElement;
              (chat.lastChild as HTMLElement).scrollIntoView({ behavior: this.SCROLL_BEHAVIOUR, block: this.SCROLL_BLOCK, });

              const thirdTimerSub = timer(this.THIRD_SUB_DELAY)
                .subscribe(() => {
                  this.currentChatBoxHeight = this.chatBoxHeight;
                  this.textControl.enable();
                  this.sendButtonEnabled = true;
                });

              this.subscriptions.add(thirdTimerSub);
            });

          this.subscriptions.add(secondTimerSub);
        });

      this.subscriptions.add(firstTimerSub);
    });
  }

  private get textControl(): FormControl {
    return this.chatForm?.get(this.FORM_CONTROL_TEXT) as FormControl;
  }

}
