import { ChangeDetectorRef, Component } from '@angular/core';
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
  constructor(public helper: Helper, public portfolioService: PortfolioService) {
    ElementQueries.init();
    this.portfolioService.getUser().valueChanges().subscribe((userData) => this.portfolioService.user = userData);
  }


}
