import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnDestroy {
  @ViewChild('aboutMe') set aboutMeRef(elementRef: ElementRef) {
    if(elementRef) {
      this.portfolioService.getSingleAudio('keyboard').valueChanges().subscribe((audio) => {
        this.audio = new Audio(audio.url);
        this.audio.autoplay = true;
        this.audio.volume = 0.2;
        this.onWindowBlurSub = fromEvent(window, 'blur').subscribe(_ => {
          this.stopTyping(true);
        });

        this.onWindowFocusSub = fromEvent(window, 'focus').subscribe(_ => {
          this.startTyping(elementRef.nativeElement.firstChild, false, this.TYPING_SPEED.start);
        })
        
        this.startTyping(elementRef.nativeElement.firstChild, false, this.TYPING_SPEED.start);
      });

    }
  }
  private letterCount: number = 0;
  private audio: HTMLAudioElement;
  private typing: Subject<number> = new Subject;
  private typingSub: Subscription;
  private onWindowBlurSub: Subscription;
  private onWindowFocusSub: Subscription;
  private readonly TYPING_SPEED = {
    '.' : 800,
    '-' : 600,
    ',' : 300,
    start: 100,
    default: 32
  }

  constructor(public portfolioService: PortfolioService) {}

  public ngOnDestroy(): void {
    this.stopTyping(true);
    this.stopWindowFocusTracking();
  }

  private typewriter(element: HTMLParagraphElement, text: string): void {
    if (element && text && this.letterCount < text.length) {
      const letterToAdd: string = text.charAt(this.letterCount);
      element.innerHTML += letterToAdd; 

      this.audio.play().catch(()=> {}); 

      this.letterCount++;
      
      this.startTyping(element, !!this.TYPING_SPEED[letterToAdd], this.TYPING_SPEED[letterToAdd]);
    } else {
      this.stopTyping(true);
      this.stopWindowFocusTracking();
    }
  }

  private startTyping(element: HTMLParagraphElement, stopAudio: boolean, speed: number = this.TYPING_SPEED.default): void {
    this.stopTyping(stopAudio);
    this.typingSub = this.typing.pipe(debounceTime(speed)).subscribe(() => {
      if(this.portfolioService.user) {
        this.typewriter(element, this.portfolioService.user.profileText);
      }
     });
     this.typing.next();
  }

  private stopTyping(stopAudio: boolean): void {
    if(this.typingSub != null) {
      this.typingSub.unsubscribe();
      
      if(this.audio && stopAudio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.remove();
      }
    }
  }

  private stopWindowFocusTracking(): void {
    if(this.onWindowBlurSub) {
      this.onWindowBlurSub.unsubscribe()
    }

    if(this.onWindowFocusSub) {
      this.onWindowFocusSub.unsubscribe();
    }

  }
}
