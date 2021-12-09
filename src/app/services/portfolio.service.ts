import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artwork } from '../models/artwork';
import { Audio } from '../models/audio';
import { Project } from '../models/project';
import { Section } from '../models/section';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // TODO - Add session management
  constructor(private fireStore: AngularFirestore, private storage: AngularFireStorage,
    public router: Router, private firebaseAuth: AngularFireAuth) {
    this.signInAnonymously();
  }

  private firebaseUser: firebase.default.User;
  public user: User;


  public sections: Array<Section> = [
    {
      index: null, element: null, selected: false, title: 'About',
      segment: '/info/about', width: '50%', padding: '32px'
    },

    {
      index: null, element: null, selected: false, title: 'Projects',
      segment: '/info/projects', width: '65%', padding: '32px'
    },

    {
      index: null, element: null, selected: false, title: 'Artworks',
      segment: '/info/artworks', width: '60%', padding: '8px'
    },

    {
      index: null, element: null, selected: false, title: 'Contact',
      segment: '/info/contact', width: '30%', padding: '32px'
    },
  ];

  public getUser(): AngularFirestoreDocument<User> {
    return this.fireStore.collection('users').doc('me');
  }

  public getProjects(): AngularFirestoreCollection<Project> {
    return this.getUser().collection('projects', ref => ref.orderBy('year', 'desc'));
  }

  public getSingleProject(projectId: string): AngularFirestoreDocument<Project> {
    return this.getProjects().doc(projectId);
  }

  public geArtworks(): AngularFirestoreCollection<Artwork> {
    return this.getUser().collection('artworks');
  }

  public getAudios(): AngularFirestoreCollection<Audio> {
    return this.getUser().collection('audio');
  }

  public getSingleAudio(audioId: string): AngularFirestoreDocument<Audio> {
    return this.getAudios().doc(audioId);
  }

  // storage queries

  public getProjectsStorageImages(project: Project): any {
    return this.storage.storage.ref('Projects').child(project.id).child('images').listAll().then(val => {
      project.images = Array<string>();
      val.items.forEach((element: firebase.default.storage.Reference) => {
        element.getDownloadURL().then((imageUrl) => {
          project.images[project.images.length] = imageUrl;
        });
      });
    }, () => { });
  }

  public getProjectDisplayImage(project: Project): any {
    return this.storage.ref(`Projects/${project.id}/${project.id}_display_image.png`).getDownloadURL().subscribe((imageUrl) => {
      project.displayImage = imageUrl;
    }, () => { });
  }

  public getProjectDemoVideo(project: Project): any {
    return this.storage.ref(`Projects/${project.id}/${project.id}_demo_video.mp4`).getDownloadURL().subscribe((videoUrl) => {
      project.videoUrl = videoUrl;
    }, () => { });
  }

  public getArtworkImage(artwork: Artwork): Observable<any> {
    return this.storage.ref(`Artwork/${artwork.id}.jpg`).getDownloadURL();
  }

  // handle error
  // TODO == add service error page
  public handleError(serviceError: boolean = false) {
    if (serviceError) {
      //this.router.navigate(['/service-error']);
    } else {
      this.router.navigate(['/error']);
    }
  }

  private signInAnonymously(): void {
    this.firebaseAuth.authState.subscribe((user) => {
      this.firebaseUser = user;
      if (!user) {
        this.firebaseAuth.signInAnonymously()
          .then((authState) => {
            this.firebaseUser = authState.user;
          })
      }
    })
  }
}
