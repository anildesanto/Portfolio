import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'app-selection-indicator',
  templateUrl: './selection-indicator.component.html',
  styleUrls: ['./selection-indicator.component.scss']
})
export class SelectionIndicatorComponent implements AfterViewInit, OnDestroy {

  @Input() target: HTMLElement;
  @ViewChild('indicator', {static: false}) indicatorRef: ElementRef;
  private targetSub: ResizeSensor;
  private pixelsSuffix = 'px';

// FIXME -- Check move to position calculation
  public ngAfterViewInit(): void {
    this.targetSub = new ResizeSensor(this.target, _ => {
      this.moveAnResize();
    });
  }

  public ngOnDestroy(): void {
    if(this.targetSub) {
      this.targetSub.detach();
    } 
  }

  private moveAnResize(): void {
    if (!this.target || !this.element) {
      return;
    }

    this.element.style.width = `${this.target.getBoundingClientRect().width}${this.pixelsSuffix}`;

    this.element.style.right = `0${this.pixelsSuffix}`;
    this.element.style.left = `${this.target.offsetLeft}${this.pixelsSuffix}`;
  }

  public get element(): HTMLElement { return this.indicatorRef ? this.indicatorRef.nativeElement : null; }
}
