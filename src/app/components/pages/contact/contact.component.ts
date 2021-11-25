import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private formBuilder: FormBuilder, private emailService: EmailService) { }
  // TODO -- add mail API
  // TODO -- add recaptcha
  public formSubmissionMessage = '';
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
    if(this.contactForm.valid) {
      this.formSubmissionMessage = 'Processing your email, please wait...'
      this.emailService.sendEmail({message: this.contactForm.value}).subscribe((val) => {
        // on success
        console.log(val);
        this.formSubmissionMessage = 'Message sent sucessfully!'
      }, (err) => 
      {
        console.log('failed', err);
        // on error
        this.formSubmissionMessage = 'An error has occured, please try again later.'
      })
    }
    else {
      this.formSubmissionMessage = '';
      this.contactForm.markAllAsTouched();
    }
  }
}
