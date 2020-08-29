import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Array<Project> = new Array<Project>();

  constructor(private portfolioService: PortfolioService) {
    this.portfolioService.onProjectsValueChange().subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnInit() {
  }

}
