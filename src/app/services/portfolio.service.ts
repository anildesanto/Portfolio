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
      segment: '/info/about', width: '40%', height: '650px', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Projects',
      segment: '/info/projects', width: '65%', height: '650px', padding: '32px'},

    {index: null, element: null, selected: false, title: 'Artworks',
      segment: '/info/artworks', width: '60%', height: '650px', padding: '8px'},

    {index: null, element: null, selected: false, title: 'Contact',
      segment: '/info/contact', width: '40%', height: '650px', padding: '32px'},
  ];

  public getUser(): AngularFirestoreDocument<User> {
    return this.fireStore.collection('users').doc('me');
  }

  public onUserValueChange(): Observable<User> {
    return this.getUser().valueChanges();
  }

  public getProjects(): AngularFirestoreCollection<Project> {
    return this.getUser().collection('projects');
  }

  public onProjectsValueChange(): Observable<Array<Project>> {
    return this.getProjects().valueChanges();
  }

  public geArtworks(): AngularFirestoreCollection<Artwork> {
    return this.getUser().collection('artworks');
  }

  public onArtworksValueChange(): Observable<Array<Artwork>> {
    return this.geArtworks().valueChanges();
  }
}
