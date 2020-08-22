import { Component } from '@angular/core';
import { Helper } from './utils/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public helper: Helper) {

  }
}
