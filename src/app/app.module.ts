import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/reusable/header/header.component';
import { Helper } from './utils/helper';
import { MaterialModule } from './modules/material-module';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/pages/about/about.component';
import { OncreateDirective } from './directives/oncreate.directive';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ArtworksComponent } from './components/pages/artworks/artworks.component';
import { ContactComponent } from './components/pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    OncreateDirective,
    ProjectsComponent,
    ArtworksComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [Helper],
  bootstrap: [AppComponent]
})
export class AppModule { }
