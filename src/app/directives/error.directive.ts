import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { AbstractControlDirective, NgControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective implements OnInit {
  @Input('appError') errorMessageObj;
  @Input() errorClassName = 'error-text';

  private abstractControl: AbstractControl;
  private errorMessageContainer: HTMLDivElement;


  constructor(private elementRef: ElementRef, private ngControl: NgControl) {}

  ngOnInit() {
    this.abstractControl = this.ngControl.control;
    this.createErrorMessageContainer();
    this.abstractControl.statusChanges.subscribe((value) => {
      this.errorMessageContainer.innerText = this.getErrorMessage();
      console.log(this.getErrorMessage());
    });
  }

  createErrorMessageContainer() {
    this.errorMessageContainer = document.createElement('DIV') as HTMLDivElement;
    this.errorMessageContainer.classList.add(this.errorClassName);
    (this.elementRef.nativeElement as HTMLElement).after(this.errorMessageContainer);
    this.errorMessageContainer.innerText = this.getErrorMessage();
  }

  getErrorMessage(): string {
    let message = 'No errors found';
    const errors: ValidationErrors = this.abstractControl.errors;
    if (errors) {
      const chosenKey = Object.keys(errors)[0];
      message = this.errorMessageObj[chosenKey] || `Message Not provided for error of type: ${chosenKey}`;
    }

    return message;
  }

}
