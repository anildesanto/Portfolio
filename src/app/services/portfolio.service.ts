import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { Artwork } from '../models/artwork';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Audio } from '../models/audio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // TODO - Add session management
  constructor(private fireStore: AngularFirestore, private storage: AngularFireStorage, public router: Router) {
  }

  public user: User;

  public sections: Array<Section> = [
    {index: null, element: null, selected: false, title: 'About',
      segment: '/info/about', width: '50%', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Projects',
      segment: '/info/projects', width: '65%', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Artworks',
      segment: '/info/artworks', width: '60%', padding: '8px'},
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
    return this.storage.storage.ref('Projects').child(project.id).child('images').listAll().then( val => {
      project.images = Array<string>();
      val.items.forEach((element: firebase.storage.Reference) => {
        element.getDownloadURL().then((imageUrl) => {
          project.images[project.images.length] = imageUrl;
        });
      });
    }, () => {});
  }

  public getProjectDisplayImage(project: Project): any {
    return this.storage.ref(`Projects/${project.id}/${project.id}_display_image.png`).getDownloadURL().subscribe((imageUrl) => {
      project.displayImage = imageUrl;
    }, () => {});
  }

  public getProjectDemoVideo(project: Project): any {
    return this.storage.ref(`Projects/${project.id}/${project.id}_demo_video.mp4`).getDownloadURL().subscribe((videoUrl) => {
      project.videoUrl = videoUrl;
    }, () => {});
  }

  // handle error
  // TODO == add service error page
  public handleError(serviceError: boolean = false) {
    if(serviceError) {
      //this.router.navigate(['/service-error']);
    } else {
      this.router.navigate(['/error']);
    }
  }
}
