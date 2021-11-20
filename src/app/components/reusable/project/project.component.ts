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
  @ViewChild('personalBadge', {static: false}) personalBadgeRef: ElementRef;
  @ViewChild('ribbon', {static: false}) ribbonRef: ElementRef;
  private personalBadge: HTMLParagraphElement;
  private ribbon: HTMLDivElement;
  private targetSub: ResizeSensor;
  constructor() { }

  public clickImage(): void {
    this.imageClick.emit(this.project.id);
  }

  public ngAfterViewInit():void {
    if(this.ribbonRef && this.personalBadgeRef) {
      this.personalBadge = this.personalBadgeRef.nativeElement;
      this.ribbon = this.ribbonRef.nativeElement; 

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
  }

  public resizeText(): void {
    if(this.ribbon && this.personalBadge) {
      const newFontSize = this.ribbon.getBoundingClientRect().height / 8;
      this.personalBadge.style.fontSize = `${newFontSize}px`;
    }
  }
 
}
