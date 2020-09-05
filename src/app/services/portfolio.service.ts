import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Project } from '../models/project';
import { Artwork } from '../models/artwork';
import { FirebaseStorage } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private fireStore: AngularFirestore) {
  }

  public sections: Array<Section> = [
    {index: null, element: null, selected: false, title: 'About',
      segment: '/info/about', width: '50%', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Projects',
      segment: '/info/projects', width: '65%', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Artworks',
      segment: '/info/artworks', width: '60%', padding: '8px'},

    {index: null, element: null, selected: false, title: 'Contact',
      segment: '/info/contact', width: '50%', padding: '32px'},
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
}
