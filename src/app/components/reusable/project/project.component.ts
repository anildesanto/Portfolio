import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project: Project;
  @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('liveText') liveTextRef: ElementRef;
  @ViewChild('ribbon') ribbonRef: ElementRef;
  private liveText: HTMLParagraphElement;
  private ribbon: HTMLDivElement;
  private targetSub: ResizeSensor;
  private ribbonInViewObserver: IntersectionObserver;
  private options: IntersectionObserverInit = {
    root: null,
    rootMargin: '20px',
    threshold: 0.10
  };
  constructor() { }

  public clickImage(): void {
    this.imageClick.emit(this.project.id);
  }

  public ngAfterViewInit():void {
    
    if(this.ribbonRef && this.liveTextRef) {
      this.liveText = this.liveTextRef.nativeElement;
      this.ribbon = this.ribbonRef.nativeElement; 

      // start observing
      this.ribbonInViewObserver = new IntersectionObserver(this.startAnimation.bind(this), this.options);
      this.ribbonInViewObserver.observe(this.ribbon);

      this.targetSub = new ResizeSensor(this.ribbon, _ => {
        this.resizeText();
      });
    }
  }

  public ngOnChanges(): void {
    this.resizeText();
  }

  public ngOnDestroy(): void {
    if(this.targetSub) {
      this.targetSub.detach();
    } 

    if(this.ribbonInViewObserver) {
      this.ribbonInViewObserver.disconnect();
    }
  }

  private resizeText(): void {
    if(this.ribbon && this.liveText) {
      const newFontSize = this.ribbon.getBoundingClientRect().height / 8;
      this.liveText.style.fontSize = `${newFontSize}px`;
    }
  }
 
  private startAnimation(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(_ => {
      const animation: Animation = this.ribbon.getAnimations()[0];
      if(animation) {
        animation.play();
      }
    });
  }
}
