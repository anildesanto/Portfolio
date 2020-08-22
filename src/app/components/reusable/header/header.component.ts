import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Helper } from 'src/app/utils/helper';
import { Router, Routes, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Section } from 'src/app/models/section';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('indicator', {static: false}) indicatorRef: ElementRef;

  private pixelsSuffix = 'px';
  private resizeEvent = 'resize';
  private currentSection: Section = null;

  private subscriptions: Subscription = new Subscription();

  public sections: Array<Section> = [
    {index: null, element: null, selected: false, title: 'About',  segment: '/about'},
    {index: null, element: null, selected: false, title: 'Projects',  segment: '/projects'},
    {index: null, element: null, selected: false, title: 'Artworks',  segment: '/artworks'},
    {index: null, element: null, selected: false, title: 'Contact',  segment: '/contact'},
  ];

  constructor(private router: Router) { }

  public ngOnInit(): void {
    const windowSub = fromEvent(window, this.resizeEvent).subscribe(this.onResize);

    const routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const foundSection: Section = this.sections.find(sect => sect.segment === event.url);
        this.currentSection = foundSection || this.sections[0];

        this.updateSelected();
        this.moveIndicator();
      }
    }) ;

    this.subscriptions.add(windowSub);
    this.subscriptions.add(routerSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSectionLoad(section: Section, index: number, element: ElementRef): void {
    section.index = index;
    section.element = element.nativeElement;
  }

  public onSectionSelect(section: Section): void {
    this.router.navigate([section.segment]);
  }

  private onResize = (): void => {
    this.moveIndicator();
  }

  private moveIndicator(): void {
    if (this.currentSection == null) {
      return;
    }

    const sectionWidth = this.currentSection.element.getBoundingClientRect().width;
    const indicatorPosition = this.currentSection.index * sectionWidth;
    const indicator: HTMLElement = this.indicatorRef.nativeElement;
    indicator.style.width =  `${sectionWidth}${this.pixelsSuffix}`;
    indicator.style.left =  `${indicatorPosition}${this.pixelsSuffix}`;
  }

  private updateSelected(): void {
    if (this.currentSection == null) {
      return;
    }

    for (const index in this.sections) {
      if (Object.prototype.hasOwnProperty.call(this.sections, index)) {
        const section = this.sections[index];
        section.selected = section === this.currentSection;
      }
    }
  }
}
