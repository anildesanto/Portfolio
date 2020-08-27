import { Component } from '@angular/core';
import { Helper } from './utils/helper';
import { ElementQueries } from 'css-element-queries';
import { User } from './models/user';
import { PortfolioService } from './services/portfolio.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User;

  constructor(public helper: Helper, private portfolioService: PortfolioService) {
    ElementQueries.init();
    this.portfolioService.onUserValueChange().subscribe((userData) => this.user = userData);
  }


}
