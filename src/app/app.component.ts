import { Component } from '@angular/core';
import { Helper } from './utils/helper';
import { ElementQueries } from 'css-element-queries';
import { PortfolioService } from './services/portfolio.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public helper: Helper, public portfolioService: PortfolioService, private recaptchaV3Service: ReCaptchaV3Service) {
    ElementQueries.init();
    this.portfolioService.getUser().valueChanges().subscribe((userData) => this.portfolioService.user = userData);
  }
}
