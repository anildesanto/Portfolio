import { Directive, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOncreate]'
})
export class OncreateDirective implements OnInit {
  @Output() onCreate: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.onCreate.emit(this.element);
  }
}
