import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenMediaComponent } from '../fullscreen-media/fullscreen-media.component';
import { UploadService } from '../../services/upload.service';
import { from, mergeMap, toArray } from 'rxjs';
import { sortArray } from '../../utils/functions-utils';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-slide-property-details',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-property-details.component.html',
  styleUrl: './slide-property-details.component.scss'
})
export class SlidePropertyDetailsComponent implements OnInit {

  @Input()property: any;

  dialog = inject(MatDialog);
  platformId = inject(PLATFORM_ID);

  pageWidth: number = 768;

  loading = {
    property: false,
    images: false
  };

  images: any = [];

  constructor(){
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if(isPlatformBrowser(this.platformId)){
      this.pageWidth = window.innerWidth;
    }

  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.pageWidth = window.innerWidth;
      console.log(this.pageWidth)
    }
  }

  openMedia(index: number){
    this.dialog.open(FullscreenMediaComponent, {
      height: '100dvh',
      minWidth: '90dvw',

      data: {
        images: this.property.fotos,
        select: index
      },
    });
  }

}
