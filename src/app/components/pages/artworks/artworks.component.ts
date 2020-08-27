import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
  public artworks: Artwork[][];
  constructor(private portfolioService: PortfolioService) {
    this.portfolioService.onArtworksValueChange().subscribe((artworks) => {
      console.log('pr', artworks);
      this.artworks = artworks;
    });
  }

  ngOnInit() {
  }

}
