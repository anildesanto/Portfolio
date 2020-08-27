import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HeaderComponent } from '../header/header.component';
import { Section } from 'src/app/models/section';
import { distinctUntilChanged, filter, pairwise, debounceTime } from 'rxjs/operators';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy{
  @ViewChild('content', {static: false}) contentRef: ElementRef;
  @ViewChild('container', {static: false}) containerRef: ElementRef;
  @ViewChild('header', {static: false}) header: HeaderComponent;

  private containerSub: ResizeSensor;

  private maxStyleWidth = '100%';
  private maxWindowWidth = 1024;
  private scrollTop = 0;


  constructor(private portfolioService: PortfolioService) {
  }

  public ngAfterViewInit(): void {
    this.onSelectionChange(this.header.currentSection);
    this.containerSub = new ResizeSensor(this.container, _ => {
      this.resize(this.header.currentSection);
    });
  }

  public ngOnDestroy(): void {
    this.containerSub.detach();
  }

  public onSelectionChange(section: Section): void {
    if (!section || !this.containerRef || !this.contentRef) {
      return;
    }

    this.content.scrollTop = this.scrollTop;

    this.resize(section);
  }

  public resize(section: Section): void {
    if (!section || this.shouldNotResize(section)) {
      return;
    }

    if (window.innerWidth > this.maxWindowWidth) {
      this.container.style.width = section.width;
      this.content.style.height = section.height;
    } else {
      this.container.style.width = this.maxStyleWidth;
    }
  }

  private shouldNotResize(section: Section): boolean {
    const screenIsGreaterAndSizeMatch = window.innerWidth > this.maxWindowWidth
    && this.container.style.width === section.width
    && this.content.style.height === section.height;

    const screenIsSmallerAndSizeMatch = window.innerWidth <= this.maxWindowWidth
    && this.container.style.width === this.maxStyleWidth;

    return  screenIsGreaterAndSizeMatch || screenIsSmallerAndSizeMatch;
  }

  public get sections(): Array<Section> { return this.portfolioService.sections; }
  private get container(): HTMLDivElement { return this.containerRef ?  this.containerRef.nativeElement : null; }
  private get content(): HTMLDivElement { return this.contentRef ? this.contentRef.nativeElement : null; }
}
