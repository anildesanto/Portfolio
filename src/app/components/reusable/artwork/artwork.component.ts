import { Component, OnInit, Input } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {
  @Input() artwork: Artwork;
  constructor() { }

  ngOnInit() {
  }

}
