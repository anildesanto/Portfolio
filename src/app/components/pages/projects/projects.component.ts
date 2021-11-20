import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects: Array<Project> = new Array<Project>();

  // TODO -- Keep navigation arrow at the top when scrolling
  constructor(private router: Router, private portfolioService: PortfolioService) {
    this.portfolioService.getProjects().valueChanges().subscribe((projects) => {
      this.projects = projects;
      this.projects.forEach(val => {
        this.portfolioService.getProjectDisplayImage(val);
      });
    });
  }

  public navigate(projectId: string) {
    this.router.navigate([`project-details/${projectId}`]);
  }
}
