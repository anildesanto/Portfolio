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
    {index: null, element: null, selected: false, title: 'About',  segment: '/info/about', width: '40%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Projects',  segment: '/info/projects', width: '65%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Artworks',  segment: '/info/artworks', width: '50%', height: '650px'},
    {index: null, element: null, selected: false, title: 'Contact',  segment: '/info/contact', width: '50%', height: '650px'},
  ];

  public getUser(): AngularFirestoreDocument<User> {
    return this.fireStore.collection('users').doc('me');
  }

  public onUserValueChange(): Observable<User> {
    return this.getUser().valueChanges();
  }

  public getProjects(): AngularFirestoreCollection<Array<Project>> {
    return this.getUser().collection('projects');
  }

  public onProjectsValueChange(): Observable<Project[][]> {
    return this.getProjects().valueChanges();
  }

  public geArtworks(): AngularFirestoreCollection<Array<Artwork>> {
    return this.getUser().collection('artworks');
  }

  public onArtworksValueChange(): Observable<Artwork[][]> {
    return this.geArtworks().valueChanges();
  }
}
