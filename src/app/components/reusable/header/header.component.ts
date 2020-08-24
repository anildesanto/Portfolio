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
    {index: null, element: null, selected: false, title: 'About',  segment: '/info/about', width: '40%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Projects',  segment: '/info/projects', width: '65%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Artworks',  segment: '/info/artworks', width: '50%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Contact',  segment: '/info/contact', width: '50%', height: '650px'},
  ];

  constructor(private router: Router) { }

  public ngOnInit(): void {
    const windowSub = fromEvent(window, this.resizeEvent).subscribe(this.onResize);

    const routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
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

    document.getElementById('content').scrollTop = 0;

    if (window.innerWidth > 1024) {
      document.getElementById('container').style.width = this.currentSection.width;
      document.getElementById('content').style.height = this.currentSection.height;
    } else {
      document.getElementById('container').style.width = '95%';

      if (window.innerWidth < 481) {
        document.getElementById('content').style.height = '100%';
      }
    }

    setTimeout(() => {
      const sectionWidth = this.currentSection.element.getBoundingClientRect().width;
      const indicatorPosition = this.currentSection.index * sectionWidth;
      const indicator: HTMLElement = this.indicatorRef.nativeElement;
      indicator.style.width =  `${sectionWidth}${this.pixelsSuffix}`;
      indicator.style.left =  `${indicatorPosition}${this.pixelsSuffix}`;
    }, 500);

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
