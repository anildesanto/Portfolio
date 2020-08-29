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
  private imageCount = 0;

  private mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation);
    });
  });
  constructor(private portfolioService: PortfolioService, private detectChangesRef: ChangeDetectorRef) {
    this.portfolioService.onArtworksValueChange().subscribe((artworks) => {
      this.artworks = artworks;
      this.selectedArtwork = artworks.length > 0 ? artworks[0] : null;
      this.detectChangesRef.detectChanges();
    });
  }

  public ngAfterViewInit(): void {
    this.detectChangesRef.detectChanges();
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
    console.log(this.width, this.computedWidth, this.artContainer.scrollWidth, this.isEnd);
  }

  public get artContainer(): HTMLElement { return this.artContainerRef ? this.artContainerRef.nativeElement : null; }
  private get width(): number { return this.artContainer ? this.artContainer.clientWidth : 0; }
  private get computedWidth(): number { return this.artContainer ? this.width * this.imageCount : 0; }
  public get isStart(): boolean { return this.computedWidth === 0; }
  public get isEnd(): boolean { return this.artContainer ? this.computedWidth === this.width * (this.artworks.length - 1) : true; }
}
