import { Directive, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOncreate]'
})
export class OncreateDirective implements OnInit {
  @Output() creation: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.creation.emit(this.element);
  }
}
