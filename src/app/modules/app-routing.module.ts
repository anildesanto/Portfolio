import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/pages/about/about.component';
import { ArtworksComponent } from '../components/pages/artworks/artworks.component';
import { ContactComponent } from '../components/pages/contact/contact.component';
import { ErrorComponent } from '../components/pages/error/error.component';
import { ProjectsComponent } from '../components/pages/projects/projects.component';
import { MainComponent } from '../components/reusable/main/main.component';
import { ProjectDetailsComponent } from '../components/reusable/project-details/project-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'info/about',
    pathMatch: 'full'
  },
  
  {
    path: 'info',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
      path: 'about',
      component: AboutComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'artworks',
        component: ArtworksComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ]
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
