import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/reusable/header/header.component';
import { Helper } from './utils/helper';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/pages/about/about.component';
import { OncreateDirective } from './directives/oncreate.directive';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ArtworksComponent } from './components/pages/artworks/artworks.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProjectComponent } from './components/reusable/project/project.component';
import { ArtworkComponent } from './components/reusable/artwork/artwork.component';
import { MainComponent } from './components/reusable/main/main.component';
import { ProjectDetailsComponent } from './components/reusable/project-details/project-details.component';
import { SelectionIndicatorComponent } from './components/reusable/selection-indicator/selection-indicator.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ErrorDirective } from './directives/error.directive';
import { ErrorComponent } from './components/pages/error/error.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { EmailService } from './services/email/email.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    OncreateDirective,
    ProjectsComponent,
    ArtworksComponent,
    ContactComponent,
    ProjectComponent,
    ArtworkComponent,
    MainComponent,
    ProjectDetailsComponent,
    SelectionIndicatorComponent,
    ErrorDirective,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RecaptchaV3Module,
    HttpClientModule
  ],
  providers: [
    Helper,
    EmailService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
