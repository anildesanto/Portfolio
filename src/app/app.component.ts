import { AfterViewInit, Component } from '@angular/core';
import { Helper } from './utils/helper';
import { ElementQueries } from 'css-element-queries';
import { PortfolioService } from './services/portfolio.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app'; 
import 'firebase/app-check';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public helper: Helper, public portfolioService: PortfolioService, private recaptchaV3Service: ReCaptchaV3Service) {
    const check = firebase.appCheck(); 
    check.activate(environment.recaptcha.siteKey, true);
    ElementQueries.init();
  }
  public ngAfterViewInit(): void {
      this.portfolioService.getUser().valueChanges().subscribe((userData) => this.portfolioService.user = userData);
  }

}
