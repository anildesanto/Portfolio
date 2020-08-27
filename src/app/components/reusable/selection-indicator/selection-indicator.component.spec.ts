import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionIndicatorComponent } from './selection-indicator.component';

describe('SelectionIndicatorComponent', () => {
  let component: SelectionIndicatorComponent;
  let fixture: ComponentFixture<SelectionIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
