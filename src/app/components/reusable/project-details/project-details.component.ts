import { Component, ChangeDetectorRef } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ActivatedRoute } from '@angular/router';
import { take, map, concatMap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  public project: Project = new Project();

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService,
              private sanitizationService: DomSanitizer) {

    this.route.params.pipe(concatMap((param) => this.portfolioService.getSingleProject(param.id).valueChanges()))
    .subscribe((project) => {

      if (!project) {
        this.portfolioService.handleError();
        return;
      }

      this.project = project;
      this.portfolioService.getProjectsStorageImages(project);

      this.portfolioService.getProjectDemoVideo(project);
    });
  }

  public back(): void {
    this.portfolioService.router.navigate([this.portfolioService.sections[1].segment]);
  }

  public get sanitizeVideodUrl(): SafeResourceUrl { return this.project.videoUrl
    ? this.sanitizationService.bypassSecurityTrustResourceUrl(this.project.videoUrl)
    : null; }
}
