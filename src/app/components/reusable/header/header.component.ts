import { Component, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router} from '@angular/router';
import { Section } from 'src/app/models/section';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectionIndicatorComponent } from '../selection-indicator/selection-indicator.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('indicator', {static: false}) indicator: SelectionIndicatorComponent;
  @Input() sections: Array<Section> =  new Array<Section>();
  @Output() selectionChange: EventEmitter<Section> = new EventEmitter<Section>();

  private subscriptions: Subscription = new Subscription();


  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSectionLoad(section: Section, index: number, element: ElementRef): void {
    section.index = index;
    section.element = element.nativeElement;

    if (section.segment === this.router.url) {
      this.updateSelected(section);
    }
  }

  public onSectionSelect(section: Section): void {
    this.updateSelected(section);
    if (this.router.url !== section.segment) {
      this.router.navigate([section.segment]);
    }
  }

  private updateSelected(selectedSection: Section): void {
    if (!selectedSection) {
      return;
    }

    for (const index in this.sections) {
      if (Object.prototype.hasOwnProperty.call(this.sections, index)) {
        const section = this.sections[index];
        section.selected = section === selectedSection;
      }
    }

    this.changeDetectorRef.detectChanges();

    this.selectionChange.emit(selectedSection);
  }

  public get currentSection(): Section {
    const foundSection: Section = this.sections.find(sect => sect.selected);
    return foundSection || this.sections[0];
  }
  public get currentSectionElement(): HTMLElement { return this.currentSection ? this.currentSection.element : null; }
}
