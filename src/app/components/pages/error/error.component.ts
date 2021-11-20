import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/models/section';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public sections: Array<Section>;
  
  constructor(private portfolioService: PortfolioService) {
    this.sections = portfolioService.sections;
  }
 
  ngOnInit() {
  }

}
