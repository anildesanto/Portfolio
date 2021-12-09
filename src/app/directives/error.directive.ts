import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective implements OnInit, OnChanges {
  @Input('appError') errorMessageObj: Object;
  @Input() errorClassName: string = 'error-text';

  private abstractControl: AbstractControl;
  private errorMessageContainer: HTMLDivElement;

  private initialErrorMessageObject: Object;


  constructor(private elementRef: ElementRef, private ngControl: NgControl) { }

  public ngOnInit(): void {
    this.initialErrorMessageObject = this.errorMessageObj;
    this.abstractControl = this.ngControl.control;
    this.createErrorMessageContainer();
    this.abstractControl.statusChanges.subscribe((value) => {
      this.setErrorMessage();
    });
  }

  public ngOnChanges(_: SimpleChanges): void {
    if (!this.isSameMessageObject(this.errorMessageObj)) {
      this.initialErrorMessageObject = this.errorMessageObj;
      this.setErrorMessage();
    }
  }

  private createErrorMessageContainer(): void {
    this.errorMessageContainer = document.createElement('DIV') as HTMLDivElement;
    this.errorMessageContainer.classList.add(this.errorClassName);
    (this.elementRef.nativeElement as HTMLElement).after(this.errorMessageContainer);
    this.setErrorMessage();
  }

  private getErrorMessage(): string {
    let message = 'No errors found';
    const errors: ValidationErrors = this.abstractControl.errors;
    if (errors) {
      const chosenKey = Object.keys(errors)[0];
      message = this.errorMessageObj?.[chosenKey] || `Message Not provided for error of type: ${chosenKey}`;
    }

    return message;
  }

  private setErrorMessage(): void {
    if (this.errorMessageContainer) {
      this.errorMessageContainer.innerText = this.getErrorMessage();
    }
  }

  private isSameMessageObject(messageObject: Object) {
    return messageObject ? JSON.stringify(messageObject) === JSON.stringify(this.initialErrorMessageObject) : false
  }

}
