import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private formBuilder: FormBuilder) { }
  // TODO -- add mail API
  // TODO -- add recaptcha
  public contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    text: ['', Validators.required],
  });

  public errorMessages = {
    name: {
      required: 'Please enter your name',
      pattern: 'Please enter a valid name'
    },
    email: {
      required: 'Please enter your email',
      email: 'Please enter a valid email'
    },
    subject: {
      required: 'Please enter the subject',
      pattern: 'Please enter a valid subject'
    },
    text: {
      required: 'Please enter your message',
      pattern: 'Please enter a valid message'
    }
  };

  sendMessage() {
    this.contactForm.markAllAsTouched();
  }
}
