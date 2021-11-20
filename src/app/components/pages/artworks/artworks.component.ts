import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements AfterViewInit {
  @ViewChild('artcontainer', {static: false}) artContainerRef: ElementRef;

  public selectedArtwork: Artwork;
  public artworks: Array<Artwork> = new Array<Artwork>();
  public colouredArtworks: Array<Artwork> = new Array<Artwork>();
  public grayScaleArtworks: Array<Artwork> = new Array<Artwork>();
  private imageCount = 0;
  public lightsOn = false;

  constructor(private portfolioService: PortfolioService, private detectChangesRef: ChangeDetectorRef) {
    this.portfolioService.geArtworks().valueChanges().subscribe((artworks) => {
      this.artworks = artworks.filter((artwork) => !artwork.hide);
      this.selectedArtwork =  this.artworks.length > 0 ? this.artworks[0] : null;
      this.detectChangesRef.detectChanges();
    });
  }

  public ngAfterViewInit(): void {
    this.detectChangesRef.detectChanges();
  }

  public getFilteredByColour(array: Array<Artwork>, isColoured: boolean): Array<Artwork> {
    const filteredArtworks: Array<Artwork> = new Array<Artwork>();
    for (const index in array) {
      if (Object.prototype.hasOwnProperty.call(array, index)) {
        const art = array[index];
        if (art.coloured === isColoured) {
          filteredArtworks[filteredArtworks.length] = art;
        }
      }
    }

    return filteredArtworks;
  }

  // REVIEWME - check light integration and if it's still necessary
  public toggleLight(choice: boolean = null): void {
    this.lightsOn = choice != null ? choice : !this.lightsOn;
    // this.artworks = this.lightsOn ? this.colouredArtworks : this.grayScaleArtworks;
    // this.selectedArtwork = this.artworks.length > 0 ? this.artworks[0] : null;
    // this.imageCount = 0;
    // this.artContainer.style.right = `0px`;
    
    // fade then switch
  }

  public move(right: boolean) {
    if (right) {
      this.imageCount ++;
      this.artContainer.style.right = `${this.width * this.imageCount}px`;
    } else if (!right) {
      this.imageCount --;
      this.artContainer.style.right = `${this.width * this.imageCount}px`;
    }
    this.selectedArtwork = this.artworks[this.imageCount];
  }

  public get artContainer(): HTMLElement { return this.artContainerRef ? this.artContainerRef.nativeElement : null; }
  private get width(): number { return this.artContainer ? this.artContainer.clientWidth : 0; }
  private get computedWidth(): number { return this.artContainer ? this.width * this.imageCount : 0; }
  public get isStart(): boolean { return this.computedWidth === 0; }
  public get isEnd(): boolean { return this.artContainer ? this.computedWidth === this.width * (this.artworks.length - 1) : true; }
}
